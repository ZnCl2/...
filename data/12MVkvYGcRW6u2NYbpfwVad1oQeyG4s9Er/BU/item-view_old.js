class ItemView extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
    this.getItem = this.getItem.bind(this);
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
  }

  componentDidMount() {
    this.getItem();
  }

  getItem(){
    const query = itemHelpers.getItemQuery(this.props.route);
    Page.cmd("dbQuery",[query],function(res){
      this.setState({
        item:res[0]
      },function(){
        this.getOptionalFileInfo();
      });
    }.bind(this));
  }

  getOptionalFileInfo() {
    const inner_path = "merged-" + this.props.config.merger_name +
                     "/" + this.state.item.cluster_id +
                     "/data/users/" + this.state.item.channel_address.split('_')[1] +
                     "/" + this.state.item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function(res){
      this.setState({
        file_info:res
      });
    }.bind(this));
  }

  render(){
    if (this.state.item){
      return (
        <section id="item-view" className="viewport">
          <ItemMediaPlayerContainer
            page={this.props.page}
            config={this.props.config}
            item={this.state.item}
            fileInfo={this.state.file_info}
          />
          <ItemViewContainer
            user={this.props.user}
            page={this.props.page}
            config={this.props.config}
            moderations={this.props.moderations}
            item={this.state.item}
            fileInfo={this.state.file_info}
          />
        </section>
      );
    } else {
      return (<LoadingContainer msg="loading item"/>);
    }
  }
}

class ItemMediaPlayerContainer extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      loading:true
    };
    this.initFileDownload = this.initFileDownload.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.onDownloadFile = this.onDownloadFile.bind(this);
    this.checkDownloadDuration = this.checkDownloadDuration.bind(this);
    this.updateFilePiecesInfo = this.updateFilePiecesInfo.bind(this);
    this.downloadFailed = this.downloadFailed.bind(this);
    this.handlePlayFileButtonClick = this.handlePlayFileButtonClick.bind(this);
  }

  componentDidMount() {
    this.initFileDownload();
  }

  initFileDownload(){

    const inner_path = "merged-" + this.props.config.merger_name +
                     "/" + this.props.item.cluster_id +
                     "/data/users/" + this.props.item.channel_address.split('_')[1] +
                     "/" + this.props.item.file_name;
    Page.cmd("optionalFileInfo",inner_path,function(res){
      if (res){
        this.setState({fileInfo:res},function(){
          const piecesInfo = itemHelpers.getItemFilePiecesInfo(res,this.props.item);
          this.setState({pieces_info:piecesInfo},function(){
            const downloads = res.is_downloaded === 1 && res.is_downloading === 1;
            if (res.uploaded || downloads){
              this.setState({loading:false});
            } else {
              const partialyDownloads = res.is_downloading === 1 || res.is_downloaded ===  1;
              const someData = res.pieces_downloaded > 0 || res.bytes_downloaded > 0;
              const downloadingState = false;
              let fetching
              if (!someData) fetching = true;
              this.setState({fetching:fetching},function(){
                this.onDownloadFile(res,inner_path,downloadingState);
              });
            }
          });
        });
      } else {
        this.setState({
          loading:false,
          downloading:true,
        },function(){
          this.downloadFailed();
        });
      }
    }.bind(this))

  }

  onDownloadFile(res,inner_path,downloadingState){
    setInterval(this.checkDownloadDuration, 5000);
    this.setState({
      loading:false,
      downloading:downloadingState,
      download_start: +(new Date),
      info_title:'Downloading',
      downloaded_percent:res.downloaded_percent,
      bytes_downloaded:res.bytes_downloaded,
      pieces_downloaded:res.pieces_downloaded,
      pieces:res.pieces,
      bar_color:'yellow'
    },function(){
      this.downloadFile(res,inner_path);
    });

  }

  checkDownloadDuration(){
    if (this.state.download_start + 30000 > +(new Date)){
      this.setState({
        info_msg:"there seems to be a problem with downloading the file. please wait for a bit or try again later"
      });
      clearInterval();
    }
  }

  downloadFile(fileInfo,inner_path){
    Page.cmd("fileNeed", inner_path, function(res) {
      const th = this;
      Page.onRequest = function(cmd, message) {
        const filePath = inner_path.split(th.props.item.cluster_id + "/")[1];
        let msgInfo, eventPath, fileChunk;
        if (message.event[0]) msgInfo = message.event[0];
        if (message.event[1]) eventPath = message.event[1];
        if (eventPath && eventPath.indexOf('|') > -1) {
            fileChunk = eventPath.split('|')[1];
            eventPath = eventPath.split('|')[0];
        }
        if (cmd == "setSiteInfo" && eventPath === filePath) {
          if (msgInfo === "file_failed"){
            th.updateFilePiecesInfo(fileChunk,msgInfo);
            th.downloadFailed();
          } else {
            Page.cmd("optionalFileInfo",inner_path,function(res){
              console.log(res);
              const piecesInfo = itemHelpers.getItemFilePiecesInfo(res,th.props.item);
              store.dispatch(setChunksInformation(res.pieces_downloaded,res.pieces))
              th.setState({
                downloaded_percent:res.downloaded_percent,
                bytes_downloaded:res.bytes_downloaded,
                pieces_downloaded:res.pieces_downloaded,
                pieces:res.pieces,
                bar_color:'green',
                pieces_info:piecesInfo,
                fetching:false
              },function(){
                console.log(th.state);
              });
            }.bind(th));
          }
        }
      }
    }.bind(this));
  }

  updateFilePiecesInfo(fileChunk,msgInfo){
    const fileChunkStart = parseInt(fileChunk.split('-')[0]);
    const fileChunkEnd = parseInt(fileChunk.split('-')[1]);
    const piecesInfo = this.state.pieces_info.map((pi) => {
      if (pi.start === fileChunkStart || pi.end === fileChunkEnd) {
        if (msgInfo === 'file_failed'){
          return Object.assign({}, pi, {
            state:'failed'
          });
        }
      } else {
        return pi;
      }
    });
    this.setState({pieces_info:piecesInfo});
  }

  downloadFailed(){
    this.setState({
      info_title:'Download Failed',
      bar_color:'red',
      info_msg:"failed to download file. it probably doesn't have peers , or the file is curropted. please try again later"
    },function(){
      clearInterval(this.checkDownloadDuration);
    });
  }

  handlePlayFileButtonClick(){
    this.setState({downloading:false});
  }

  render(){
    const inner_path = "merged-" + this.props.config.merger_name +
                     "/" + this.props.item.cluster_id +
                     "/data/users/" + this.props.item.channel_address.split('_')[1] +
                     "/" + this.props.item.file_name;
    let poster_path;
    if (this.props.item.poster_file){
      poster_path = "merged-" + this.props.config.merger_name +
                    "/" + this.props.item.cluster_id +
                    "/data/users/" + this.props.item.channel_address.split('_')[1] +
                    "/" + this.props.item.poster_file;
    }

    let fetchingContainer;
    if (this.state.fileInfo){
      if (this.state.fileInfo.pieces){
        if (this.state.fileInfo.pieces === 0){
          fetchingContainer = (
            <div id="fetching-piecemap-information">
              <span>Fetching piecemap information </span>
              <div className="ui active mini inline loader"></div>
            </div>
          );
        } else if (this.state.fileInfo.pieces){
          if (this.state.fileInfo.pieces === this.state.fileInfo.pieces_downloaded){
            fetchingContainer = (
              <div id="fetching-piecemap-information">
                <span>File downloaded!</span>
              </div>
            );
          } else if (this.state.fileInfo.pieces > 0){
            fetchingContainer = (
              <div id="fetching-piecemap-information">
                <span>Piecemap information fetched! downloading...</span>
              </div>
            );
          }
        } else {
          fetchingContainer = (
            <div id="fetching-piecemap-information">
              <span>Single File</span>
            </div>
          );
        }
      } else {
        fetchingContainer = (
          <div id="fetching-piecemap-information">
            <span>Single File</span>
          </div>
        );
      }
    } else {
      fetchingContainer = (
        <div id="fetching-piecemap-information">
          <span>Download Failed</span>
        </div>
      )
    }

    let itemMediaPlayer;
    if (this.props.item.content_type === 'audio' || 'video'){
      itemMediaPlayer = (
        <AVPlayer
          innerPath={inner_path}
          posterPath={poster_path}
          item={this.props.item}
          fileInfo={this.props.fileInfo}
        />
      );
    }
    if (this.props.item.content_type === 'book' || this.props.item.file_type === 'pdf'){
      itemMediaPlayer = (
        <BookReader
          page={this.props.page}
          innerPath={inner_path}
          posterPath={poster_path}
          item={this.props.item}
          fileInfo={this.props.fileInfo}
        />
      );
    }
    if (this.props.item.content_type === 'image'){
      itemMediaPlayer = (
        <ImageViewer
          innerPath={inner_path}
          item={this.props.item}
          fileInfo={this.props.fileInfo}
        />
      );
    }
    if (this.props.item.content_type === 'game'){
      if (this.props.item.file_type === 'zip' && this.props.item.category_id !== 'dos'){
        itemMediaPlayer = (
          <ArchiveViewer
            page={this.props.page}
            innerPath={inner_path}
            item={this.props.item}
            fileInfo={this.props.fileInfo}
          />
        );
      } else {
        itemMediaPlayer = (
          <GameEmulatorContainer
            page={this.props.page}
            innerPath={inner_path}
            item={this.props.item}
            fileInfo={this.props.fileInfo}
          />
        );
      }
    }
    if (this.props.item.content_type === 'archive'){
      itemMediaPlayer = (
        <ArchiveViewer
          page={this.props.page}
          innerPath={inner_path}
          item={this.props.item}
          fileInfo={this.props.fileInfo}
        />
      );
    }

    if (this.state.loading){
      return (
        <div id="item-media-player-container" className="ui inverted">
          <LoadingContainer
            inverted={true}
            msg="loading content"
          />
        </div>
      );
    } else if (this.state.downloading) {

      let downloadedPercent = 0;
      if (this.state.downloaded_percent) downloadedPercent = this.state.downloaded_percent;
      downloadedPercent = downloadedPercent + "%";

      let fileInfoMsg;
      if (this.state.info_msg){
        fileInfoMsg = (
          <div className="info-msg">{this.state.info_msg}</div>
        );
      }

      let fileExtraInfo;
      if (this.state.info_title !== "Failed"){
        const fileSize = appHelpers.getFileSize(this.props.item.file_size);
        const bytesDownloaded = appHelpers.getFileSize(this.state.bytes_downloaded);

        fileExtraInfo = (
          <div className="label">
            <div>File Pieces: {this.state.pieces_downloaded} / {this.state.pieces}</div>
            <div>File Size: {bytesDownloaded} / {fileSize}</div>
          </div>
        )
      }

      let playButton;
      if (this.state.bar_color !== "red"){
        let fileActionName;
        if (this.props.item.content_type === "image") fileActionName = "View";
        else fileActionName = "Play";
        let playButtonText;
        if (this.state.bar_color === "yellow") playButtonText = fileActionName + " Partial File";
        playButton = (
          <button onClick={this.handlePlayFileButtonClick}
            className={this.state.bar_color === "yellow" ? "ui button yellow" : "ui button green"}>
            {playButtonText}
          </button>
        );
      }

      return (
        <div id="item-media-player-container">
          <div id="item-downloading-info-container" className="ui container">
            <div id="item-downloading-info" className="ui segment inverted">
              <h2>{this.state.info_title}</h2>
              <div className={this.state.bar_color === "red" ? "ui progress inverted red" : "ui progress active inverted " + this.state.bar_color}>
                <div className="bar" style={{width:downloadedPercent}}>
                  <div className="progress">{downloadedPercent}</div>
                </div>
              </div>
              {fileExtraInfo}
              {fileInfoMsg}
              {playButton}
            </div>
          </div>
        </div>
      );

    } else {

      let itemFileInfoDownloadBar;
      if (this.state.pieces_info){
        itemFileInfoDownloadBar = (
          <ItemFileInfoDownloadBar
            fileInfo={this.props.fileInfo}
            piecesInfo={this.state.pieces_info}
            infoTitle={this.state.info_title}
          />
        );
      }

      return (
        <div id="item-media-player-container">
          {itemMediaPlayer}
          {fetchingContainer}
          {itemFileInfoDownloadBar}
        </div>
      )
    }
  }
}

class ItemViewContainer extends React.Component {
  render() {
    return (
      <div id="item-view-container" className="ui container grid">
        <div id="item-view-container-left" className="sixteen wide phone ten wide tablet eleven wide computer column">
          <ItemDetailsContainerWrapper
            user={this.props.user}
            page={this.props.page}
            config={this.props.config}
            item={this.props.item}
            fileInfo={this.props.fileInfo}
          />
          <div id="item-comments-container">
            <CommentsContainer
              user={this.props.user}
              item={this.props.item}
              page={this.props.page}
              config={this.props.config}
              moderations={this.props.moderations}
            />
          </div>
        </div>
        <div id="item-view-container-right"  className="sixteen wide phone six wide tablet five wide computer column">
          <ItemRelatedItemList
            config={this.props.config}
            moderations={this.props.moderations}
            item={this.props.item}/>
        </div>
      </div>
    );
  }
}

class ItemFileInfoDownloadBar extends React.Component {
  render(){
    let pieces, containerCssClass = "";
    if (this.props.piecesInfo.length > 0){
      pieces = this.props.piecesInfo.map((pi,i) => (
        <ItemFileInfoDownloadBarPiece
          key={i}
          piece={pi}
          piecesLength={this.props.piecesInfo.length}
        />
      ));
    } else {
      if (this.props.fileInfo && this.props.fileInfo.is_downloaded === 1){
        containerCssClass = "non-bfs-loaded";
      }
    }

    return (
      <div id="item-file-piece-download-info-container" className={containerCssClass}>
        {pieces}
      </div>
    );
  }
}

class ItemFileInfoDownloadBarPiece extends React.Component {
  render(){
    const pieceWidth = 100 / this.props.piecesLength;
    let containerClass = "ui progress ";
    if (this.props.piece.state === 'complete') containerClass += " success";
    else if (this.props.piece.state === 'downloading') containerClass += " active";
    else if (this.props.piece.state === 'failed') containerClass += "error";

    return (
      <div style={{width:pieceWidth+'%'}} className={"piece " + this.props.piece.state}>
        <div className={containerClass}>
          <div className="bar">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    );
  }
}

class ItemDetailsContainer extends React.Component {

  render(){

    const itemLink = "index.html?view:item+id:"+this.props.item.item_id+"+type:"+this.props.item.content_type;
    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    const dlLink = "merged-"+this.props.config.merger_name+"/"+this.props.item.cluster_id+"/data/users/"+this.props.item.channel_address.split('_')[1]+"/"+this.props.item.file_name;

    let downloadElement;
    if (this.props.fileInfo && this.props.fileInfo.is_downloaded)
      downloadElement = (<a id="item-download-link" href={dlLink} download={this.props.item.file_name}>download {this.props.item.content_type}</a>);

    let peerCount = "?";
    if (this.props.fileInfo) peerCount = this.props.fileInfo.peer;

    let channelImageElement;
    if (this.props.item.logo_file){
      const imagePath = "merged-"+this.props.config.merger_name+
                  "/"+this.props.item.cluster_id+
                  "/data/users/"+this.props.item.channel_address.split('_')[1]+
                  "/"+this.props.item.logo_file;
      channelImageElement = (<img className="avatar" src={imagePath}/>);
    } else {
      channelImageElement = (<img className="avatar" src="assets/img/x-avatar.png"/>);
    }

    let fileChunkInformation;
    if (this.props.chunks_info.pieces_downloaded){
      fileChunkInformation = (<div><b>file chunks:</b> {this.props.chunks_info.pieces_downloaded} / {this.props.chunks_info.pieces} total</div>);
    } else if (this.props.fileInfo && this.props.fileInfo.pieces){
      fileChunkInformation = (<div><b>file chunks:</b> {this.props.fileInfo.pieces_downloaded} / {this.props.fileInfo.pieces} total</div>);
    } else {
      if (this.props.fileInfo && !this.props.fileInfo.pieces) {
        fileChunkInformation = (<div><b>file chunks:</b> single file</div>);
      } else {
        fileChunkInformation = (<div><b>file chunks:</b> ?</div>);
      }
    }
    return (
      <div id="item-details-container">
        <div id="item-details-top" className="item-details-row">
          <h1>{this.props.item.title}</h1>
          <div className="floated author channel-info-container">
            {channelImageElement}
            <a href={'index.html?view:channel+id:' + this.props.item.channel_address}>{this.props.item.channel_name}</a>
          </div>
          <div id="item-peer-count">
            <h4 className="ui icon header">
              <i className="users icon"></i>
              <span>{peerCount} peers</span>
            </h4>
          </div>
        </div>
        <div className="item-details-row" id="item-details-mid">
            <div><b>size:</b> {fileSize}</div>
            {fileChunkInformation}
            <div><b>date added:</b> {timeAgo}</div>
            <div><b>file name:</b> {this.props.item.file_name}</div>
          <ItemVotesContainer
            config={this.props.config}
            user={this.props.user}
            page={this.props.page}
            item={this.props.item}
          />
          {downloadElement}
        </div>
        <div className="item-details-row">
          {this.props.item.description}
        </div>
        <div className="item-details-row">
          <ItemEmbedCode
            dlLink={dlLink}
          />
        </div>
      </div>
    )
  }
}

const mapStateToItemDetailsContainerProps = (state) => {
  const chunks_info = state.chunks_info;
  return {
    chunks_info
  }
}

const mapDispatchToItemDetailsContainerProps = (dispatch) =>{
  return {
    dispatch
  }
}

const ItemDetailsContainerWrapper = ReactRedux.connect(
  mapStateToItemDetailsContainerProps,
  mapDispatchToItemDetailsContainerProps
)(ItemDetailsContainer)

class ItemVotesContainer extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      up_votes:[],
      down_votes:[],
      up_voted:'',
      down_voted:''
    };
    this.getItemVotes = this.getItemVotes.bind(this);
    this.renderItemVotes = this.renderItemVotes.bind(this);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
    this.onVoteItem = this.onVoteItem.bind(this);
    this.voteItem = this.voteItem.bind(this);
  }

  componentDidMount() {
    this.getItemVotes();
  }

  getItemVotes(){
    const query = "SELECT * FROM vote WHERE vote.item_id='"+this.props.item.item_id+"'";
    Page.cmd("dbQuery",[query],function(res){
      this.renderItemVotes(res);
    }.bind(this));
  }

  renderItemVotes(res){
    if (res){
      let down_votes = [];
      let up_votes = [];
      let up_voted, down_voted;
      const cert_user_id = store.getState().site_info.cert_user_id;
      res.forEach(function(vote,index){
        if (vote.vote === 1){
          up_votes.push(vote);
          if (vote.user_id === cert_user_id) up_voted = true;
        } else {
          down_votes.push(vote);
          if (vote.user_id === cert_user_id) down_voted = true;
        }
      });
      this.setState({
        up_votes:up_votes,
        down_votes:down_votes,
        up_voted:up_voted,
        down_voted:down_voted,
        loading:false
      });
    }
  }

  handleUpVoteClick(){
    const vote_type = "up"
    this.onVoteItem(vote_type);
  }

  handleDownVoteClick(){
    const vote_type = "down";
    this.onVoteItem(vote_type);
  }

  onVoteItem(vote_type){
    this.setState({
      loading:true
    },function(){
      if (vote_type === "up"){
        if (this.state.up_voted) vote_type = "delete";
        else if (this.state.down_voted) vote_type = "change";
      } else if (vote_type === "down") {
        if (this.state.up_voted) vote_type = "change";
        else if (this.state.down_voted) vote_type = "delete";
      }
      this.voteItem(vote_type);
    });
  }

  voteItem(vote_type){
    const inner_path = "merged-"+this.props.config.merger_name+
                       "/"+this.props.user.cluster+
                       "/data/users/"+this.props.user.user_auth_address+
                       "/data.json";
    Page.cmd("fileGet",{ "inner_path": inner_path, "required": false },function(data){
      const votes = this.state.up_votes.concat(this.state.down_votes);
      data = voteHelpers.renderDataOnItemVote(data,this.props.item,votes,vote_type,this.props.user.user_name);
      const action = 'vote';
      data = appHelpers.renderDataOnNotificaion(data,this.props.user,this.props.item,action,vote_type);
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
        console.log(res);
        Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
          console.log(res);
          this.getItemVotes();
        }.bind(this));
      }.bind(this));
    }.bind(this));

  }

  render() {
    if (this.props.user){
        return (
          <div id="item-votes-container" className={this.state.loading ? "ui segment loading" : "ui segment"}>
            <div className="ui menu secondary">
              <a className="item up-votes" onClick={this.handleUpVoteClick}>
                <h6 className="ui icon header">
                  <i className="thumbs outline up icon green"></i>
                  <span className="green">{this.state.up_votes.length}</span>
                </h6>
              </a>
              <a className="item down-votes" onClick={this.handleDownVoteClick}>
                <h6 className="ui icon header">
                  <i className="thumbs outline down icon red"></i>
                  <span className="red">{this.state.down_votes.length}</span>
                </h6>
              </a>
            </div>
          </div>
        );

    } else {
      return (<p>login to vote</p>);
    }
  }
}

class ItemEmbedCode extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    const target = document.getElementById("item-embed-code");
    target.select()
    document.execCommand('copy')
  }

  render() {
    return (
      <div id="item-embed-container" className="ui form">
        <div className="field">
          <h3>Embed Code</h3>
          <textarea
            id="item-embed-code"
            onClick={this.handleClick}
            value={this.props.dlLink}
            readOnly={true}
            rows="3">
          </textarea>
          <button className="ui button primary"
            onClick={this.handleClick}>Copy</button>
        </div>
      </div>
    );
  }
}

class ItemRelatedItemList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[]
    }
    this.getRelatedItems = this.getRelatedItems.bind(this);
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  getRelatedItems() {
    const query = itemHelpers.getRelatedItemsQuery(this.props.config,this.props.moderations,this.props.item);
    Page.cmd("dbQuery",[query],function(res){
      this.setState({items:res});
    }.bind(this));
  }

  render() {
    const relatedItems = this.state.items.map((related_item,i) => (
      <RelatedItem
        key={this.props.item + i}
        item={related_item}
        config={this.props.config}
      />
    ))
    return (
      <div id="related-item-list" className="ui relaxed divided list">
        {relatedItems}
      </div>
    );
  }
}

class RelatedItem extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      file_info:{}
    };
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
  }

  componentDidMount() {
    this.getOptionalFileInfo();
  }

  getOptionalFileInfo(){
    const inner_path = "merged-" + this.props.config.merger_name +
                     "/" + this.props.item.cluster_id +
                     "/data/users/" + this.props.item.channel_address.split('_')[1] +
                     "/" + this.props.item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function(res){
      const fileInfo = appHelpers.configureOptionalFileStatus(res,this.props.item.title);
      if (this.props.item.poster_file){
        const posterInnerPath = "merged-" + this.props.config.merger_name +
                         "/" + this.props.item.cluster_id +
                         "/data/users/" + this.props.item.channel_address.split('_')[1] +
                         "/" + this.props.item.poster_file;
         Page.cmd("optionalFileInfo", posterInnerPath, function(res){
           const posterFileInfo = appHelpers.configureOptionalFileStatus(res);
           this.setState({
             poster_file_info:posterFileInfo,
             poster_inner_path:posterInnerPath,
             file_info:fileInfo,
             inner_path:inner_path
           });
         }.bind(this));
      } else {
        this.setState({
          file_info:fileInfo,
          inner_path:inner_path
        });
      }
    }.bind(this));
  }

  render(){
    let listItemImageContainer;
    if (this.state.file_info && this.props.item.content_type === 'image' || this.state.poster_file_info){
      listItemImageContainer = (
        <ListItemImageContainer
          config={this.props.config}
          item={this.props.item}
          fileInfo={this.state.file_info}
          innerPath={this.state.inner_path}
          posterFileInfo={this.state.poster_file_info}
          posterInnerPath={this.state.poster_inner_path}
        />
      );
    } else {
      const iconClass = itemHelpers.getContentTypeIconClass(this.props.item.content_type);
      const itemLink = "index.html?view:item+id:"+this.props.item.item_id+"+type:"+this.props.item.content_type;
      listItemImageContainer = (
        <div className="list-item-image-container default-image">
          <a href={itemLink}>
            <i className={iconClass + " icon"}></i>
          </a>
        </div>
      );
    }
    const itemLink = "index.html?view:item+id:"+this.props.item.item_id+"+type:"+this.props.item.content_type;
    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    return (
      <div className={this.state.file_info ? "related-list-item item cached" : "related-list-item item chached"}>
        {listItemImageContainer}
        <div className="content">
          <a className="header" href={itemLink}>{this.props.item.title}</a>
          <div className="description">
            <div>{this.props.item.channel_name}</div>
            <div>{timeAgo} | {fileSize}</div>
          </div>
        </div>
      </div>
    );
  }
}
