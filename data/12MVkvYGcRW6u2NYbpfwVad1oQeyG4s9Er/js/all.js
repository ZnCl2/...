const reducer = Redux.combineReducers({
  server_info: serverInfoReducer,
  site_info: siteInfoReducer,
  config: siteConfigReducer,
  local_storage: localStorageReducer,
  user_settings: userSettingsReducer,
  feed: feedReducer,
  route: routeReducer,
  user: userReducer,
  moderations: moderationsReducer,
  search_phrase: searchReducer,
  channel: channelReducer,
  item: itemReducer,
  currentItem: currentItemReducer,
  chunks_info: chunksReducer
});

/* reducers */

function serverInfoReducer(state = {}, action) {
  if (action.type === 'SERVER_INFO') {
    return action.server_info;
  } else {
    return state;
  }
}

function siteInfoReducer(state = {}, action) {
  switch (action.type) {
    case 'SITE_INFO':
      {
        return action.site_info;
      }
    case 'LOADING_USER':
      {
        const s = Object.assign({}, state, {
          loading: action.value
        });
        return s;
      }
    case 'CHANGE_CERT':
      {
        const s = Object.assign({}, state, {
          auth_address: action.auth_address,
          cert_user_id: action.cert_user_id
        });
        return s;
      }
    default:
      {
        return state;
      }
  }
}

function siteConfigReducer(state = {}, action) {
  if (action.type === 'SITE_CONFIG') {
    return action.config;
  } else {
    return state;
  }
}

function localStorageReducer(state = {}, action) {
  if (action.type === 'LOCAL_STORAGE') {
    let state = {};
    if (action.local_storage) state = action.local_storage;
    return state;
  } else if (action.type === 'ZV_CERT_CREATED') {
    const s = Object.assign({}, state, {});
    s['ifs_cert_created'] = true;
    return s;
  } else {
    return state;
  }
}

function userSettingsReducer(state = {}, action) {
  if (action.type === 'USER_SETTINGS') {
    let state = {};
    if (action.user_settings) state = action.user_settings;
    return state;
  } else {
    return state;
  }
}

function feedReducer(state = {}, action) {
  if (action.type === 'SET_FEED_LIST_FOLLOW') {
    return action.feed;
  }
  return state;
}

function routeReducer(state = {}, action) {
  if (action.type === 'SET_ROUTE') {
    return action.route;
  } else {
    return state;
  }
}

function userReducer(state = {}, action) {
  if (action.type === 'SET_USER') {
    return action.user;
  } else if (action.type === 'REMOVE_USER') {
    const s = {};
    return s;
  } else {
    return state;
  }
}

function moderationsReducer(state = {}, action) {
  if (action.type === 'SET_MODERATIONS') {
    return action.moderations;
  } else if (action.type === 'TOGGLE_MODERATIONS') {
    const show_moderations = state.show_moderations === true ? false : true;
    const s = Object.assign({}, state, {
      show_moderations: show_moderations
    });
    return s;
  }
  return state;
}

function searchReducer(state = {}, action) {
  if (action.type === 'SET_SEARCH_PHRASE') {
    return action.search_phrase;
  } else {
    return state;
  }
}

function channelReducer(state = {}, action) {
  if (action.type === 'SET_CHANNEL') {
    return action.channel;
  } else {
    return state;
  }
}

function itemReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_ITEM_INFO':
      {
        const s = Object.assign({}, state, {
          item_info: action.item_info
        });
        return s;
      }
    case 'SET_FILE_INFO':
      {
        const s = Object.assign({}, state, {
          file_info: action.file_info
        });
        return s;
      }
    case 'FILE_DOWNLOAD_FAILED':
      {
        const s = Object.assign({}, state, {
          download_failed: true
        });
        return s;
      }
    default:
      {
        return state;
      }
  }
}

function currentItemReducer(state = {}, action) {
  if (action.type === 'SET_CURRENT_ITEM') {
    const s = Object.assign({}, state, {
      item: action.item,
      index: action.index
    });
    return s;
  } else {
    return state;
  }
}

function chunksReducer(state = {}, action) {
  if (action.type === 'SET_CHUNKS_INFORMATION') {
    const s = Object.assign({}, state, {
      pieces_downloaded: action.pieces_downloaded,
      pieces: action.pieces
    });
    return s;
  } else {
    return state;
  }
}

function setServerInfo(server_info) {
  return {
    type: 'SERVER_INFO',
    server_info: server_info
  };
}

function setSiteInfo(site_info) {
  return {
    type: 'SITE_INFO',
    site_info: site_info
  };
}

function changeCert(auth_address, cert_user_id) {
  return {
    type: 'CHANGE_CERT',
    auth_address: auth_address,
    cert_user_id: cert_user_id
  };
}

function setSiteConfig(config) {
  return {
    type: 'SITE_CONFIG',
    config: config
  };
}

function setLocalStorage(local_storage) {
  return {
    type: 'LOCAL_STORAGE',
    local_storage: local_storage
  };
}

function setUserSettings(user_settings) {
  return {
    type: 'USER_SETTINGS',
    user_settings: user_settings
  };
}

function setRoute(route) {
  return {
    type: 'SET_ROUTE',
    route: route
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    user: user
  };
}

function removeUser() {
  return {
    type: 'REMOVE_USER'
  };
}

function setFeedListFollow(feed) {
  return {
    type: 'SET_FEED_LIST_FOLLOW',
    feed: feed
  };
}

function setModerations(moderations) {
  return {
    type: 'SET_MODERATIONS',
    moderations: moderations
  };
}

function toggleModerations(value) {
  return {
    type: 'TOGGLE_MODERATIONS',
    action: value
  };
}

function setSearchPhrase(searchPhrase) {
  return {
    type: 'SET_SEARCH_PHRASE',
    search_phrase: searchPhrase
  };
}

function setChannel(channel) {
  return {
    type: 'SET_CHANNEL',
    channel: channel
  };
}

function setCurrentItem(item, index) {
  return {
    type: 'SET_CURRENT_ITEM',
    item: item,
    index: index
  };
}

function setItemInfo(item_info) {
  return {
    type: 'SET_ITEM_INFO',
    item_info: item_info
  };
}

function setFileInfo(file_info) {
  return {
    type: 'SET_FILE_INFO',
    file_info: file_info
  };
}

function fileDownloadFailed() {
  return {
    type: 'FILE_DOWNLOAD_FAILED'
  };
}

function setChunksInformation(pieces_downloaded, pieces) {
  return {
    type: 'SET_CHUNKS_INFORMATION',
    pieces_downloaded: pieces_downloaded,
    pieces: pieces
  };
}
class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleModerations = this.toggleModerations.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const self = this;
    Page.cmd("dbQuery", ["SELECT * FROM item ORDER BY date_added DESC"], function (res) {
      self.setState({ items: res });
    });
  }

  toggleModerations() {
    console.log('toggle it');
  }

  render() {
    let adminViewDisplay;
    if (this.props.page.settings.own) {
      adminViewDisplay = React.createElement(
        "p",
        null,
        "admin view"
      );
      if (this.state.items) {
        const items = this.state.items.map((i, index) => React.createElement(
          "li",
          { key: index },
          i.title,
          "||",
          React.createElement(
            "a",
            { onClick: this.toggleModarations },
            "hide"
          )
        ));
        adminViewDisplay = React.createElement(
          "ul",
          null,
          items
        );
      }
    } else {
      adminViewDisplay = React.createElement(
        "p",
        null,
        "you are not the owner of this site!"
      );
    }
    return React.createElement(
      "div",
      { id: "admin-view" },
      React.createElement(
        "div",
        { className: "ui container" },
        adminViewDisplay
      )
    );
  }
}
window.appHelpers = function () {

  function generateClusterSitesObject(sites, clusters) {
    let cso = {};
    clusters.forEach(function (cluster, index) {
      const cs = sites[cluster.cluster_id];
      cso[cluster.cluster_id] = cs;
    });
    return cso;
  }

  function generateSiteList(sites, clusters) {
    let sl = [];
    clusters.forEach(function (cluster, index) {
      let exists = false;
      for (var i in sites) {
        if (cluster.cluster_id === sites[i].address) exists = true;
      }
      if (!exists) {
        sl.push(cluster.cluster_id);
      }
    });
    return sl;
  }

  function renderRouteObject(path) {
    let view, id, type, page, f_type;
    if (!path || path.indexOf('?wrapper_nonce') > -1) {
      view = 'main';
    } else {
      if (path.indexOf('&') > -1) path = path.split('&')[0];
      if (path.indexOf('view:') > -1) {
        view = path.split('view:')[1];
        if (view.indexOf('+') > -1) view = view.split('+')[0];
      }
      if (path.indexOf('id:') > -1) {
        id = path.split('id:')[1];
        if (id.indexOf('+') > -1) id = id.split('+')[0];
      }
      if (path.indexOf('type:') > -1) {
        type = path.split('type:')[1];
        if (type.indexOf('+') > -1) type = type.split('+')[0];
      }
      if (path.indexOf('page:') > -1) {
        page = path.split('page:')[1];
        if (page.indexOf('+') > -1) page = page.split('+')[0];
        page = parseInt(page);
      }
      if (path.indexOf('f_type:') > -1) {
        f_type = path.split('f_type:')[1];
        if (f_type.indexOf('+') > -1) f_type = f_type.split('+')[0];
      }
    }
    const route = {
      view: view,
      id: id,
      type: type,
      f_type: f_type,
      page: page
    };
    return route;
  }

  function getTimeAgo(datetime) {
    const a = timeago().format(datetime);
    return a;
  }

  function getFileSize(size) {
    if (isNaN(size)) size = 0;

    if (size < 1024) return size + ' Bytes';

    size /= 1024;

    if (size < 1024) return size.toFixed(2) + ' Kb';

    size /= 1024;

    if (size < 1024) return size.toFixed(2) + ' Mb';

    size /= 1024;

    if (size < 1024) return size.toFixed(2) + ' Gb';

    size /= 1024;

    return size.toFixed(2) + ' Tb';
  }

  function generateRandomString(numLength) {
    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    var rString = randomString(numLength, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return rString;
  };

  function grk(config) {
    var randomKey = config.versions.a + config.versions.b + config.versions.c + config.versions.d + config.versions.f;
    return randomKey;
  };

  function getPaginationItemIconClass(page) {
    let iconClass;
    if (page === 'first') iconClass = 'angle double left';else if (page === 'previous') iconClass = 'angle left';else if (page === 'next') iconClass = 'angle right';else if (page === 'last') iconClass = 'angle double right';
    return iconClass;
  }

  function getPaginationButtonNumber(page, currentPage, numPages) {
    let next_page_number;
    if (page === "first") {
      next_page_number = 1;
    } else if (page === "previous") {
      if (currentPage > 1) {
        next_page_number = parseInt(currentPage - 1);
      } else {
        next_page_number = currentPage;
      }
    } else if (page === "next") {
      if (currentPage < numPages) {
        next_page_number = parseInt(currentPage + 1);
      } else {
        next_page_number = currentPage;
      }
    } else if (page === "last") {
      next_page_number = numPages;
    } else {
      next_page_number = parseInt(page + 1);
    }
    return next_page_number;
  }

  function generateContentJsonOptionalList(file_types) {
    var a = ".*(";
    file_types.forEach(function (f_type, index) {
      a += "." + f_type;
      if (file_types.length > index + 1) a += "|";
    });
    a += ")";
    return a;
  };

  function emulateKeyPress(e, target, comment, map) {
    var c;
    var string = '';
    map[e.keyCode] = e.type == 'keydown';
    if (map[e.keyCode] === true) {
      // if backspace
      if (e.keyCode === 8) {
        if (target.selectionStart < target.selectionEnd) {
          c = this.replaceRange(comment, target.selectionStart, target.selectionEnd, string);
        } else {
          c = comment.slice(0, -1);
        }
      }
      // if not backspace
      else {
          // with shift
          if (map[16] === true) {
            if (e.keyCode === 16) {
              // console.log('shift');
            } else {
              string = e.key.toUpperCase();
            }
          } else {
            string = String.fromCharCode(e.keyCode).toLowerCase();
          }

          // if text has selection
          if (target.selectionStart < target.selectionEnd) {
            c = this.replaceRange(comment, target.selectionStart, target.selectionEnd, string);
          } else {
            c = comment + string;
          }
        }
    } else {
      c = comment;
    }
    return c;
  };

  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  };

  function configureOptionalFileStatus(res) {
    let fileInfo;
    if (res) {
      if (res.uploaded) {
        fileInfo = res;
      } else if (res.is_downloaded === 1) {
        fileInfo = res;
      } else if (res.pieces && res.pieces_downloaded && res.pieces === res.pieces_downloaded) {
        fileInfo = res;
      } else if (typeof res.bytes_downloaded !== undefined) {
        if (res.bytes_downloaded === res.size) {
          fileInfo = res;
        }
      } else if (res.is_downloaded === 0) {
        fileInfo = null;
      } else {
        fileInfo = res;
      }
    }
    return fileInfo;
  }

  function renderDataOnNotificaion(data, user, item, action, body) {
    if (!data.notification) {
      data.notification = [];
      data.next_notification_id = 1;
    }
    const notification = {
      notification_id: user.user_auth_address + '_n_' + data.next_notification_id,
      user: user.user_auth_address,
      target_user: item.channel.split('_')[1],
      action: action,
      body: body,
      item: item.item_id,
      date_added: +new Date()
    };
    data.notification.push(notification);
    data.next_notification_id += 1;
    return data;
  }

  function shuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function createGroupedArray(arr, chunkSize) {
    var groups = [],
        i;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  function convertObjectToArray(obj) {
    let arr = [];
    for (var i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }

  return {
    generateClusterSitesObject,
    generateSiteList,
    renderRouteObject,
    getTimeAgo,
    getFileSize,
    generateRandomString,
    grk,
    getPaginationItemIconClass,
    getPaginationButtonNumber,
    generateContentJsonOptionalList,
    emulateKeyPress,
    replaceRange,
    configureOptionalFileStatus,
    renderDataOnNotificaion,
    shuffleArray,
    createGroupedArray,
    isEmpty,
    convertObjectToArray
  };
}();
class FormSelectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected ? this.props.selected : {},
      open: false
    };
    this.handleSelectMenuChange = this.handleSelectMenuChange.bind(this);
  }

  handleSelectMenuChange(e) {
    const selected = e.target.value;
    this.setState({ selected: selected }, function () {
      this.props.onSelectChange(selected, this.props.item);
    });
  }

  render() {
    if (this.props.options) {
      const optionList = this.props.options.map((option, i) => React.createElement(FormSelectOptionContainer, {
        selected: this.state.selected,
        key: i,
        option: option,
        onSelectOptionClick: this.handleSelectOptionClick
      }));

      return React.createElement(
        "select",
        { className: "ui fluid dropdown",
          defaultValue: this.state.selected.category_id,
          selected: this.state.selected.category_id,
          onChange: this.handleSelectMenuChange },
        optionList
      );
    } else {
      return React.createElement(LoadingContainer, null);
    }
  }
}

class FormSelectOptionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelectOptionClick = this.handleSelectOptionClick.bind(this);
  }

  handleSelectOptionClick() {
    this.props.onSelectOptionClick(this.props.option);
  }

  render() {
    if (this.props.selected.category_name === this.props.option.label) {
      return React.createElement(
        "option",
        {
          selected: "selected",
          value: this.props.option.value },
        this.props.option.label
      );
    } else {
      return React.createElement(
        "option",
        {
          value: this.props.option.value },
        this.props.option.label
      );
    }
  }

}

class LoadingContainer extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "loading-container" },
      React.createElement(
        "div",
        { className: this.props.inverted ? "ui active centered inline text inverted loader" : "ui active centered inline text loader" },
        this.props.msg
      )
    );
  }
}


const { Provider, connect } = ReactRedux;
const store = Redux.createStore(reducer);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: {},
      server: {},
      local_storage: {},
      config: {},
      route: {},
      sites: {},
      moderations: {},
      loading: true
    };
    this.initApp = this.initApp.bind(this);
    this.checkMergerPermissions = this.checkMergerPermissions.bind(this);
    this.getMergerSites = this.getMergerSites.bind(this);
    this.getModerations = this.getModerations.bind(this);
    this.getUser = this.getUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getUserNotifications = this.getUserNotifications.bind(this);
    this.routeView = this.routeView.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.finishLoadingApp = this.finishLoadingApp.bind(this);
    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleChangeAccountClick = this.handleChangeAccountClick.bind(this);
    this.certSelect = this.certSelect.bind(this);
    this.createIfsCertificate = this.createIfsCertificate.bind(this);
    this.handleClusterFileDistributeChange = this.handleClusterFileDistributeChange.bind(this);
    this.handleAllFileDistributeChange = this.handleAllFileDistributeChange.bind(this);
  }

  componentDidMount() {
    this.initApp();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loading) {
      if (!nextProps.site_info.cert_user_id) {
        store.dispatch(removeUser());
        this.setState({ user: '' });
      } else {
        this.getUser();
      }
    }
  }

  initApp() {
    //Page.cmd("wrapperSetViewport", "width=device-width, initial-scale=1.0");
    Page.cmd('siteInfo', {}, function (site_info) {
      store.dispatch(setSiteInfo(site_info));
      Page.cmd('serverInfo', {}, function (server_info) {
        store.dispatch(setServerInfo(server_info));
        Page.cmd('wrapperGetLocalStorage', [], function (res) {
          let local_storage;
          if (res) local_storage = res;else local_storage = {};
          Page.local_storage = local_storage;
          store.dispatch(setLocalStorage(local_storage));
          Page.cmd('userGetSettings', {}, function (res) {
            const user_settings = res;
            store.dispatch(setUserSettings(user_settings));
            Page.cmd('fileGet', { 'inner_path': 'data/config.json' }, function (config) {
              config = JSON.parse(config);
              store.dispatch(setSiteConfig(config));
              this.setState({
                page: site_info,
                server: server_info,
                local_storage: local_storage,
                config: config
              }, function () {
                this.checkMergerPermissions();
              });
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  checkMergerPermissions() {
    if (this.state.page.settings.permissions.indexOf('Merger:' + this.state.config.merger_name) > -1) {
      this.getMergerSites();
    } else {
      Page.cmd('wrapperPermissionAdd', 'Merger:' + this.state.config.merger_name, function (res) {
        this.getMergerSites();
      }.bind(this));
    }
  }

  getMergerSites() {
    Page.cmd("mergerSiteList", { query_site_info: true }, function (res) {
      const sites = appHelpers.generateClusterSitesObject(res, this.state.config.clusters);
      this.setState({
        sites: sites
      }, function () {
        const siteList = appHelpers.generateSiteList(res, this.state.config.clusters);
        if (siteList.length > 0) {
          this.setState({ siteList: siteList }, function () {
            this.addMergerSites();
          });
        } else {
          this.getModerations();
        }
      });
    }.bind(this));
  }

  addMergerSites() {
    Page.cmd("mergerSiteAdd", { "addresses": this.state.siteList }, function (data) {
      Page.cmd("wrapperNotification", ["info", "refresh this site to view new content", 1000000000]);
    }.bind(this));
  }

  getModerations() {
    const query = "SELECT * FROM moderation WHERE current = 1 ORDER BY date_added DESC";
    Page.cmd("dbQuery", [query], function (res) {
      moderations = moderationHelpers.renderModerations(res);
      console.log(moderations);
      const show_moderations = this.state.local_storage["show_moderations"] === false ? false : true;
      const m = {
        moderations: moderations,
        show_moderations: show_moderations
      };
      store.dispatch(setModerations(m));
      this.setState({
        moderations: moderations,
        show_moderations: show_moderations
      }, function () {
        if (this.state.page.cert_user_id) {
          this.getUser();
        } else {
          this.routeView();
        }
      });
    }.bind(this));
  }

  getUser() {
    const auth_address = store.getState().site_info.auth_address;
    const query = "SELECT * FROM user WHERE user_auth_address='" + auth_address + "'";
    this.setState({ loading: true }, function () {
      Page.cmd("dbQuery", [query], function (res) {
        if (!res.length > 0) {
          this.registerUser();
        } else {
          let user = res[0];
          if (!this.props.user.user_name) {
            const username = store.getState().site_info.cert_user_id;
            user = Object.assign({}, user, {
              user_name: username
            });
          }
          store.dispatch(setUser(user));
          this.setState({
            user: res[0]
          }, function () {
            this.routeView();
          });
        }
      }.bind(this));
    });
  }

  registerUser() {
    const inner_path = "merged-" + this.state.config.merger_name + "/" + this.state.config.cluster.cluster_id + "/data/users/" + this.state.page.auth_address + "/data.json";

    Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
      if (data) {
        data = JSON.parse(data);
        if (!data.user) {
          data.user = [];
          data.next_user_id = 1;
        }
      } else {
        data = { "next_user_id": 1, "user": [] };
      }
      // comment
      const user = {
        user_id: this.state.page.auth_address + "_user_" + data.next_user_id,
        user_auth_address: this.state.page.auth_address,
        user_name: store.getState().site_info.cert_user_id,
        cluster: this.state.config.cluster.cluster_id,
        date_added: +new Date()
      };
      data.next_user_id += 1;
      data.user.push(user);
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
          this.setState({
            loading: false,
            user: user
          }, function () {
            this.routeView();
          });
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  getUserNotifications() {
    const query = "SELECT * FROM notification WHERE target_user='" + this.state.user.user_auth_address + "'";
    Page.cmd("dbQuery", [query], function (res) {
      if (typeof res !== 'string') {
        // Page.cmd("wrapperNotification", ["info", "we have updated the site, please rebuild & reload db!", 10000]);
        // notify the user that he should rebuild the db
      }
      this.routeView();
    }.bind(this));
  }

  routeView() {
    const route = appHelpers.renderRouteObject(window.location.search);
    store.dispatch(setRoute(route));
    this.setState({
      route: {
        view: route.view,
        id: route.id,
        type: route.type
      }
    }, function () {
      if (this.state.route.view === 'channel') {
        this.getChannel();
      } else {
        this.finishLoadingApp();
      }
    });
  }

  getChannel() {
    const query = "SELECT * FROM channel WHERE channel_address='" + this.state.route.id + "'";
    Page.cmd("dbQuery", [query], function (res) {
      store.dispatch(setChannel(res[0]));
      this.setState({
        channel: res[0]
      }, function () {
        this.finishLoadingApp();
      });
    }.bind(this));
  }

  finishLoadingApp() {
    console.log('finish loading app');
    this.setState({ loading: false });
  }

  handleChangeAccountClick() {
    this.certSelect();
  }

  handleCreateAccountClick() {
    this.createIfsCertificate();
  }

  certSelect() {
    Page.cmd("certSelect", [['ifs.anonymous', 'zeroid.bit']]);
    Page.onRequest = function (cmd, message) {
      if (cmd == "setSiteInfo") {
        let page = this.state.page;
        page.auth_address = message.auth_address;
        page.cert_user_id = message.cert_user_id;
        this.setState({
          page: page,
          user: '',
          loading: true
        }, function () {
          this.setState({ loading: false }, function () {
            if (this.state.page.cert_user_id) {
              this.getUser();
            } else {
              this.routeView();
            }
          });
        });
      }
    }.bind(this);
  }

  createIfsCertificate(name) {
    if (!name) name = appHelpers.generateRandomString(13);
    const certname = "ifs.anonymous";
    const genkey = appHelpers.grk(this.state.config);
    const genid = bitcoin.ECPair.fromWIF(genkey);
    const cert = bitcoin.message.sign(genid, this.state.page.auth_address + "#web/" + name).toString("base64");
    Page.cmd("certAdd", [certname, "web", name, cert], function (res) {
      this.state.local_storage['ifs_cert_created'] = true;
      Page.cmd("wrapperSetLocalStorage", this.state.local_storage);
      this.certSelect();
    }.bind(this));
  }

  handleClusterFileDistributeChange(val, clusterId) {
    Page.cmd("optionalHelpAll", [val, clusterId], function (res) {
      this.getMergerSites();
    }.bind(this));
  }

  handleAllFileDistributeChange(val) {
    let clIdArray = [];
    this.state.config.clusters.forEach(function (cluster, index) {
      clIdArray.push(cluster.cluster_id);
    });
    Page.cmd("mergerSiteAdd", [clIdArray], function () {
      this.getMergerSites();
    }.bind(this));
  }

  render() {
    if (this.state.loading) {
      return React.createElement(
        'div',
        { className: 'ui segment full-screen' },
        React.createElement(
          'div',
          { className: 'ui active dimmer' },
          React.createElement(
            'div',
            { className: 'ui medium text loader' },
            'Loading'
          )
        ),
        React.createElement('p', null),
        React.createElement('p', null),
        React.createElement('p', null)
      );
    } else {
      return React.createElement(
        'div',
        { id: 'main-container' },
        React.createElement(TemplateContainer, {
          loading: this.state.loading,
          localStorage: this.state.local_storage,
          sites: this.state.sites,
          route: this.state.route,
          page: this.state.page,
          config: this.state.config,
          moderations: this.state.moderations,
          showModerations: this.state.show_moderations,
          user: this.state.user,
          channel: this.state.channel,
          onChangeAccountClick: this.handleChangeAccountClick,
          onCreateAccountClick: this.handleCreateAccountClick,
          onClusterFileDistributeChange: this.handleClusterFileDistributeChange,
          onAllFileDistributeChange: this.handleAllFileDistributeChange
        })
      );
    }
  }
}

const mapStateToAppProps = state => {
  const user = state.user;
  const site_info = state.site_info;
  return {
    user,
    site_info
  };
};

const mapDispatchToAppProps = dispatch => {
  return {
    dispatch
  };
};

const AppContainer = ReactRedux.connect(mapStateToAppProps, mapDispatchToAppProps)(App);

class AppWrapper extends React.Component {
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(AppContainer, null)
    );
  }
}

ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById('app'));
class ChannelDashboard extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "channel-dashboard" },
      React.createElement(ChannelListHeader, {
        channel: this.props.channel,
        page: this.props.page,
        route: this.props.route,
        config: this.props.config,
        items: this.props.items,
        sites: this.props.sites,
        totalFileSize: this.props.totalFileSize,
        totalItemCount: this.props.totalItemCount
      }),
      React.createElement(
        "div",
        { className: "ui warning message" },
        "To help distribute the files in this channel, you need to stay online"
      ),
      React.createElement(ChannelFiles, {
        items: this.props.items,
        channel: this.props.channel,
        page: this.props.page,
        route: this.props.route,
        config: this.props.config,
        sites: this.props.sites,
        user: this.props.user,
        sortOptions: this.props.sortOptions,
        sortBy: this.props.sortBy,
        onUploadClick: this.props.onUploadClick,
        onEditItemClick: this.props.onEditItemClick,
        onDeleteItemClick: this.props.onDeleteItemClick,
        onSortOptionClick: this.props.onSortOptionClick,
        onSortItemsByPeersClick: this.props.onSortItemsByPeersClick
      }),
      React.createElement(Pagination, {
        pagination: this.props.pagination,
        onPaginationButtonClick: this.props.onPaginationButtonClick
      })
    );
  }
}

class ChannelFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.items.length > 0) {
      const fileList = this.props.items.map((item, i) => React.createElement(ChannelFileItem, {
        key: item.file_name + i,
        item: item,
        channel: this.props.channel,
        page: this.props.page,
        config: this.props.config,
        onEditItemClick: this.props.onEditItemClick,
        onDeleteItemClick: this.props.onDeleteItemClick
      }));

      const fileListTableHeader = this.props.sortOptions.map((option, i) => React.createElement(ChannelFilesSortOptions, {
        key: i + option.label,
        sortOption: option,
        sortBy: this.props.sortBy,
        onSortOptionClick: this.props.onSortOptionClick,
        onSortItemsByPeersClick: this.props.onSortItemsByPeersClick
      }));

      const fileListTable = React.createElement(
        "table",
        { className: "ui celled striped table", id: "channel-files-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            fileListTableHeader,
            React.createElement(
              "th",
              { className: "right aligned" },
              "Actions"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          fileList
        )
      );

      return React.createElement(
        "div",
        { id: "channel-files" },
        fileListTable
      );
    } else {
      return React.createElement(
        "div",
        { id: "channel-no-files-container" },
        React.createElement(
          "div",
          { id: "channel-no-files-message", className: "ui segment compact" },
          React.createElement(
            "p",
            null,
            "You haven't uploaded any Items to this Channel yet."
          ),
          React.createElement(
            "p",
            null,
            React.createElement(
              "button",
              { className: "ui button primary",
                onClick: this.props.onUploadClick },
              React.createElement("i", { className: "icon cloud upload" }),
              "Upload Files"
            )
          )
        )
      );
    }
  }
}

class ChannelFilesSortOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSortOptionClick = this.handleSortOptionClick.bind(this);
  }

  handleSortOptionClick() {
    if (this.props.sortOption.label === 'in cache') {} else if (this.props.sortOption.label === 'peers') {
      this.props.onSortItemsByPeersClick();
    } else {
      let sortOption = {
        label: this.props.sortOption.label,
        val: this.props.sortOption.val
      };

      if (this.props.sortBy) {
        if (this.props.sortBy.val === this.props.sortOption.val) {
          sortOption.dir = this.props.sortBy.dir === 'DESC' ? 'ASC' : 'DESC';
        } else {
          sortOption.dir = this.props.sortOption.dir;
        }
      } else {
        sortOption.dir = this.props.sortOption.dir;
      }
      this.props.onSortOptionClick(sortOption);
    }
  }

  render() {
    return React.createElement(
      "th",
      null,
      React.createElement(
        "a",
        { className: "channel-files-sort-option", onClick: this.handleSortOptionClick },
        React.createElement("i", { className: this.props.sortBy.val === this.props.sortOption.val && this.props.sortBy.dir === this.props.sortOption.dir ? "icon long arrow up" : "icon long arrow down" }),
        this.props.sortOption.label
      )
    );
  }
}

class ChannelListHeader extends React.Component {
  render() {
    const clusterName = this.props.sites[this.props.channel.cluster_id].content.title;
    const itemFileSize = fileHelpers.getChannelTotalFileSize(this.props.items);
    const fileSize = appHelpers.getFileSize(itemFileSize);
    let totalChannelFileSize;
    if (this.props.totalFileSize) totalChannelFileSize = appHelpers.getFileSize(this.props.totalFileSize);else totalChannelFileSize = 0;
    return React.createElement(
      "div",
      { id: "channel-dashboard-header", className: "ui visible info message" },
      React.createElement(
        "span",
        { className: "item" },
        React.createElement(
          "b",
          null,
          "Cluster:"
        ),
        clusterName
      ),
      React.createElement(
        "span",
        { className: "item" },
        "\u25CF"
      ),
      React.createElement(
        "span",
        { className: "item" },
        React.createElement(
          "b",
          null,
          "Files: "
        ),
        " ",
        this.props.items.length,
        " / ",
        this.props.totalItemCount,
        " Total"
      ),
      React.createElement(
        "span",
        { className: "item" },
        "\u25CF"
      ),
      React.createElement(
        "span",
        { className: "item" },
        React.createElement(
          "b",
          null,
          "Size:"
        ),
        fileSize,
        " / ",
        totalChannelFileSize,
        " Total"
      )
    );
  }
}

class ChannelFileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_info: {}
    };
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
    this.handleEditItemClick = this.handleEditItemClick.bind(this);
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
    this.handleDeleteConfirmationClick = this.handleDeleteConfirmationClick.bind(this);
  }

  componentDidMount() {
    this.getOptionalFileInfo(this.props.item);
  }

  getOptionalFileInfo() {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function (res) {
      this.setState({
        file_info: res
      });
    }.bind(this));
  }

  handleEditItemClick() {
    this.props.onEditItemClick(this.props.item);
  }

  handleDeleteItemClick() {
    jQuery('#' + this.props.item.item_id).modal('show');
  }

  handleDeleteConfirmationClick() {
    this.props.onDeleteItemClick(this.props.item);
  }

  render() {
    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    let inCache = false;
    let peerCount = 0;
    if (this.state.file_info) {
      inCache = this.state.file_info.is_downloaded;
      peerCount = this.state.file_info.peer;
    }
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        { className: "left aligned" },
        React.createElement(
          "a",
          { href: itemLink },
          this.props.item.title
        ),
        React.createElement("br", null),
        this.props.item.file_name
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        React.createElement("i", { className: inCache ? "icon check circle green" : "remove circle red" })
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        peerCount
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        fileSize
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        this.props.item.content_type
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        this.props.item.file_type
      ),
      React.createElement(
        "td",
        { className: "center aligned" },
        timeAgo
      ),
      React.createElement(
        "td",
        { className: "right aligned" },
        React.createElement(
          "div",
          { className: "list-item-actions" },
          React.createElement(
            "div",
            { className: "ui menu" },
            React.createElement(
              "div",
              { className: "right ui menu" },
              React.createElement(
                "a",
                { className: "item", onClick: this.handleEditItemClick },
                React.createElement("i", { className: "icon edit" })
              ),
              React.createElement(
                "a",
                { className: "item", onClick: this.handleDeleteItemClick },
                React.createElement("i", { className: "icon trash" })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "ui basic mini modal confirm-delete-file-modal ", id: this.props.item.item_id },
            React.createElement(
              "div",
              { className: "ui icon header" },
              React.createElement("i", { className: "trash icon" }),
              "Are You Sure?"
            ),
            React.createElement(
              "div",
              { className: "content" },
              React.createElement(
                "p",
                null,
                "all peer , comment & vote information would be irreversibly removed!"
              )
            ),
            React.createElement(
              "div",
              { className: "actions" },
              React.createElement(
                "div",
                { className: "ui red basic cancel inverted button" },
                React.createElement("i", { className: "remove icon" }),
                "Cancel"
              ),
              React.createElement(
                "div",
                { className: "ui green ok inverted button", onClick: this.handleDeleteConfirmationClick },
                React.createElement("i", { className: "checkmark icon" }),
                "Yes"
              )
            )
          )
        )
      )
    );
  }
}

class ChannelInfoBox extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "channel-info-box", className: "ui centered grid" },
      React.createElement(
        "div",
        { className: "center aligned column " },
        React.createElement(
          "div",
          { className: "ui secondary introduction container" },
          React.createElement(ChannelImageContainer, {
            config: this.props.config,
            channel: this.props.channel
          }),
          React.createElement(
            "h2",
            null,
            this.props.channel.channel_name
          )
        )
      )
    );
  }
}

class ChannelImageContainer extends React.Component {
  render() {
    let imagePath;
    if (this.props.channel.logo_file) {
      imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.channel.logo_file;
    } else {
      imagePath = "assets/img/x-avatar.png";
    }

    return React.createElement("img", { className: "avatar channel-image", src: imagePath });
  }
}

class ChannelFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props.channel || {},
      errors: []
    };
    this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
    this.handleChannelDescriptionChange = this.handleChannelDescriptionChange.bind(this);
    this.handleChannelClusterChange = this.handleChannelClusterChange.bind(this);
    this.handleAssociatedImageClick = this.handleAssociatedImageClick.bind(this);
    this.handleFinishUploadingAssociatedImage = this.handleFinishUploadingAssociatedImage.bind(this);
    this.handleRemoveAssociatedImageClick = this.handleRemoveAssociatedImageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateChannel = this.updateChannel.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }

  handleChannelNameChange(channel_name) {
    const channel = this.state.channel;
    channel.channel_name = channel_name;
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleChannelDescriptionChange(channel_description) {
    const channel = this.state.channel;
    channel.channel_description = channel_description;
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleChannelClusterChange(clusterId) {
    const channel = this.state.channel;
    channel.clusterId = clusterId;
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleAssociatedImageClick(image) {
    const channel = this.state.channel;
    channel.logo_file = image.file_name;
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleFinishUploadingAssociatedImage(imageItem) {
    const channel = this.state.channel;
    channel.logo_file = imageItem.file_name;
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleRemoveAssociatedImageClick() {
    const channel = this.state.channel;
    channel.logo_file = '';
    this.setState({ channel: channel }, function () {
      this.validateForm();
    });
  }

  handleFormSubmit() {
    if (this.state.errors.length === 0) {
      if (this.props.isCreate) {
        this.createChannel();
      } else {
        this.updateChannel();
      }
    }
  }

  validateForm() {
    const errors = formHelpers.validateChannelForm(this.state.channel);
    if (errors) {
      this.setState({ errors: errors });
    }
  }

  createChannel() {
    this.props.onCreateChannel(this.state.channel);
  }

  updateChannel() {
    this.props.onUpdateChannel(this.state.channel);
  }

  render() {
    let errorsContainer;
    if (this.state.errors.length > 0) {
      const formErrors = this.state.errors.map((error, i) => React.createElement(
        "p",
        { key: "{i}" },
        error
      ));
      errorsContainer = React.createElement(
        "div",
        { className: "ui error message" },
        React.createElement(
          "div",
          { className: "header" },
          "Error"
        ),
        formErrors
      );
    }

    if (this.state.loading) {
      return React.createElement(LoadingContainer, null);
    } else {
      let staticInfoContainer, itemPosterConfigContainer;
      if (!this.props.isCreate) {
        staticInfoContainer = React.createElement(ItemStaticInfoContainer, {
          channel: this.props.channel
        });
        itemPosterConfigContainer = React.createElement(ItemPosterConfigContainer, {
          isChannel: true,
          page: this.props.page,
          channel: this.props.channel,
          user: this.props.user,
          config: this.props.config,
          onRemoveAssociatedImageClick: this.handleRemoveAssociatedImageClick,
          onFinishUploadingAssociatedImage: this.handleFinishUploadingAssociatedImage,
          onAssociatedImageClick: this.handleAssociatedImageClick
        });

        return React.createElement(
          "div",
          { id: "channel-form-container", className: "ui grid form-section-content" },
          React.createElement(
            "div",
            { className: "six wide tablet four wide computer column" },
            staticInfoContainer,
            itemPosterConfigContainer
          ),
          React.createElement(
            "div",
            { className: "ten wide tablet twelve wide computer column" },
            errorsContainer,
            React.createElement(ChannelForm, {
              channel: this.props.channel,
              sites: this.props.sites,
              config: this.props.config,
              onChannelNameChange: this.handleChannelNameChange,
              onChannelDescriptionChange: this.handleChannelDescriptionChange,
              onChannelClusterChange: this.handleChannelClusterChange,
              onFormSubmit: this.handleFormSubmit
            })
          )
        );
      } else {

        return React.createElement(
          "div",
          { id: "new-channel-form-container", className: "ui grid form-section-content" },
          React.createElement(
            "div",
            { className: "ui segment container header blue" },
            React.createElement(
              "h2",
              null,
              "New Channel"
            )
          ),
          errorsContainer,
          React.createElement(ChannelForm, {
            isCreate: true,
            channel: this.state.channel,
            sites: this.props.sites,
            config: this.props.config,
            onChannelNameChange: this.handleChannelNameChange,
            onChannelDescriptionChange: this.handleChannelDescriptionChange,
            onChannelClusterChange: this.handleChannelClusterChange,
            onFormSubmit: this.handleFormSubmit
          })
        );
      }
    }
  }
}

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChannelNameInputChange = this.handleChannelNameInputChange.bind(this);
    this.handleChannelDescriptionInputChange = this.handleChannelDescriptionInputChange.bind(this);
    this.handleChannelClusterChange = this.handleChannelClusterChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChannelNameInputChange(e) {
    this.props.onChannelNameChange(e.target.value);
  }

  handleChannelDescriptionInputChange(e) {
    this.props.onChannelDescriptionChange(e.target.value);
  }

  handleChannelClusterChange(clusterId) {
    this.props.onChannelClusterChange(clusterId);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  render() {

    let clusterSelectContainer;
    let submitButton;
    if (this.props.isCreate) {
      let optionList = this.props.config.clusters.slice();
      optionList = optionList.splice(1, 1);
      optionList.forEach(function (option, index) {
        option.value = option.cluster_id;
        option.label = this.props.sites[option.cluster_id].content.title;
      }.bind(this));

      clusterSelectContainer = React.createElement(FormSelectContainer, {
        options: optionList,
        onSelectChange: this.handleChannelClusterChange,
        selected: optionList[0]
      });
    } else {
      const channelClusterId = this.props.channel.cluster_id;
      let channelClusterName;
      for (var i in this.props.sites) {
        const s = this.props.sites[i];
        if (i === channelClusterId) channelClusterName = this.props.sites[i].content.title;
      }
      clusterSelectContainer = React.createElement("input", { type: "text", value: channelClusterName, disabled: "disabled" });
    }
    let defaultValues = {};
    if (this.props.isCreate) {
      defaultValues.channel_name = '';
      defaultValues.channel_description = '';
      defaultValues.button_text = 'Create';
      if (this.props.channel.channel_name && this.props.channel.channel_name.length > 0) {
        submitButton = React.createElement(
          "button",
          { onClick: this.handleFormSubmit, className: "ui button primary", type: "submit" },
          defaultValues.button_text
        );
      }
    } else {
      defaultValues.channel_name = this.props.channel.channel_name;
      defaultValues.channel_description = this.props.channel.channel_description;
      defaultValues.button_text = 'Update';
      submitButton = React.createElement(
        "button",
        { onClick: this.handleFormSubmit, className: "ui button primary", type: "submit" },
        defaultValues.button_text
      );
    }

    return React.createElement(
      "div",
      { className: "ui segment container form-view" },
      React.createElement(
        "form",
        { onSubmit: this.handleFormSubmit, className: "ui form" },
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Cluster"
          ),
          clusterSelectContainer
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Channel Name"
          ),
          React.createElement("input", {
            type: "text",
            defaultValue: defaultValues.channel_name,
            onChange: this.handleChannelNameInputChange
          })
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Description"
          ),
          React.createElement("textarea", {
            type: "textarea",
            defaultValue: defaultValues.channel_description,
            onChange: this.handleChannelDescriptionInputChange })
        ),
        submitButton
      )
    );
  }
}

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleChannelNameClick = this.handleChannelNameClick.bind(this);
    this.handleEditChannelClick = this.handleEditChannelClick.bind(this);
    this.handleRepublishClick = this.handleRepublishClick.bind(this);
  }

  handleUploadClick() {
    this.props.onUploadClick();
  }

  handleChannelNameClick() {
    this.props.onResetSection();
  }

  handleEditChannelClick() {
    this.props.onEditChannelClick();
  }

  handleRepublishClick() {
    this.props.onRepublishChannelClick();
  }

  render() {
    return React.createElement(
      "div",
      { id: "channel-header-container" },
      React.createElement(
        "div",
        { id: "channel-header", className: "ui grid" },
        React.createElement(
          "div",
          { id: "channel-header-left", className: "column ten wide computer" },
          React.createElement(
            "div",
            { className: "ui menu secondary pointing" },
            React.createElement(
              "a",
              { className: this.props.section === "main" ? "item active" : "item", onClick: this.handleChannelNameClick },
              this.props.channel.channel_name
            ),
            React.createElement(
              "a",
              { className: this.props.section === "edit-channel" ? "item edit active" : "item edit", onClick: this.handleEditChannelClick },
              React.createElement(
                "h4",
                { className: "ui icon header" },
                React.createElement("i", { className: "edit icon" })
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: "channel-header-right", className: "column six wide computer" },
          React.createElement(
            "div",
            { className: "ui menu right secondary pointing" },
            React.createElement(
              "div",
              { className: "item right" },
              React.createElement(
                "a",
                { className: this.props.section === "upload" ? "item upload active" : "item upload", onClick: this.handleUploadClick },
                React.createElement(
                  "h4",
                  { className: "ui icon header" },
                  React.createElement("i", { className: "cloud upload icon" })
                )
              ),
              React.createElement(
                "a",
                { className: "item republish", onClick: this.handleRepublishClick },
                React.createElement(
                  "h4",
                  { className: "ui icon header" },
                  React.createElement("i", { className: "refresh icon" })
                )
              )
            )
          )
        )
      )
    );
  }
}
window.clusterHelpers = function () {

  function countTotalChannels(cluster_id, moderations, showModerations) {
    let q = "SELECT count(*) FROM channel";
    q += " WHERE channel_name IS NOT NULL";
    if (cluster_id) q += " AND cluster_id='" + cluster_id + "'";
    if (moderations && showModerations) {
      if (moderations.users) {
        moderations.users.forEach(function (hu, index) {
          q += " AND channel_address NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.channels) {
        q += " AND channel_address NOT IN (";
        moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
    }
    return q;
  }

  // generate item sort menu
  function genereateSortOptions() {
    const sort_options = [{
      label: 'title',
      val: 'c.channel_name',
      dir: 'DESC'
    }, {
      label: 'date',
      val: 'c.date_added',
      dir: 'DESC'
    }, {
      label: 'audio',
      val: 'audio_count',
      dir: 'DESC'
    }, {
      label: 'books',
      val: 'book_count',
      dir: 'DESC'
    }, {
      label: 'images',
      val: 'image_count',
      dir: 'DESC'
    }, {
      label: 'games',
      val: 'game_count',
      dir: 'DESC'
    }, {
      label: 'videos',
      val: 'video_count',
      dir: 'DESC'
    }];
    return sort_options;
  }

  // render pagination
  function renderPagination(filters, item_count) {
    const pagination = {};
    pagination.totalItems = item_count;
    pagination.currentPage = filters.current_page;
    pagination.items_per_page = 10;
    pagination.numPages = Math.ceil(pagination.totalItems / pagination.items_per_page);
    return pagination;
  }

  function getClusterChannelsQuery(cluster_id, filters, moderations, showModerations) {
    let q = "SELECT c.*";
    q += ", (SELECT count(*) FROM item WHERE item.channel=c.channel_address AND item.content_type='audio') as audio_count";
    q += ", (SELECT count(*) FROM item WHERE item.channel=c.channel_address AND item.content_type='book') as book_count";
    q += ", (SELECT count(*) FROM item WHERE item.channel=c.channel_address AND item.content_type='image') as image_count";
    q += ", (SELECT count(*) FROM item WHERE item.channel=c.channel_address AND item.content_type='game') as game_count";
    q += ", (SELECT count(*) FROM item WHERE item.channel=c.channel_address AND item.content_type='video') as video_count";
    q += " FROM channel AS c";
    q += " WHERE c.channel_name IS NOT NULL";
    if (cluster_id) q += " AND c.cluster_id='" + cluster_id + "'";
    if (moderations && showModerations) {
      if (moderations.users) {
        moderations.users.forEach(function (hu, index) {
          q += " AND channel_address NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.channels) {
        q += " AND channel_address NOT IN (";
        moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
    }
    if (filters.sortBy) {
      q += " ORDER BY " + filters.sortBy.val + " " + filters.sortBy.dir + " ";
    }
    q += " LIMIT 10";
    if (filters.pagination) {
      if (filters.pagination.currentPage > 1) q += " OFFSET " + (filters.pagination.currentPage - 1) * filters.pagination.items_per_page;
    }
    return q;
  }

  return {
    countTotalChannels,
    renderPagination,
    genereateSortOptions,
    getClusterChannelsQuery
  };
}();
class ClustersView extends React.Component {
  constructor(props) {
    super(props);

    let currentPage;
    const route = store.getState().route;
    if (route.page) {
      currentPage = route.page;
    } else {
      currentPage = 1;
    }

    this.state = {
      channels: [],
      pagination: [],
      sort_options: [],
      channel_count: '',
      current_page: currentPage
    };
    this.onGetClusterChannels = this.onGetClusterChannels.bind(this);
    this.countTotalChannels = this.countTotalChannels.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderSortOptions = this.renderSortOptions.bind(this);
    this.getClusterChannels = this.getClusterChannels.bind(this);
    this.onPaginationButtonClick = this.onPaginationButtonClick.bind(this);
    this.setPage = this.setPage.bind(this);
    this.onSortOptionClick = this.onSortOptionClick.bind(this);
  }

  componentDidMount() {
    this.onGetClusterChannels();
  }

  onGetClusterChannels() {
    this.setState({
      channels: [],
      pagination: [],
      loading: true
    }, function () {
      this.countTotalChannels();
    });
  }

  countTotalChannels() {
    const query = clusterHelpers.countTotalChannels(this.props.route.id, this.props.moderations, this.props.showModerations);
    Page.cmd("dbQuery", [query], function (channel_count) {
      this.renderPagination(channel_count[0]['count(*)']);
    }.bind(this));
  }

  renderPagination(channel_count) {
    const pagination = clusterHelpers.renderPagination(this.state, channel_count);
    this.setState({
      channel_count: channel_count,
      pagination: pagination
    }, function () {
      this.renderSortOptions();
    });
  }

  renderSortOptions() {
    const sort_options = clusterHelpers.genereateSortOptions();
    this.setState({
      sort_options: sort_options
    }, function () {
      if (!this.state.sortBy) {
        this.setState({
          sortBy: sort_options[1]
        }, function () {
          this.getClusterChannels();
        });
      } else {
        this.getClusterChannels();
      }
    });
  }

  getClusterChannels() {
    let query = clusterHelpers.getClusterChannelsQuery(this.props.route.id, this.state, this.props.moderations, this.props.showModerations);
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({
        channels: res,
        loading: false
      }, function () {
        // console.log(this.state);
      });
    }.bind(this));
  }

  onPaginationButtonClick(next_page_number) {
    this.setPage(next_page_number);
  }

  setPage(next_page_number) {
    this.setState({
      current_page: next_page_number
    }, function () {
      this.onGetClusterChannels();
    });
  }

  onSortOptionClick(sort_option) {
    this.setState({ sortBy: sort_option }, function () {
      this.onGetClusterChannels();
    });
  }

  render() {
    if (this.state.loading) {
      return React.createElement(
        'div',
        { id: 'cluster-channel-list-container', className: 'viewport' },
        React.createElement(
          'div',
          { id: 'cluster-channel-list', className: 'ui container' },
          React.createElement(LoadingContainer, { msg: 'Loading Clusters Info' })
        )
      );
    } else {
      return React.createElement(
        'div',
        { id: 'cluster-channel-list-container', className: 'viewport' },
        React.createElement(
          'div',
          { id: 'cluster-channel-list', className: 'ui container segment' },
          React.createElement(ClusterViewHeader, {
            route: this.props.route,
            sites: this.props.sites,
            channelCount: this.state.channel_count,
            onClusterFileDistributeChange: this.props.onClusterFileDistributeChange,
            onAllFileDistributeChange: this.props.onAllFileDistributeChange
          }),
          React.createElement(ClusterChannelList, {
            sortOptions: this.state.sort_options,
            sortBy: this.state.sortBy,
            page: this.props.page,
            channels: this.state.channels,
            onSortOptionClick: this.onSortOptionClick
          }),
          React.createElement(Pagination, {
            pagination: this.state.pagination,
            onPaginationButtonClick: this.onPaginationButtonClick
          })
        )
      );
    }
  }
}

class ClusterViewHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClusterFileDistributeInputChange = this.handleClusterFileDistributeInputChange.bind(this);
    this.handleAllFileDistributeInputChange = this.handleAllFileDistributeInputChange.bind(this);
    this.handleOptionalSetLimit = this.handleOptionalSetLimit.bind(this);
  }

  handleClusterFileDistributeInputChange(e) {
    this.props.onClusterFileDistributeChange(e.target.checked, this.props.route.id);
  }

  handleAllFileDistributeInputChange(e) {
    if (e.target.checked === true) this.props.onAllFileDistributeChange(e.target.checked);
  }

  handleOptionalSetLimit() {
    Page.cmd("optionalLimitSet", { limit: 5 }, function (res) {
      console.log(res);
      //this.getMergerSites();
    }.bind(this));
  }

  render() {
    console.log(this.props);
    let title;
    if (this.props.route.id) {
      title = this.props.sites[this.props.route.id].content.title;
    } else {
      title = 'All';
    }

    let toggleableAutoDownloadButton;
    if (this.props.route.id) {
      toggleableAutoDownloadButton = React.createElement(
        'div',
        { className: 'ui right floated compact segment checkbox-container' },
        React.createElement(
          'div',
          { className: 'ui toggle checkbox' },
          React.createElement('input', {
            type: 'checkbox',
            name: 'distributeFiles',
            defaultChecked: this.props.sites[this.props.route.id].settings.autodownloadoptional,
            onChange: this.handleClusterFileDistributeInputChange }),
          React.createElement(
            'label',
            null,
            'Help distribute files'
          )
        )
      );
    } else {
      toggleableAutoDownloadButton = React.createElement(
        'div',
        { className: 'ui right floated compact segment checkbox-container' },
        React.createElement(
          'div',
          { className: 'ui toggle checkbox' },
          React.createElement('input', {
            type: 'checkbox',
            name: 'distributeFiles',
            defaultChecked: true,
            onChange: this.handleAllFileDistributeInputChange }),
          React.createElement(
            'label',
            null,
            'Access all Clusters of this server'
          )
        )
      );
    }

    let clusterLink;
    if (this.props.route.id) {
      clusterLink = this.props.sites[this.props.route.id].address;
    }

    return React.createElement(
      'div',
      { id: 'cluster-view-header', className: 'ui segment header blue inverted' },
      React.createElement(
        'h2',
        null,
        React.createElement(
          'div',
          { className: 'item-title-name' },
          React.createElement(
            'a',
            null,
            title
          ),
          React.createElement(
            'span',
            { className: 'ui tag label' },
            'channels: ',
            this.props.channelCount
          )
        )
      ),
      toggleableAutoDownloadButton,
      React.createElement(
        'a',
        { className: 'cluster-link', href: "/" + clusterLink },
        clusterLink
      )
    );
  }
}

class ClusterChannelList extends React.Component {
  render() {
    const channels = this.props.channels.map((channel, i) => React.createElement(ClusterChannelListItem, {
      key: i + channel.channel_address,
      channel: channel
    }));
    return React.createElement(
      'div',
      { id: 'cluster-channels' },
      React.createElement(
        'table',
        { className: 'ui celled striped table', id: 'upload-files-table' },
        React.createElement(ClusterChannelsSortOptionMenu, {
          sortOptions: this.props.sortOptions,
          sortBy: this.props.sortBy,
          onSortOptionClick: this.props.onSortOptionClick
        }),
        React.createElement(
          'tbody',
          null,
          channels
        )
      )
    );
  }
}

class ClusterChannelListItem extends React.Component {
  render() {
    const timeAgo = appHelpers.getTimeAgo(this.props.channel.date_added);

    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        React.createElement(
          'a',
          { href: 'index.html?view:channel+id:' + this.props.channel.channel_address },
          this.props.channel.channel_name
        )
      ),
      React.createElement(
        'td',
        null,
        timeAgo
      ),
      React.createElement(
        'td',
        null,
        this.props.channel.audio_count === 0 ? '' : this.props.channel.audio_count
      ),
      React.createElement(
        'td',
        null,
        this.props.channel.book_count === 0 ? '' : this.props.channel.book_count
      ),
      React.createElement(
        'td',
        null,
        this.props.channel.image_count === 0 ? '' : this.props.channel.image_count
      ),
      React.createElement(
        'td',
        null,
        this.props.channel.game_count === 0 ? '' : this.props.channel.game_count
      ),
      React.createElement(
        'td',
        null,
        this.props.channel.video_count === 0 ? '' : this.props.channel.video_count
      )
    );
  }
}

class ClusterChannelsSortOptionMenu extends React.Component {
  render() {
    const sortOptions = this.props.sortOptions.map((sort, i) => React.createElement(ClusterChannelsSortOption, {
      key: i + sort.label,
      sortOption: sort,
      sortBy: this.props.sortBy,
      onSortOptionClick: this.props.onSortOptionClick
    }));
    return React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        sortOptions
      )
    );
  }
}

class ClusterChannelsSortOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleSortOptionClick = this.handleSortOptionClick.bind(this);
  }

  handleSortOptionClick() {

    let sortOption = {
      label: this.props.sortOption.label,
      val: this.props.sortOption.val
    };

    if (this.props.sortBy) {
      if (this.props.sortBy.val === this.props.sortOption.val) {
        sortOption.dir = this.props.sortBy.dir === 'DESC' ? 'ASC' : 'DESC';
      } else {
        sortOption.dir = this.props.sortOption.dir;
      }
    } else {
      sortOption.dir = this.props.sortOption.dir;
    }
    this.props.onSortOptionClick(sortOption);
  }

  render() {

    return React.createElement(
      'th',
      null,
      React.createElement(
        'a',
        { className: 'cluster-channels-sort-option', onClick: this.handleSortOptionClick },
        React.createElement('i', { className: this.props.sortBy.val === this.props.sortOption.val && this.props.sortBy.dir === this.props.sortOption.dir ? "icon long arrow up" : "icon long arrow down" }),
        this.props.sortOption.label
      )
    );
  }
}
window.commentHelpers = function () {
  function getCommentsQuery(item) {
    let q = "SELECT * FROM comment WHERE item_id='" + item.item_id + "' ORDER BY -date_added";
    return q;
  };

  function randomRgba(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = hash >> i * 8 & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  return {
    getCommentsQuery,
    randomRgba
  };
}();
class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.getComments = this.getComments.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const query = commentHelpers.getCommentsQuery(this.props.item);
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ comments: res });
    }.bind(this));
  }

  handlePostComment() {
    this.getComments();
  }

  render() {
    return React.createElement(
      "div",
      { id: "comments-container" },
      React.createElement(CommentFormWrapper, {
        item: this.props.item,
        user: this.props.user,
        page: this.props.page,
        config: this.props.config,
        onPostComment: this.handlePostComment
      }),
      React.createElement(CommentList, {
        comments: this.state.comments
      })
    );
  }
}

class CommentList extends React.Component {
  render() {

    const comments = this.props.comments.map((comment, i) => React.createElement(CommentListItem, {
      key: i,
      comment: comment
    }));
    return React.createElement(
      "div",
      { className: "ui comments" },
      comments
    );
  }
}

class CommentListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const initials = this.props.comment.user_id.substring(0, 2);
    const bgColor = commentHelpers.randomRgba(this.props.comment.user_id);
    this.setState({ loading: false, bgColor: bgColor, initials: initials });
  }

  render() {
    const timeAgo = appHelpers.getTimeAgo(this.props.comment.date_added);

    const userAvatar = React.createElement(
      "div",
      { className: "user-avatar initials", style: { width: "28px", height: "28px" } },
      React.createElement(
        "span",
        { style: { background: this.state.bgColor } },
        this.state.initials
      )
    );

    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "a",
        { className: "avatar" },
        userAvatar
      ),
      React.createElement(
        "div",
        { className: "content" },
        React.createElement(
          "a",
          { className: "author" },
          this.props.comment.user_id
        ),
        React.createElement(
          "div",
          { className: "metadata" },
          React.createElement(
            "span",
            { className: "date" },
            timeAgo
          )
        ),
        React.createElement(
          "div",
          { className: "text" },
          this.props.comment.comment
        )
      )
    );
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: false,
      validated: false
    };
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.emulateKeyPress = this.emulateKeyPress.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.postComment = this.postComment.bind(this);
    this.finishPostingComment = this.finishPostingComment.bind(this);
  }

  componentDidMount() {
    if (this.props.user && this.props.user.user_name) {
      const initials = this.props.user.user_name.substring(0, 2);
      const bgColor = commentHelpers.randomRgba(this.props.user.user_name);
      this.setState({ loading: false, bgColor: bgColor, initials: initials });
    }
  }

  handleTextareaChange(e) {
    this.setState({
      text: e.target.value
    }, function () {
      if (this.state.text.length) {
        if (!this.state.validated) this.setState({ validated: true });
      } else {
        this.setState({ validated: false });
      }
    });
  }

  emulateKeyPress(e) {
    if (this.props.item.content_type === 'game') {
      let map = [];
      e.preventDefault();
      map[e.originalEvent.keyCode] = e.type == 'keydown';
      if (map[91] === true || map[93] === true) {
        if (e.originalEvent.keyCode === 65) {
          e.target.selectionStart = 0;
        }
      } else {
        if (e.originalEvent.keyCode === 37 && map[37] === true) {
          e.target.selectionStart -= 1;
          e.target.selectionEnd = e.target.selectionStart;
        } else if (e.originalEvent.keyCode === 39 && map[39] === true) {
          e.target.selectionStart += 1;
          e.target.selectionEnd = e.target.selectionStart;
        } else if (e.originalEvent.keyCode === 38 && map[38] === true) {} else if (e.originalEvent.keyCode === 40 && map[40] === true) {} else {
          const comment = appHelpers.emulateKeyPress(e.originalEvent, e.target, this.state.comment, map);
        }
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.validated) this.postComment();
  }

  postComment() {

    this.setState({
      loading: true
    }, function () {

      const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.user.cluster + "/data/users/" + this.props.user.user_auth_address + "/data.json";

      Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
        if (data) {
          data = JSON.parse(data);
          if (!data.comment) {
            data.comment = [];
            data.next_comment_id = 1;
          }
        } else {
          data = { "next_comment_id": 1, "comment": [] };
        }
        // comment
        const comment = {
          comment_id: data.next_comment_id,
          item_id: this.props.item.item_id,
          comment: this.state.text,
          user_id: this.props.user.user_name,
          date_added: +new Date()
        };
        data.next_comment_id += 1;
        data.comment.push(comment);
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
          Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
            this.finishPostingComment();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });
  }

  finishPostingComment() {
    this.setState({
      text: '',
      loading: false
    }, function () {
      document.getElementById('comment-form').value = '';
      this.props.onPostComment();
    });
  }

  render() {

    if (this.props.user && this.props.user.user_name) {

      const userAvatar = React.createElement(
        "div",
        { className: "user-avatar initials", style: { width: "28px", height: "28px" } },
        React.createElement(
          "span",
          { style: { background: this.state.bgColor } },
          this.state.initials
        )
      );

      let submitButton;
      if (this.state.validated) {
        submitButton = React.createElement(
          "button",
          { className: "ui button primary", type: "submit" },
          "comment"
        );
      }

      return React.createElement(
        "div",
        { id: "comment-form-container", className: this.state.loading ? "ui segment loading" : "ui segment" },
        React.createElement(
          "div",
          { className: "comment-avatar" },
          userAvatar
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleFormSubmit, className: "ui form" },
          React.createElement(
            "div",
            { className: "field" },
            React.createElement(
              "label",
              null,
              this.props.user.user_name
            ),
            React.createElement("textarea", {
              id: "comment-form",
              rows: "3",
              placeholder: "write your comment here...",
              onChange: this.handleTextareaChange })
          ),
          submitButton
        )
      );
    } else {
      return React.createElement(
        "p",
        null,
        "login to comment"
      );
    }
  }
}

const mapStateToCommentFormProps = state => {
  const user = state.user;
  return {
    user
  };
};

const mapDispatchToCommentFormProps = dispatch => {
  return {
    dispatch
  };
};

const CommentFormWrapper = ReactRedux.connect(mapStateToCommentFormProps, mapDispatchToCommentFormProps)(CommentForm);
window.emulatorHelpers = function () {

  function getEmulatorTypeByFileType(file_type) {
    let emulator_type;
    if (file_type === 'nes') {
      emulator_type = 'nes';
    }
    if (file_type === 'zip' || file_type === 'exe' || file_type === 'EXE' || file_type === 'com') {
      emulator_type = 'dos';
    }
    if (file_type === 'bin' || file_type === 'a78') {
      emulator_type = 'atari';
    }
    if (file_type === 'sna') {
      emulator_type = 'amstrad';
    }
    return emulator_type;
  }

  return {
    getEmulatorTypeByFileType
  };
}();
class NesEmulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onFetchMediaFile = this.onFetchMediaFile.bind(this);
    this.mountNesGame = this.mountNesGame.bind(this);
  }

  componentDidMount() {
    this.onFetchMediaFile();
  }

  onFetchMediaFile() {
    // Add ajax_key get parameter to all ajax requests
    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
      var newOpen = function (method, url, async) {
        if (url.indexOf("?") == -1) {
          url += "?ajax_key=" + res;
        } else {
          url += "&ajax_key=" + res;
        }
        return this.realOpen(method, url, async);
      };
      XMLHttpRequest.prototype.open = newOpen;
      this.mountNesGame();
    }.bind(this));
  }

  mountNesGame() {
    // init jsnes
    var nes = new JSNES({
      'ui': jQuery('#emulator').JSNESUI({
        "Working": []
      })
    });
    // remove select options
    nes.ui.romSelect.children().remove();
    // create select option
    $('<option value="' + this.props.innerPath + '">' + this.props.item.title + '</option>').appendTo(nes.ui.romSelect);
    // select rom
    nes.ui.romSelect.val(this.props.innerPath);
    // load nes
    nes.ui.loadROM();
  }

  render() {
    return React.createElement(
      "div",
      { id: "nes-emulator" },
      React.createElement(
        "center",
        { id: "nes-emulator-container" },
        React.createElement("div", { id: "emulator" }),
        React.createElement(
          "div",
          { id: "emcontrols" },
          React.createElement(
            "div",
            { className: "ui segment inverted nes-controls-info-container" },
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                React.createElement(
                  "b",
                  null,
                  "Button"
                )
              ),
              React.createElement(
                "span",
                null,
                React.createElement(
                  "b",
                  null,
                  "Player 1"
                )
              ),
              React.createElement(
                "span",
                null,
                React.createElement(
                  "b",
                  null,
                  "Player 2"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Left"
              ),
              React.createElement(
                "span",
                null,
                "Left"
              ),
              React.createElement(
                "span",
                null,
                "Num-4"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Right"
              ),
              React.createElement(
                "span",
                null,
                "Right"
              ),
              React.createElement(
                "span",
                null,
                "Num-6"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Up"
              ),
              React.createElement(
                "span",
                null,
                "Up"
              ),
              React.createElement(
                "span",
                null,
                "Num-8"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Down"
              ),
              React.createElement(
                "span",
                null,
                "Down"
              ),
              React.createElement(
                "span",
                null,
                "Num-2"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "A"
              ),
              React.createElement(
                "span",
                null,
                "X"
              ),
              React.createElement(
                "span",
                null,
                "Num-7"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "B"
              ),
              React.createElement(
                "span",
                null,
                "Z/Y"
              ),
              React.createElement(
                "span",
                null,
                "Num-9"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Start"
              ),
              React.createElement(
                "span",
                null,
                "Enter"
              ),
              React.createElement(
                "span",
                null,
                "Num-1"
              )
            ),
            React.createElement(
              "div",
              { className: "nes-controls-info-row" },
              React.createElement(
                "span",
                null,
                "Select"
              ),
              React.createElement(
                "span",
                null,
                "Clil"
              ),
              React.createElement(
                "span",
                null,
                "Num-3"
              )
            )
          )
        )
      )
    );
  }
}

class AtariEmulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onFetchMediaFile = this.onFetchMediaFile.bind(this);
    this.mountAtariGame = this.mountAtariGame.bind(this);
  }

  componentDidMount() {
    this.onFetchMediaFile();
  }

  onFetchMediaFile() {
    // Add ajax_key get parameter to all ajax requests
    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      this.mountAtariGame(res);
    }.bind(this));
  }

  mountAtariGame(ajaxKey) {
    if (this.props.innerFile) {
      $.ajax(this.props.innerPath + "/" + this.props.innerFile + "?ajax_key=" + ajaxKey).done(function (res) {
        Javatari.ROM_AUTO_LOAD_URL = res;
        Javatari.IMAGES_PATH = window.Javatari_IMAGES_PATH || '/' + store.getState().site_info.address + '/assets/lib/javatari/';
        Javatari.start();
      });
    } else {
      Javatari.ROM_AUTO_LOAD_URL = this.props.innerPath + "?ajax_key=" + ajaxKey;
      Javatari.IMAGES_PATH = window.Javatari_IMAGES_PATH || '/' + store.getState().site_info.address + '/assets/lib/javatari/';
      Javatari.start();
    }
  }

  render() {
    return React.createElement(
      "div",
      { id: "atari-emulator-container" },
      React.createElement(
        "section",
        { id: "javatari" },
        React.createElement(
          "div",
          { id: "javatari-elements-container" },
          React.createElement("div", { id: "javatari-screen" }),
          React.createElement("div", { id: "javatari-console-panel" })
        )
      )
    );
  }
}

class DosEmulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onFetchMediaFile = this.onFetchMediaFile.bind(this);
    this.mountDosGame = this.mountDosGame.bind(this);
  }

  componentDidMount() {
    console.log('dosEmu CDM');
    this.onFetchMediaFile();
  }

  onFetchMediaFile() {
    // Add ajax_key get parameter to all ajax requests
    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
      var newOpen = function (method, url, async) {
        if (url.indexOf("?") == -1) {
          url += "?ajax_key=" + res;
        } else {
          url += "&ajax_key=" + res;
        }
        return this.realOpen(method, url, async);
      };
      XMLHttpRequest.prototype.open = newOpen;
      this.mountDosGame();
    }.bind(this));
  }

  mountDosGame() {
    const title = this.props.item.title;
    const innerPath = this.props.innerPath;
    const innerFile = this.props.item.inner_file;
    var dosbox = new Dosbox({
      id: "dosbox",
      onrun: function (dosbox, app) {
        console.log("App '" + app + "' is runned");
      },
      onload: function (dosbox) {
        console.log(title + ' running ...');
        dosbox.run(innerPath, "./" + innerFile);
      }
    });
    dosbox.ui.start[0].click();
  }

  render() {
    return React.createElement(
      "div",
      { id: "dos-emulator" },
      React.createElement(
        "section",
        { id: "dosbox-section-container" },
        React.createElement(
          "div",
          { id: "dosbox-section" },
          React.createElement("div", { id: "dosbox" })
        ),
        React.createElement("p", { id: "emulator-status" })
      )
    );
  }
}

class AmstradEmulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lib_path: 'assets/lib/cpcbox/'
    };
    this.startEmulator = this.startEmulator.bind(this);
    this.handleTapeChangeClick = this.handleTapeChangeClick.bind(this);
    this.handleDriveAChangeClick = this.handleDriveChangeClick.bind(this);
    this.handleDriveBChangeClick = this.handleDriveChangeClick.bind(this);
  }

  componentWillMount() {
    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
      var newOpen = function (method, url, async) {
        if (url.indexOf("?") == -1) {
          url += "?ajax_key=" + res;
        } else {
          url += "&ajax_key=" + res;
        }
        return this.realOpen(method, url, async);
      };
      XMLHttpRequest.prototype.open = newOpen;
      this.startEmulator();
    }.bind(this));
  }

  startEmulator() {
    cpcbox();
    $('#snapshot').trigger('change');
  }

  handleTapeChangeClick() {
    $('#tape-input').click();
  }

  handleDriveChangeClick() {
    $('#drivea-input').click();
  }

  handleDriveBChangeClick() {
    $('#driveb-input').click();
  }

  render() {
    return React.createElement(
      "div",
      { className: "main-panel", id: "cpc-emulator-container" },
      React.createElement(
        "div",
        { id: "screen-placeholder" },
        React.createElement("div", { id: "logo" }),
        React.createElement("canvas", { id: "screen", width: "768", height: "272", style: { display: "none" } }),
        React.createElement("div", { id: "option-panel-overlay", style: { display: "none" } }),
        React.createElement(
          "div",
          { id: "option-panel", style: { display: "none" } },
          React.createElement(
            "div",
            { id: "option-panel-header" },
            "Settings",
            React.createElement(
              "div",
              { id: "settings-close" },
              "X"
            )
          ),
          React.createElement(
            "div",
            { id: "option-panel-content" },
            React.createElement(
              "div",
              { className: "option-heading" },
              "Brand name"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "radio", id: "brand1", name: "brand", value: "amstrad" }),
              React.createElement(
                "label",
                { htmlFor: "brand1", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Amstrad"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Worldwide distributor"
                )
              ),
              React.createElement("input", { type: "radio", id: "brand2", name: "brand", value: "schneider" }),
              React.createElement(
                "label",
                { htmlFor: "brand2", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Schneider"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "German distributor"
                )
              ),
              React.createElement("input", { type: "radio", id: "brand3", name: "brand", value: "awa" }),
              React.createElement(
                "label",
                { htmlFor: "brand3", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "AWA"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Australian distributor"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "option-heading" },
              "Keyboard"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "radio", id: "keyboard1", name: "firmware", value: "english" }),
              React.createElement(
                "label",
                { htmlFor: "keyboard1", className: "option-label" },
                React.createElement("img", { src: this.state.lib_path + "img/flag_uk.png", className: "option-flag" }),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "English layout"
                )
              ),
              React.createElement("input", { type: "radio", id: "keyboard2", name: "firmware", value: "french" }),
              React.createElement(
                "label",
                { htmlFor: "keyboard2", className: "option-label" },
                React.createElement("img", { src: this.state.lib_path + "img/flag_france.png", className: "option-flag" }),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "French layout"
                )
              ),
              React.createElement("input", { type: "radio", id: "keyboard3", name: "firmware", value: "spanish" }),
              React.createElement(
                "label",
                { htmlFor: "keyboard3", className: "option-label" },
                React.createElement("img", { src: this.state.lib_path + "img/flag_spain.png", className: "option-flag" }),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Spanish layout"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "option-heading" },
              "CRTC"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "radio", id: "crtc0", name: "crtc", value: "type0" }),
              React.createElement(
                "label",
                { htmlFor: "crtc0", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Type 0"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Hitachi HD6845S"
                )
              ),
              React.createElement("input", { type: "radio", id: "crtc1", name: "crtc", value: "type1" }),
              React.createElement(
                "label",
                { htmlFor: "crtc1", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Type 1"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "UMC UM6845R"
                )
              ),
              React.createElement("input", { type: "radio", id: "crtc2", name: "crtc", value: "type2" }),
              React.createElement(
                "label",
                { htmlFor: "crtc2", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Type 2"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Motorola MC6845"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "option-heading" },
              "Monitor"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "radio", id: "monitor1", name: "monitor", value: "colour" }),
              React.createElement(
                "label",
                { htmlFor: "monitor1", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  React.createElement(
                    "span",
                    { style: { color: "red" } },
                    "Co"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "green" } },
                    "lo"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "blue" } },
                    "ur"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "RGB CPC/Plus"
                )
              ),
              React.createElement("input", { type: "radio", id: "monitor2", name: "monitor", value: "green" }),
              React.createElement(
                "label",
                { htmlFor: "monitor2", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  React.createElement(
                    "span",
                    { style: { color: "#090" } },
                    "Gr"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "#0C0" } },
                    "e"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "#060" } },
                    "en"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Monochrome CPC"
                )
              ),
              React.createElement("input", { type: "radio", id: "monitor3", name: "monitor", value: "grayscale" }),
              React.createElement(
                "label",
                { htmlFor: "monitor3", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  React.createElement(
                    "span",
                    { style: { color: "#666" } },
                    "Gre"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "#999" } },
                    "ysc"
                  ),
                  React.createElement(
                    "span",
                    { style: { color: "#333" } },
                    "ale"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "Monochrome Plus"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "option-heading" },
              "Audio mixer"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "radio", id: "audio1", name: "audio", value: "mono" }),
              React.createElement(
                "label",
                { htmlFor: "audio1", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Mono"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "CPC internal speaker"
                )
              ),
              React.createElement("input", { type: "radio", id: "audio2", name: "audio", value: "stereo" }),
              React.createElement(
                "label",
                { htmlFor: "audio2", className: "option-label" },
                React.createElement(
                  "div",
                  { className: "option-name" },
                  "Stereo"
                ),
                React.createElement(
                  "div",
                  { className: "option-comment" },
                  "CPC external & Plus speakers"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "option-heading" },
              "Peripherals"
            ),
            React.createElement(
              "div",
              { className: "option-list" },
              React.createElement("input", { type: "checkbox", id: "floppy-option" }),
              React.createElement(
                "label",
                { htmlFor: "floppy-option", className: "option-label option-name" },
                "Extra floppy drive"
              ),
              React.createElement("input", { type: "checkbox", id: "tape-option" }),
              React.createElement(
                "label",
                { htmlFor: "tape-option", className: "option-label option-name" },
                "Tape deck"
              ),
              React.createElement("input", { type: "checkbox", id: "ram-option" }),
              React.createElement(
                "label",
                { htmlFor: "ram-option", className: "option-label option-name" },
                "512KB RAM expansion"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "ui centered grid", id: "control-panel-container" },
        React.createElement(
          "div",
          { className: "ui center aligned column" },
          React.createElement(
            "div",
            { className: "control-panel nes-controls ui menu compact inverted" },
            React.createElement(
              "div",
              { className: "item hidden" },
              React.createElement(
                "select",
                { id: "snapshot", rows: "1", autoComplete: "off", defaultValue: this.props.innerPath },
                React.createElement(
                  "option",
                  { value: this.props.innerPath },
                  this.props.item.title
                )
              )
            ),
            React.createElement("a", { id: "button-run", className: "item button-size1 disabled-button" }),
            React.createElement(
              "a",
              { id: "button-reset", className: "item", title: "Reset CPC" },
              React.createElement("i", { className: "icon power" })
            ),
            React.createElement(
              "a",
              { id: "checkbox-settings", className: "item", title: "Settings" },
              React.createElement("i", { className: "icon settings" })
            ),
            React.createElement(
              "a",
              { id: "checkbox-fullscreen", className: "item", title: "Fullscreen" },
              React.createElement("i", { className: "icon maximize" })
            ),
            React.createElement("a", { id: "checkbox-joystick", className: "item hidden", title: "Disable CPC joystick" }),
            React.createElement(
              "a",
              { id: "checkbox-sound", className: "item", title: "Unmute" },
              React.createElement("i", { className: "icon volume up" })
            ),
            React.createElement(
              "a",
              { className: "item" },
              React.createElement("input", { type: "range", name: "sound-volume", min: "1", max: "100", value: "75", style: { display: "none" } })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { id: "amstrad-status-container", className: "ui centered grid" },
        React.createElement(
          "div",
          { className: "center aligned column" },
          React.createElement(
            "div",
            { id: "status", className: "ui segment menu inverted compact" },
            "Paused"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "ui centered grid" },
        React.createElement(
          "div",
          { className: "center aligned column" },
          React.createElement(
            "div",
            { className: "ui segment menu inverted compact" },
            "Joystick is mapped to Left-Ctrl, Right-Alt & Arrow keys"
          )
        )
      ),
      React.createElement(
        "fieldset",
        { id: "fieldset-tape" },
        React.createElement(
          "legend",
          null,
          "Tape deck"
        ),
        React.createElement(
          "div",
          { id: "tape-choose", className: "button-size2 button", onClick: this.handleTapeChangeClick },
          React.createElement("img", { src: this.state.lib_path + "img/Open_16x16.png" })
        ),
        React.createElement(
          "div",
          { id: "tape-filename" },
          React.createElement(
            "i",
            null,
            "Empty"
          )
        ),
        React.createElement("select", { id: "tape-zipselect", style: { display: "none" } }),
        React.createElement("input", { type: "file", id: "tape-input" }),
        React.createElement(
          "div",
          { id: "tape-counter" },
          "000"
        ),
        React.createElement(
          "div",
          { id: "tape-record", className: "button-size2 disabled-button guifx2" },
          "4"
        ),
        React.createElement(
          "div",
          { id: "tape-play", className: "button-size2 disabled-button guifx2" },
          "1"
        ),
        React.createElement(
          "div",
          { id: "tape-rewind", className: "button-size2 disabled-button guifx2" },
          "5"
        ),
        React.createElement(
          "div",
          { id: "tape-forward", className: "button-size2 disabled-button guifx2" },
          "6"
        ),
        React.createElement(
          "div",
          { id: "tape-stop", className: "button-size2 disabled-button guifx2" },
          "3"
        ),
        React.createElement("div", { id: "tape-eject", className: "button-size2 disabled-button guifx2" })
      ),
      React.createElement(
        "fieldset",
        { id: "fieldset-drivea", style: { display: "none" } },
        React.createElement(
          "legend",
          null,
          "Drive A:"
        ),
        React.createElement(
          "div",
          { id: "drivea-choose", className: "button-size2 button", onClick: this.handleDriveAChooseClick },
          React.createElement("img", { src: this.state.lib_path + "img/Open_16x16.png" })
        ),
        React.createElement(
          "div",
          { id: "drivea-filename" },
          React.createElement(
            "i",
            null,
            "Empty"
          )
        ),
        React.createElement("select", { id: "drivea-zipselect", style: { display: "none" } }),
        React.createElement("input", { type: "file", id: "drivea-input" }),
        React.createElement("div", { id: "drivea-led", className: "led" }),
        React.createElement("div", { id: "drivea-eject", className: "button-size2 disabled-button guifx2" })
      ),
      React.createElement(
        "fieldset",
        { id: "fieldset-driveb", style: { display: "none" } },
        React.createElement(
          "legend",
          null,
          "Drive B:"
        ),
        React.createElement(
          "div",
          { id: "driveb-choose", className: "button-size2 button", onClick: this.handleDriveBChooseClick },
          React.createElement("img", { src: this.state.lib_path + "img/Open_16x16.png" })
        ),
        React.createElement(
          "div",
          { id: "driveb-filename" },
          React.createElement(
            "i",
            null,
            "Empty"
          )
        ),
        React.createElement("select", { id: "driveb-zipselect", style: { display: "none" } }),
        React.createElement("input", { type: "file", id: "driveb-input" }),
        React.createElement("div", { id: "driveb-led", className: "led" }),
        React.createElement("div", { id: "driveb-eject", className: "button-size2 disabled-button guifx2" })
      )
    );
  }
}
window.fileHelpers = function () {

  function readFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      file.data = reader.result;
      return file;
    };
    reader.readAsDataURL(file);
  }

  function determineFileType(file) {
    const index = file.name.lastIndexOf('.');
    const fileType = file.name.slice(index + 1);
    return fileType;
  }

  function checkFilenameExistsInList(file, files) {
    let a = false;
    if (files) {
      files.forEach(function (f, index) {
        if (f.name === file.name) a = true;
      });
    }
    return a;
  }

  function checkFilenameExistsInChannel(file, channel, config, items) {
    let a = false;
    const fileName = file.name.replace(/[^\x20-\x7E]+/g, this.generateRandomChar()).replace(/ /g, this.generateRandomChar()).replace(/[&\/\\#,+()`$~%'":*?!<>|{}\[\]]/g, this.generateRandomChar());
    items.forEach(function (it, index) {
      if (it.file_name === fileName) {
        a = true;
      }
    });
    return a;
  }

  function generateItemFromFile(channel, file, config) {
    let item = {};

    item.file_name = file.name.replace(/[^\x20-\x7E]+/g, this.generateRandomChar()).replace(/ /g, '_').replace(/[&\/\\#,+()`$~%'":*?<>|{}\[\]]/g, this.generateRandomChar());
    item.o_file_name = file.name;
    item.file_type = this.determineFileType(file);
    item.title = this.splitByLastDot(file.name);
    item.file_size = file.size;
    item.content_type = this.getContentTypeByFileType(item.file_type, config);
    const category = this.getItemCategory(item.content_type, config);
    item.category = category.category_id;
    item.subcategory = this.getItemSubCategoryId(item.file_type, category);
    item.channel = channel.channel_address;
    return item;
  }

  function generateRandomChar() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  function splitByLastDot(text) {
    const index = text.lastIndexOf('.');
    const string = text.slice(0, index);
    return string;
  }

  function getItemCategory(content_type, config, catId) {
    let cat;
    if (content_type) {
      config.categories.forEach(function (category, index) {
        const ct = content_type === 'audio' || content_type === 'archive' ? content_type : content_type + 's';
        if (ct === category.category_name) {
          cat = category;
        }
      });
    }
    if (catId) {
      config.categories.forEach(function (category, index) {
        if (parseInt(catId) === category.category_id) {
          cat = category;
        }
      });
    }
    return cat;
  }

  function getItemSubCategoryId(file_type, category) {
    let subcatName,
        setDefaultSubcategory = true;
    if (category.category_name === 'games') {
      setDefaultSubcategory = false;
      if (file_type === 'zip') {
        subcatName = 'dos';
      } else if (file_type === 'nes') {
        subcatName = 'nes';
      } else if (file_type === 'sna') {
        subcatName = 'amstrad';
      } else if (file_type === 'bin') {
        subcatName = 'atari';
      }
    } else if (category.category_name === 'audio' && file_type === 'mp3') {
      setDefaultSubcategory = false;
      subcatName = 'music';
    }

    let subcatId;
    if (setDefaultSubcategory) {
      subcatId = category.subcategories[0].category_id;
    } else {
      category.subcategories.forEach(function (subcategory, index) {
        if (subcategory.category_name === subcatName) {
          subcatId = subcategory.category_id;
        }
      });
    }

    return subcatId;
  }

  function getDefaultSubCategoryId(catId, item, config) {
    const content_type = null;
    const cat = getItemCategory(content_type, config, catId);
    const subcatId = getItemSubCategoryId(item.file_type, cat);
    return subcatId;
  }

  function getContentTypeByFileType(type, config) {
    let ct;
    config.content_types.forEach(function (content_type, index) {
      content_type.file_types.forEach(function (file_type, fIndex) {
        if (type === file_type.type) {
          ct = content_type.type;
        }
      });
    });
    return ct;
  }

  function getChannelTotalFileSize(items) {
    let fileSize = 0;
    items.forEach(function (item, index) {
      fileSize += item.file_size;
    });
    return fileSize;
  }

  function generateContentJsonOptionalFilesList(file_types) {
    let fo = '.*(';
    file_types.forEach(function (ft, index) {
      fo += "." + ft;
      if (file_types.length - 1 > index) fo += "|";
    });
    fo += ")";
    return fo;
  }

  return {
    readFile,
    determineFileType,
    checkFilenameExistsInList,
    checkFilenameExistsInChannel,
    generateRandomChar,
    generateItemFromFile,
    splitByLastDot,
    getItemCategory,
    getItemSubCategoryId,
    getDefaultSubCategoryId,
    getContentTypeByFileType,
    getChannelTotalFileSize,
    generateContentJsonOptionalFilesList
  };
}();
class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      files: [],
      items: []
    };
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.onReadFiles = this.onReadFiles.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
    this.readFile = this.readFile.bind(this);
    this.generateItemFromFile = this.generateItemFromFile.bind(this);
    this.generateError = this.generateError.bind(this);
    this.finishReadingFile = this.finishReadingFile.bind(this);
    this.finishReadingFiles = this.finishReadingFiles.bind(this);
    this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
    this.removeItemFromList = this.removeItemFromList.bind(this);
    this.handleItemCategoryChange = this.handleItemCategoryChange.bind(this);
    this.handleItemSubCategoryChange = this.handleItemSubCategoryChange.bind(this);
    this.handleItemContentTypeChange = this.handleItemContentTypeChange.bind(this);
    this.handleItemInnerFileChange = this.handleItemInnerFileChange.bind(this);
    this.handleFileUploadClick = this.handleFileUploadClick.bind(this);
    this.onUploadFiles = this.onUploadFiles.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onFileUploadProgress = this.onFileUploadProgress.bind(this);
    this.createItem = this.createItem.bind(this);
    this.finishUploadingFile = this.finishUploadingFile.bind(this);
  }

  handleFileInputChange(e) {
    const filesObject = new Object(e.target.files);
    this.setState({ loading: true }, function () {
      this.onReadFiles(filesObject);
    }.bind(this));
  }

  onReadFiles(filesObject) {
    let total_files = 0;
    for (var i in filesObject) {
      if (typeof filesObject[i] === 'object') total_files += 1;
    }
    this.setState({
      loading: true,
      file_read_index: 0,
      total_files: total_files
    }, function () {
      this.onReadFile(filesObject);
    });
  }

  onReadFile(filesObject) {
    const index = this.state.file_read_index;
    if (typeof filesObject[index] === 'object') {
      let error, file;
      const fileType = fileHelpers.determineFileType(filesObject[index]);
      const fileTypeNotSupported = this.props.config.file_types.indexOf(fileType) === -1;
      if (fileTypeNotSupported) error = { msg: 'file type ' + filesObject[index].name + ' (' + filesObject[index].type + ') not supported!' };
      const filenameExistsInList = fileHelpers.checkFilenameExistsInList(filesObject[index], this.state.files);
      if (filenameExistsInList) error = { msg: 'file name "' + filesObject[index].name + '" already exists in list!' };
      if (!error) {
        this.readFile(filesObject, index);
      } else {
        this.generateError(error, filesObject);
      }
    } else {
      this.finishReadingFile(filesObject);
    }
  }

  readFile(filesObject, index) {
    const fileSliceSize = 244568064;
    const blob = filesObject[index].slice(index * fileSliceSize, (index + 1) * fileSliceSize);
    const reader = new FileReader();
    const th = this;
    reader.onload = function () {
      filesObject[index].data = reader.result;
      const files = th.state.files;
      files.push(filesObject[index]);
      th.setState({ files: files }, function () {
        console.log(th.state.files[0].size);
        th.generateItemFromFile(filesObject, index);
      }.bind(this));
    };
    reader.readAsBinaryString(blob);
  }

  generateItemFromFile(filesObject, index) {
    const item = fileHelpers.generateItemFromFile(this.props.channel, filesObject[index], this.props.config);
    const items = this.state.items;
    items.push(item);
    this.setState({ items: items }, function () {
      this.finishReadingFile(filesObject);
    });
  }

  generateError(error, filesObject) {
    const errors = this.state.errors;
    errors.push(error);
    this.setState({ errors: errors, loading: false }, function () {
      this.finishReadingFile(filesObject);
    });
  }

  finishReadingFile(filesObject) {
    let totalFileSize = this.state.total_file_size;
    if (!totalFileSize) totalFileSize = 0;
    totalFileSize = totalFileSize + filesObject[this.state.file_read_index].size;
    const file_read_index = this.state.file_read_index + 1;
    this.setState({
      file_read_index: file_read_index,
      total_file_size: totalFileSize
    }, function () {
      if (this.state.total_files === this.state.file_read_index) {
        this.finishReadingFiles(filesObject);
      } else {
        this.onReadFile(filesObject);
      }
    });
  }

  finishReadingFiles(filesObject) {
    this.setState({ loading: false, filesObject: filesObject }, function () {
      const filesInput = document.getElementById('files-input');
      if (filesInput) filesInput.value = '';
    });
  }

  onRemoveItemClick(item) {
    this.removeItemFromList(item);
  }

  removeItemFromList(item) {
    this.setState({
      items: this.state.items.filter(i => i.file_name !== item.file_name),
      files: this.state.files.filter(f => f.name !== item.o_file_name)
    });
  }

  handleItemCategoryChange(category, item) {
    this.setState({
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            category: parseInt(category)
          });
        } else {
          return it;
        }
      })
    });
  }

  handleItemSubCategoryChange(subcategory, item) {
    this.setState({
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            subcategory: subcategory
          });
        } else {
          return it;
        }
      })
    });
  }

  handleItemContentTypeChange(contentType, item) {
    this.setState({
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            content_type: contentType
          });
        } else {
          return it;
        }
      })
    });
  }

  handleItemInnerFileChange(innerFile, item) {
    this.setState({
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            inner_file: innerFile
          });
        } else {
          return it;
        }
      })
    });
  }

  handleFileUploadClick() {
    this.onUploadFiles();
  }

  onUploadFiles() {
    console.log('on upload files');
    this.setState({
      uploading: true,
      file_upload_index: 0,
      total_upload_percent: 0
    }, function () {
      console.log('validate file');
      this.validateFile();
    });
  }

  validateFile() {
    console.log('wtf');
    const file = this.state.files[this.state.file_upload_index];
    const item = this.state.items[this.state.file_upload_index];
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.user.user_auth_address + "/" + item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function (res) {
      if (res) {
        this.generateUploadError(item);
      } else {
        if (this.state.items[this.state.file_upload_index].file_type === 'zip' && this.state.items[this.state.file_upload_index].content_type === 'game' && typeof this.state.items[this.state.file_upload_index].inner_file === 'undefined') {
          const error = { msg: 'a zip file of a game must have an inner file spicified!' };
          const errors = this.state.errors;
          errors.push(error);
          this.setState({ errors: errors, uploading: false });
        } else {
          this.setState({ errors: [] }, function () {
            this.uploadFile(file, item, inner_path);
          });
        }
      }
    }.bind(this));
  }

  generateUploadError(item) {
    let errors = [];
    if (this.state.errors) errors = this.state.errors;
    const error = { msg: 'file "' + item.file_name + '" already exists in user folder in this cluster!' };
    errors.push(error);
    this.setState({
      errors: errors,
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            file_progress: 0,
            uploading_error: true
          });
        } else {
          return it;
        }
      })
    }, function () {
      this.finishUploadingFile();
    });
  }

  uploadFile(file, item, inner_path) {
    console.log(item);
    Page.cmd("bigfileUploadInit", [inner_path, item.file_size], function (init_res) {
      var formdata = new FormData();
      var req = new XMLHttpRequest();
      formdata.append(item.file_name, file);
      // upload event listener
      req.upload.addEventListener("progress", function (res) {
        // update item progress
        this.onFileUploadProgress(res, item);
      }.bind(this));
      // loaded event listener
      req.upload.addEventListener("loadend", function () {
        this.createItem(item);
      }.bind(this));
      req.withCredentials = true;
      req.open("POST", init_res.url);
      req.send(formdata);
    }.bind(this));
  }

  onFileUploadProgress(res, item) {
    const fileProgress = parseInt(res.loaded / res.total * 100);
    let fileIndex;
    if (this.state.file_upload_index === 0) fileIndex = 1;
    let totalUploadPercent = parseInt(this.state.file_upload_index / this.state.files.length * 100) + parseInt(fileProgress / this.state.files.length);
    if (totalUploadPercent === 99) totalUploadPercent = 100;
    this.updateFileUploadProgress(item, fileProgress, totalUploadPercent);
  }

  updateFileUploadProgress(item, fileProgress, totalUploadPercent) {
    this.setState({
      total_upload_percent: totalUploadPercent,
      items: this.state.items.map(it => {
        if (it.file_name === item.file_name) {
          return Object.assign({}, it, {
            file_progress: fileProgress,
            uploading: true
          });
        } else {
          return it;
        }
      })
    });
  }

  createItem(item) {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.user.user_auth_address;
    Page.cmd("fileGet", { inner_path: inner_path + "/data.json", required: false }, function (data) {
      // Page.cmd("fileGet",{inner_path:inner_path + "/content.json",required:false},function(contentJson){
      data = JSON.parse(data);
      if (!data.item) {
        data.next_item_id = 1;
        data.item = [];
      }
      item.item_id = this.props.channel.channel_address + '_item_' + data.next_item_id;
      item.date_added = +new Date();
      data.item.push(item);
      data.next_item_id += 1;
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path + "/data.json", btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path + "/data.json" }, function (res) {
          /*contentJson = JSON.parse(contentJson);
          contentJson.optional = fileHelpers.generateContentJsonOptionalFilesList(store.getState().config.file_types);
          var json_raw = unescape(encodeURIComponent(JSON.stringify(contentJson, void 0, '\t')));
          Page.cmd("fileWrite", [inner_path + "/content.json", btoa(json_raw)], function(res) {
            Page.cmd("sitePublish",{"inner_path":inner_path + "/content.json"}, function(res) {*/
          this.finishUploadingFile();
          /*}.bind(this));
          }.bind(this));*/
        }.bind(this));
      }.bind(this));
      // }.bind(this));
    }.bind(this));
  }

  finishUploadingFile() {
    const file_upload_index = this.state.file_upload_index + 1;
    this.setState({ file_upload_index: file_upload_index }, function () {
      if (this.state.files.length === this.state.file_upload_index) {
        this.finishUploadingFiles();
      } else {
        this.validateFile();
      }
    });
  }

  finishUploadingFiles() {
    this.props.onFinishUploading(this.state.items);
  }

  render() {
    if (this.state.loading) {
      return React.createElement(LoadingContainer, { msg: 'Reading Files' });
    } else {

      let fileUploadItemList;
      if (this.state.items) {
        fileUploadItemList = React.createElement(FileUploaderFileList, {
          channel: this.props.channel,
          files: this.state.files,
          items: this.state.items,
          filesObject: this.state.filesObject,
          loading: this.state.loading,
          config: this.props.config,
          uploading: this.state.uploading,
          totalUploadPercent: this.state.total_upload_percent,
          onFileInputChange: this.handleFileInputChange,
          onRemoveItemClick: this.onRemoveItemClick,
          onItemCategoryChange: this.handleItemCategoryChange,
          onItemSubCategoryChange: this.handleItemSubCategoryChange,
          onItemContentTypeSelect: this.handleItemContentTypeChange,
          onItemSelectInnerFile: this.handleItemInnerFileChange,
          onUploadClick: this.handleFileUploadClick
        });
      }

      let errorList;
      if (this.state.errors) {
        errorList = this.state.errors.map((error, i) => React.createElement(
          'li',
          { key: i },
          error.msg
        ));
      }

      let errorContainer;
      if (errorList.length > 0) {
        errorContainer = React.createElement(
          'div',
          { id: 'file-upload-error-container', className: 'ui message error' },
          React.createElement(
            'h3',
            null,
            'Errors'
          ),
          React.createElement(
            'ul',
            null,
            errorList
          )
        );
      }

      let filesInput;
      if (this.state.items.length < 1) {
        filesInput = React.createElement(
          'div',
          { id: 'dropzone', className: 'ui message dropzone' },
          React.createElement('input', { type: 'file', id: 'files-input', multiple: 'true', onChange: this.handleFileInputChange }),
          React.createElement(
            'h2',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'icon upload cloud' }),
            React.createElement(
              'div',
              { className: 'content' },
              'Drag & Drop',
              React.createElement('br', null),
              'OR',
              React.createElement('br', null),
              'Click here to upload files'
            )
          )
        );
      }

      return React.createElement(
        'div',
        { id: 'item-list-container' },
        errorContainer,
        filesInput,
        fileUploadItemList
      );
    }
  }
}

class FileUploaderFileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_index: 0,
      files: [],
      items: []
    };
    this.handleFileUploadClick = this.handleFileUploadClick.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  handleFileUploadClick() {
    this.props.onUploadClick();
  }

  handleFileInputChange(e) {
    this.props.onFileInputChange(e);
  }

  render() {
    if (this.props.loading) {
      return React.createElement(LoadingContainer, { msg: 'Reading Files' });
    } else {

      const items = this.props.items.map((item, i) => React.createElement(FileUploaderFileListItem, {
        key: i,
        index: i,
        item: item,
        config: this.props.config,
        filesObject: this.props.filesObject,
        uploading: this.props.uploading,
        onRemoveItemClick: this.props.onRemoveItemClick,
        onItemCategoryChange: this.props.onItemCategoryChange,
        onItemSubCategoryChange: this.props.onItemSubCategoryChange,
        onItemContentTypeSelect: this.props.onItemContentTypeSelect,
        onItemSelectInnerFile: this.props.onItemSelectInnerFile
      }));
      let tableContainer;
      if (items.length > 0) {
        tableContainer = React.createElement(
          'table',
          { className: 'ui celled striped table', id: 'upload-files-table' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                'Title / File name'
              ),
              React.createElement(
                'th',
                { className: 'center aligned' },
                'Content'
              ),
              React.createElement(
                'th',
                { className: 'center aligned' },
                'Type'
              ),
              React.createElement(
                'th',
                { className: 'center aligned' },
                'Size'
              ),
              React.createElement(
                'th',
                { className: 'center aligned' },
                'Categories'
              ),
              React.createElement(
                'th',
                { className: 'center aligned' },
                'Actions'
              ),
              React.createElement(
                'th',
                { className: 'right aligned' },
                'Status'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            items
          )
        );
      }

      let filesInput;
      if (this.props.items.length > 0 && !this.props.uploading) {
        filesInput = React.createElement(
          'div',
          { id: 'dropzone-second', className: 'ui message dropzone' },
          React.createElement('input', { type: 'file', id: 'files-input', multiple: 'true', onChange: this.handleFileInputChange }),
          React.createElement(
            'h4',
            { className: 'ui header' },
            React.createElement('i', { className: 'icon add square' }),
            React.createElement(
              'div',
              { className: 'content' },
              'Add Files'
            )
          )
        );
      }

      let uploadButton;
      if (this.props.items.length > 0) {
        uploadButton = React.createElement(
          'a',
          { className: this.props.uploading ? "ui button primary loading centered" : "ui button primary centered",
            onClick: this.handleFileUploadClick },
          'Upload'
        );
      }

      let totalProgressContainer;
      if (this.props.totalUploadPercent) {
        totalProgressContainer = React.createElement(
          'div',
          { className: 'ui segment inverted center aligned' },
          React.createElement(
            'h3',
            null,
            'Total Upload Progress'
          ),
          React.createElement(
            'div',
            { className: this.props.totalUploadPercent < 100 ? "ui progress inverted active indicating yellow" : "inverted ui progress green" },
            React.createElement(
              'div',
              { className: 'bar', style: { width: this.props.totalUploadPercent + "%" } },
              React.createElement('div', { className: 'progress' })
            ),
            React.createElement(
              'div',
              { className: 'label' },
              this.props.totalUploadPercent,
              '%'
            )
          )
        );
      }
      return React.createElement(
        'div',
        { id: 'upload-file-list-container' },
        tableContainer,
        totalProgressContainer,
        filesInput,
        uploadButton
      );
    }
  }
}

class FileUploaderFileListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show_form: false };
    this.handleEditItemClick = this.handleEditItemClick.bind(this);
    this.handleRemoveItemClick = this.handleRemoveItemClick.bind(this);
    this.onItemContentTypeSelect = this.onItemContentTypeSelect.bind(this);
    this.openInnerFileSelectModal = this.openInnerFileSelectModal.bind(this);
  }

  handleEditItemClick() {
    const show_form = this.state.show_form ? false : true;
    this.setState({ show_form: show_form });
  }

  handleRemoveItemClick() {
    this.props.onRemoveItemClick(this.props.item);
  }

  onItemContentTypeSelect(e) {
    this.props.onItemContentTypeSelect(e.target.value, this.props.item);
  }

  openInnerFileSelectModal() {
    jQuery('#inner-file-select-modal').modal('show');
  }

  render() {
    let itemForm;
    if (this.state.show_form) {
      itemForm = React.createElement(
        'div',
        { className: 'file-list-item-form-container' },
        React.createElement(ItemForm, {
          config: this.props.config,
          item: this.props.item,
          onItemCategorySelect: this.props.onItemCategorySelect
        })
      );
    }
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    let fileProgressContainer;
    if (this.props.uploading) {
      if (this.props.item.file_progress) {
        fileProgressContainer = React.createElement(
          'div',
          { className: this.props.item.file_progress < 100 ? "ui progress active indicating inverted yellow file-progress-container" : "ui progress inverted green file-progress-container" },
          React.createElement(
            'div',
            { className: 'bar', style: { width: this.props.item.file_progress + "%" } },
            React.createElement(
              'div',
              { className: 'progress' },
              this.props.item.file_progress,
              '%'
            )
          )
        );
      } else if (this.props.item.uploading_error) {
        fileProgressContainer = React.createElement(
          'div',
          { className: 'ui progress red file-progress-container' },
          React.createElement(
            'div',
            { className: 'bar', style: { width: "100%" } },
            React.createElement(
              'div',
              { className: 'progress' },
              'error!'
            )
          ),
          React.createElement(
            'div',
            { className: 'label' },
            this.props.item.error_msg
          )
        );
      } else {
        fileProgressContainer = React.createElement(
          'div',
          { className: 'ui progress indicating file-progress-container' },
          React.createElement(
            'div',
            { className: 'bar', style: { width: "100%" } },
            React.createElement(
              'div',
              { className: 'progress' },
              'pending'
            )
          )
        );
      }
    }

    let contentTypeElementContainer;
    if (this.props.item.file_type === 'zip') {
      contentTypeElementContainer = React.createElement(
        'select',
        { selected: this.props.item.content_type, onChange: this.onItemContentTypeSelect, className: 'ui fluid dropdown' },
        React.createElement(
          'option',
          { value: 'game' },
          'game'
        ),
        React.createElement(
          'option',
          { selected: 'selected', value: 'archive' },
          'archive'
        )
      );
    } else {
      contentTypeElementContainer = this.props.item.content_type;
    }

    let innerFileAnchorLink;
    if (this.props.item.content_type === 'game' && this.props.item.file_type === 'zip') {
      let innerFile;
      if (typeof this.props.item.inner_file === 'undefined') {
        innerFile = "select inner file";
      } else {
        innerFile = this.props.item.inner_file;
      }
      innerFileAnchorLink = React.createElement(
        'a',
        { className: 'inner-file-anchor-link', onClick: this.openInnerFileSelectModal },
        React.createElement(
          'small',
          null,
          innerFile
        )
      );
    }

    let innerFileSelectModalDisplay;
    if (this.props.item.content_type === 'game' && this.props.item.file_type === 'zip') {
      innerFileSelectModalDisplay = React.createElement(
        'div',
        { className: 'ui basic modal', id: 'inner-file-select-modal' },
        React.createElement(
          'div',
          { className: 'content segment white' },
          React.createElement(InnerFileSelectModal, {
            item: this.props.item,
            itemIndex: this.props.index,
            filesObject: this.props.filesObject,
            onItemSelectInnerFile: this.props.onItemSelectInnerFile
          })
        )
      );
    }

    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'left aligned' },
        React.createElement(
          'a',
          null,
          this.props.item.title
        ),
        React.createElement('br', null),
        this.props.item.file_name,
        React.createElement('br', null),
        innerFileAnchorLink,
        innerFileSelectModalDisplay
      ),
      React.createElement(
        'td',
        { className: 'center aligned' },
        contentTypeElementContainer
      ),
      React.createElement(
        'td',
        { className: 'center aligned' },
        this.props.item.file_type
      ),
      React.createElement(
        'td',
        { className: 'center aligned' },
        fileSize
      ),
      React.createElement(
        'td',
        { className: 'file-list-item-category-select' },
        React.createElement(CategorySelectContainer, {
          category: this.props.item.category,
          subcategory: this.props.item.subcategory,
          config: this.props.config,
          item: this.props.item,
          onItemCategoryChange: this.props.onItemCategoryChange,
          onItemSubCategoryChange: this.props.onItemSubCategoryChange
        })
      ),
      React.createElement(
        'td',
        { className: 'center aligned' },
        React.createElement(
          'div',
          { className: 'list-item-actions' },
          React.createElement(
            'div',
            { className: 'ui menu' },
            React.createElement(
              'div',
              { className: 'right ui menu' },
              React.createElement(
                'a',
                { className: 'item', onClick: this.handleEditItemClick },
                React.createElement('i', { className: 'icon edit' })
              ),
              React.createElement(
                'a',
                { className: 'item', onClick: this.handleRemoveItemClick },
                React.createElement('i', { className: 'icon trash' })
              )
            )
          )
        )
      ),
      React.createElement(
        'td',
        { className: 'right aligned' },
        fileProgressContainer
      )
    );
  }
}

class InnerFileSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onItemSelectInnerFile = this.onItemSelectInnerFile.bind(this);
    this.getFileListFromFilesObject = this.getFileListFromFilesObject.bind(this);
    this.getFileListFromFile = this.getFileListFromFile.bind(this);
  }

  componentDidMount() {
    if (this.props.filesObject) {
      this.getFileListFromFilesObject();
    } else {
      this.getFileListFromFile();
    }
  }

  getFileListFromFilesObject() {
    const self = this;
    zip.loadAsync(this.props.filesObject[this.props.itemIndex] /* = file blob */).then(function (zip) {
      self.setState({ files: zip.files, loading: false });
    }, function () {
      alert("Not a valid zip file");
    });
  }

  getFileListFromFile() {
    const self = this;
    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      const inner_path = "merged-" + store.getState().config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.item.file_name + "?ajax_key=" + res;

      JSZipUtils.getBinaryContent(inner_path, function (err, data) {
        if (err) {
          throw err;
        }
        zip.loadAsync(data).then(function (res) {
          self.setState({ files: res.files, loading: false });
        });
      });
    }.bind(this));
  }

  onItemSelectInnerFile(fileName, item) {
    this.props.onItemSelectInnerFile(fileName, item);
    jQuery('#inner-file-select-modal').modal('hide');
  }

  render() {
    const filesArray = appHelpers.convertObjectToArray(this.state.files);
    const fileList = filesArray.map((f, index) => React.createElement(
      'li',
      { key: index },
      React.createElement(
        'a',
        { onClick: () => this.onItemSelectInnerFile(f.name, this.props.item) },
        f.name
      )
    ));
    return React.createElement(
      'div',
      { id: 'inner-file-select-form-container', className: 'ui grid' },
      React.createElement(
        'div',
        { className: 'ui segment container header blue' },
        React.createElement(
          'h2',
          null,
          'Select Inner File'
        )
      ),
      React.createElement(
        'div',
        { className: 'ui segment container form-view' },
        React.createElement(
          'ul',
          null,
          fileList
        )
      )
    );
  }
}
window.formHelpers = function () {

  function validateChannelForm(fields) {
    let errors = [];
    if (fields.channel_name && !fields.channel_name.length > 0) {
      const error = "channel name required";
      errors.push(error);
    }
    if (fields.cluster_id && !fields.cluster_id.length > 0) {
      const error = "please choose cluster";
      errors.push(error);
    }
    return errors;
  }

  function validateItemForm(fields) {
    let errors = [];
    if (!fields.title.length > 0) {
      const error = "item name required";
      errors.push(error);
    }
    return errors;
  }

  return {
    validateChannelForm,
    validateItemForm
  };
}();
class ItemDashboard extends React.Component {
  constructor(props) {
    super(props);

    const route = store.getState().route;

    let currentPage;
    if (route.page) {
      currentPage = route.page;
    } else {
      currentPage = 1;
    }

    let contentType;
    if (route.type) {
      contentType = route.type;
    } else {
      contentType = 'all';
    }

    let searchPhrase;
    if (route.view === 'search') searchPhrase = route.id;

    this.state = {
      search_phrase: searchPhrase,
      content_type: contentType,
      file_type: route.f_type || '',
      sort_by: {
        label: 'newest',
        val: 'i.date_added DESC'
      },
      items: [],
      pagination: {},
      current_page: currentPage,
      loading: false
    };
    this.onGetItems = this.onGetItems.bind(this);
    this.countTotalItems = this.countTotalItems.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleContentTypeClick = this.handleContentTypeClick.bind(this);
    this.setContentType = this.setContentType.bind(this);
    this.handleFileTypeClick = this.handleFileTypeClick.bind(this);
    this.setFileType = this.setFileType.bind(this);
    this.handlePaginationButtonClick = this.handlePaginationButtonClick.bind(this);
    this.setPage = this.setPage.bind(this);
    this.handleSortOptionClick = this.handleSortOptionClick.bind(this);
    this.handleSearchFormChange = this.handleSearchFormChange.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
  }

  componentDidMount() {
    this.onGetItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search_phrase !== this.state.searchPhrase) {
      this.handleSearchFormChange(nextProps.search_phrase);
    }
    if (nextProps.moderations.show_moderations !== this.props.moderations.show_moderations) {
      this.onGetItems();
    }
  }

  onGetItems() {
    this.setState({
      items: [],
      pagination: [],
      loading: true
    }, function () {
      this.countTotalItems();
    });
  }

  countTotalItems() {
    // const query = itemHelpers.countTotalItems(this.state,this.props.moderations,this.props.showModerations,this.props.channel,this.state.search_phrase);
    const query = itemHelpers.countContentTypeTotalItemsQuery('all', this.props.channel, this.props.moderations, this.state.search_phrase);
    Page.cmd("dbQuery", [query], function (item_count) {
      this.renderPagination(item_count[0]['count(*)']);
    }.bind(this));
  }

  renderPagination(item_count) {
    const pagination = itemHelpers.renderPagination(this.props.config, this.state, item_count);
    this.setState({
      pagination: pagination
    }, function () {
      this.getItems();
    });
  }

  getItems() {
    const query = itemHelpers.getItemsQuery(this.props.config, this.props.moderations, this.props.showModerations, this.state, this.props.channel, this.state.search_phrase);
    Page.cmd("dbQuery", [query], function (items) {
      const itemGroups = appHelpers.createGroupedArray(items, 4);
      this.setState({
        items: items,
        itemGroups: itemGroups,
        loading: false
      });
    }.bind(this));
  }

  handleContentTypeClick(content_type) {
    this.setContentType(content_type);
  }

  setContentType(content_type) {
    this.setState({
      content_type: content_type,
      current_page: 1
    }, function () {
      this.onGetItems();
    });
  }

  handleFileTypeClick(file_type) {
    this.setFileType(file_type);
  }

  setFileType(file_type) {
    this.setState({
      file_type: file_type,
      current_page: 1
    });
    this.onGetItems();
  }

  handlePaginationButtonClick(next_page_number) {
    this.setPage(next_page_number);
  }

  setPage(next_page_number) {
    this.setState({
      current_page: next_page_number
    }, function () {
      this.onGetItems();
    });
  }

  handleSortOptionClick(attrs) {
    this.sortItems(attrs);
  }

  handleSearchFormChange(searchPhrase) {
    this.setState({ search_phrase: searchPhrase, update_search_phrase: true, current_page: 1 }, function () {
      this.setState({ update_search_phrase: false }, function () {
        this.onGetItems();
      });
    });
  }

  sortItems(attrs) {
    this.setState({
      sort_by: attrs
    }, function () {
      this.onGetItems();
    });
  }

  handleDeleteItemClick(item, fileInfo) {
    const user_settings = store.getState().user_settings;
    if (!user_settings.deleted_items) {
      user_settings.deleted_items = [];
    }

    const fileAddress = "merged-" + this.props.config.merger_name + "/" + item.cluster_id + "/" + fileInfo.inner_path;

    const deleted_item = {
      item_id: item.item_id,
      fileAddress: fileAddress
    };

    user_settings.deleted_items.push(deleted_item);
    // set local storage
    Page.cmd("userSetSettings", { settings: user_settings }, function (res) {
      // delete optional file
      Page.cmd("optionalFileDelete", fileAddress, function (res) {
        Page.cmd("optionalFileDelete", fileAddress + ".piecemap.msgpack", function (res) {
          window.top.location.href = "index.html";
        });
      });
    });
  }

  render() {

    let contentTypeMenuContainer;
    if (!this.state.update_search_phrase) {
      contentTypeMenuContainer = React.createElement(ContentTypeMenu, {
        config: this.props.config,
        showModerations: this.props.moderations.show_moderations,
        moderations: this.props.moderations,
        channel: this.props.channel,
        contentType: this.state.content_type,
        searchPhrase: this.state.search_phrase,
        onContentTypeClick: this.handleContentTypeClick
      });
    }

    if (this.state.loading) {
      return React.createElement(
        'section',
        { id: 'item-dashboard', className: 'ui' },
        contentTypeMenuContainer,
        React.createElement(LoadingContainer, { msg: 'Loading Items' })
      );
    } else {
      return React.createElement(
        'section',
        { id: 'item-dashboard', className: 'ui' },
        contentTypeMenuContainer,
        React.createElement(ItemListContainer, {
          channel: this.props.channel,
          loading: this.props.loading,
          page: this.props.page,
          config: this.props.config,
          showModerations: this.props.showModerations,
          moderations: this.props.moderations,
          contentType: this.state.content_type,
          searchPhrase: this.state.search_phrase,
          fileType: this.state.file_type,
          sortBy: this.state.sort_by,
          items: this.state.items,
          itemGroups: this.state.itemGroups,
          pagination: this.state.pagination,
          onFileTypeClick: this.handleFileTypeClick,
          onSortOptionClick: this.handleSortOptionClick,
          onPaginationButtonClick: this.handlePaginationButtonClick,
          onDeleteItem: this.handleDeleteItemClick
        })
      );
    }
  }
}

const mapStateToItemDashboardProps = state => {
  const search_phrase = state.search_phrase;
  const moderations = state.moderations;
  return {
    search_phrase,
    moderations
  };
};

const mapDispatchToItemDashboardProps = dispatch => {
  return {
    dispatch
  };
};

const ItemDashboardWrapper = ReactRedux.connect(mapStateToItemDashboardProps, mapDispatchToItemDashboardProps)(ItemDashboard);

class ContentTypeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content_type: this.props.contentType
    };
    this.handleContentTypeClick = this.handleContentTypeClick.bind(this);
  }

  handleContentTypeClick(contentType) {
    this.setState({ content_type: contentType }, function () {
      this.props.onContentTypeClick(contentType);
    });
  }

  render() {
    const config = store.getState().config;
    const content_types = config.content_types.map((content_type, i) => React.createElement(ContentTypeMenuItem, {
      key: i,
      channel: this.props.channel,
      type: content_type.type,
      contentType: this.state.content_type,
      searchPhrase: this.props.searchPhrase,
      showModerations: this.props.showModerations,
      moderations: this.props.moderations,
      onContentTypeClick: this.handleContentTypeClick
    }));
    return React.createElement(
      'div',
      { id: 'content-type-menu-container', className: 'ui centered grid' },
      React.createElement(
        'div',
        { id: 'content-type-menu-wrapper', className: 'center aligned column ' },
        React.createElement(
          'div',
          { className: 'ui secondary pointing compact menu blue' },
          React.createElement(ContentTypeMenuItem, {
            type: 'all',
            contentType: this.state.content_type,
            channel: this.props.channel,
            searchPhrase: this.props.searchPhrase,
            showModerations: this.props.showModerations,
            moderations: this.props.moderations,
            onContentTypeClick: this.handleContentTypeClick
          }),
          content_types
        )
      )
    );
  }
}

class ContentTypeMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_count: ''
    };
    this.getContentTypeItemCount = this.getContentTypeItemCount.bind(this);
    this.ContentTypeClick = this.ContentTypeClick.bind(this);
  }

  componentDidMount() {
    this.getContentTypeItemCount();
  }

  getContentTypeItemCount() {
    const query = itemHelpers.countContentTypeTotalItemsQuery(this.props.type, this.props.channel, this.props.moderations, this.props.searchPhrase);
    Page.cmd("dbQuery", [query], function (item_count) {
      this.setState({ item_count: item_count[0]["count(*)"] });
    }.bind(this));
  }

  ContentTypeClick() {
    this.props.onContentTypeClick(this.props.type);
  }

  render() {
    const contentTypeIconClass = itemHelpers.getContentTypeIconClass(this.props.type);
    let view = store.getState().route.view;
    if (view !== 'main') view = view + "+id:" + store.getState().route.id;
    return React.createElement(
      'a',
      { href: "index.html?view:" + view + "+type:" + this.props.type, className: this.props.type === this.props.contentType ? 'item active' : 'item' },
      React.createElement(
        'h4',
        { className: 'ui icon header' },
        React.createElement('i', { className: contentTypeIconClass + ' icon' }),
        React.createElement(
          'div',
          { className: 'content' },
          React.createElement(
            'span',
            { className: 'content-type-name' },
            this.props.type
          ),
          React.createElement(
            'div',
            { className: 'ui label' },
            this.state.item_count
          )
        )
      )
    );
  }
}

class ItemListContainer extends React.Component {

  render() {
    let paginationContainer;
    if (this.props.pagination.numPages > 1) {
      paginationContainer = React.createElement(Pagination, {
        pagination: this.props.pagination,
        onPaginationButtonClick: this.props.onPaginationButtonClick
      });
    }
    return React.createElement(
      'div',
      { id: 'item-list-container' },
      React.createElement(
        'div',
        { className: 'ui container' },
        React.createElement(FileTypeMenu, {
          loading: this.props.loading,
          fileType: this.props.fileType,
          channel: this.props.channel,
          contentType: this.props.contentType,
          showModerations: this.props.showModerations,
          moderations: this.props.moderations,
          onFileTypeClick: this.props.onFileTypeClick,
          config: this.props.config,
          searchPhrase: this.props.searchPhrase
        }),
        React.createElement(SortOptionMenu, {
          config: this.props.config,
          sortBy: this.props.sortBy,
          onSortOptionClick: this.props.onSortOptionClick
        })
      ),
      React.createElement(ItemList, {
        items: this.props.items,
        itemGroups: this.props.itemGroups,
        config: this.props.config,
        page: this.props.page,
        onDeleteItem: this.props.onDeleteItem
      }),
      paginationContainer
    );
  }
}

class FileTypeMenu extends React.Component {
  render() {
    let fileTypes, allMenuItem, fileTypesMenu;
    const file_types = itemHelpers.getContentTypeFileTypes(this.props.contentType, this.props.config.content_types);
    if (file_types) {
      fileTypes = file_types.map((file_type, i) => React.createElement(FileTypeMenuItem, {
        key: i,
        cssClass: file_type.type === this.props.fileType ? "item active" : "item",
        channel: this.props.channel,
        type: file_type.type,
        contentType: this.props.contentType,
        fileType: this.props.fileType,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations,
        onFileTypeClick: this.props.onFileTypeClick,
        searchPhrase: this.props.searchPhrase
      }));
      allMenuItem = React.createElement(FileTypeMenuItem, {
        cssClass: !this.props.fileType || this.props.fileType === 'all' ? "item active" : "item",
        channel: this.props.channel,
        type: 'all',
        contentType: this.props.contentType,
        fileType: this.props.fileType,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations,
        onFileTypeClick: this.props.onFileTypeClick,
        searchPhrase: this.props.searchPhrase
      });

      fileTypesMenu = React.createElement(
        'div',
        { id: 'file-types-menu', className: 'ui menu secondary pointing blue' },
        allMenuItem,
        fileTypes
      );
    }

    return React.createElement(
      'div',
      { id: 'file-types-menu-container' },
      fileTypesMenu
    );
  }
}

class FileTypeMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getFileTypeItemCount = this.getFileTypeItemCount.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getFileTypeItemCount();
  }

  getFileTypeItemCount() {

    const query = itemHelpers.countFileTypeTotalItemsQuery(this.props.contentType, this.props.type, this.props.channel, this.props.moderations, this.props.showModerations, this.props.searchPhrase);
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ item_count: res[0]["count(*)"] });
    }.bind(this));
  }

  handleClick() {
    this.props.onFileTypeClick(this.props.type);
  }

  render() {
    let itemCountLabel;
    if (this.state.item_count !== undefined) {
      itemCountLabel = React.createElement(
        'div',
        { className: 'ui label' },
        this.state.item_count
      );
    }

    const route = store.getState().route;
    let linkHref = "index.html?";
    if (route.view) {
      linkHref += "view:" + route.view;
    } else {
      linkHref += "view:main";
    }

    if (route.type) {
      linkHref += "+type:" + route.type;
    }

    linkHref += "+f_type:" + this.props.type;

    return React.createElement(
      'a',
      { className: this.props.cssClass, href: linkHref },
      React.createElement(
        'span',
        { className: 'file-type-name' },
        this.props.type
      ),
      itemCountLabel
    );
  }
}

class SortOptionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_options: []
    };
    this.getSortOptions = this.getSortOptions.bind(this);
  }

  componentDidMount() {
    this.getSortOptions();
  }

  getSortOptions() {
    const sort_options = itemHelpers.genereateSortOptions();
    this.setState({ sort_options: sort_options });
  }

  render() {
    const sort_options = this.state.sort_options.map((sort_option, i) => React.createElement(SortOptionMenuItem, {
      key: i,
      sortBy: this.props.sortBy,
      sortVal: sort_option.val,
      sortLabel: sort_option.label,
      onSortOptionClick: this.props.onSortOptionClick
    }));
    return React.createElement(
      'div',
      { id: 'sort-options-menu-container' },
      React.createElement(
        'div',
        { id: 'sort-options-menu', className: 'ui pagination menu' },
        React.createElement(
          'a',
          { className: 'item disabled' },
          'Sort By'
        ),
        sort_options
      )
    );
  }
}

class SortOptionMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const attrs = {
      label: this.props.sortLabel,
      val: this.props.sortVal
    };
    this.props.onSortOptionClick(attrs);
  }

  render() {
    return React.createElement(
      'a',
      {
        className: this.props.sortVal === this.props.sortBy.val ? 'item active' : 'item',
        onClick: this.handleClick
      },
      this.props.sortLabel
    );
  }
}

class ItemList extends React.Component {
  render() {
    let itemGroups;
    if (this.props.itemGroups) {
      itemGroups = this.props.itemGroups.map((iGroup, i) => React.createElement(ItemListGroupWrapper, {
        key: i,
        index: i,
        items: iGroup,
        config: this.props.config,
        page: this.props.page,
        onDeleteItem: this.props.onDeleteItem
      }));
    }
    if (itemGroups) {
      return React.createElement(
        'div',
        { id: 'items-container' },
        itemGroups
      );
    }
    return React.createElement(
      'p',
      null,
      'loading items...'
    );
  }
}

class ItemListGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_preview: false
    };
    this.hideItem = this.hideItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_preview: false }, function () {
      if (nextProps.currentItem.index === this.props.index) {
        this.setState({ show_preview: true });
      }
    });
  }

  hideItem() {
    this.setState({ show_preview: false });
  }

  render() {

    const items = this.props.items.map((item, i) => React.createElement(ItemListItem, {
      key: item.item_id,
      item: item,
      groupIndex: this.props.index,
      config: this.props.config,
      page: this.props.page,
      onDeleteItem: this.props.onDeleteItem
    }));

    let previewDisplay;
    if (this.state.show_preview) {
      previewDisplay = React.createElement(
        'div',
        { className: 'item-preview-display', id: "preview-display" + this.props.index },
        React.createElement(
          'a',
          { className: 'hide-item-button', onClick: this.hideItem },
          React.createElement('i', { className: 'icon remove' })
        ),
        React.createElement(ItemView, {
          page: this.props.page,
          item: this.props.currentItem.item,
          config: this.props.config,
          showModerations: this.props.showModerations,
          moderations: this.props.moderations,
          route: this.props.route,
          user: this.props.user
        })
      );
    }

    return React.createElement(
      'div',
      { className: 'item-container-row' },
      React.createElement(
        'div',
        { className: 'ui container grid' },
        items
      ),
      previewDisplay
    );
  }
}

const mapStateToItemListGroupProps = state => {
  currentItem = state.currentItem;
  return {
    currentItem
  };
};

const mapDispatchToItemListGroupProps = dispatch => {
  return {
    dispatch
  };
};

const ItemListGroupWrapper = ReactRedux.connect(mapStateToItemListGroupProps, mapDispatchToItemListGroupProps)(ItemListGroup);

class ItemListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
    this.showItem = this.showItem.bind(this);
    this.onItemModerationToggle = this.onItemModerationToggle.bind(this);
  }

  componentDidMount() {
    this.getOptionalFileInfo();
  }

  getOptionalFileInfo() {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function (res) {
      const fileInfo = appHelpers.configureOptionalFileStatus(res);
      if (this.props.item.poster_file) {
        const posterInnerPath = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.poster_file;
        Page.cmd("optionalFileInfo", posterInnerPath, function (res) {
          const posterFileInfo = appHelpers.configureOptionalFileStatus(res);
          this.setState({
            poster_file_info: posterFileInfo,
            poster_inner_path: posterInnerPath,
            file_info: fileInfo,
            inner_path: inner_path
          });
        }.bind(this));
      } else {
        this.setState({
          file_info: fileInfo,
          inner_path: inner_path
        });
      }
    }.bind(this));
  }

  showItem() {
    store.dispatch(setCurrentItem(this.props.item, this.props.groupIndex));
  }

  onItemModerationToggle() {

    const user = store.getState().user;
    const inner_path = "merged-" + this.props.config.merger_name + "/" + user.cluster + "/data/users/" + user.user_auth_address + "/data.json";

    Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
      if (data) {
        data = JSON.parse(data);
        if (!data.moderation) {
          data.moderation = [];
          data.next_moderation_id = 1;
        }
      } else {
        data = { "next_moderation_id": 1, "moderation": [] };
      }
      // moderation
      const moderation = {
        moderation_id: user.user_auth_address + "_mod_" + data.next_moderation_id,
        moderation_type: "item",
        item_id: this.props.item.item_id,
        hide: 1,
        current: 1,
        date_added: +new Date()
      };
      data.next_moderation_id += 1;
      data.moderation.push(moderation);
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
          // window.top.location.href = "index.html";
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  render() {
    const iconClass = itemHelpers.getContentTypeIconClass(this.props.item.content_type);
    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    let listItemImageContainer = React.createElement(
      'div',
      { className: 'list-item-image-container default-image' },
      React.createElement(
        'a',
        { onClick: this.showItem },
        React.createElement('i', { className: iconClass + " icon" })
      )
    );
    if (this.state.file_info && this.props.item.content_type === 'image' || this.state.poster_file_info) {
      const user_settings = store.getState().user_settings;
      const imageIsDeleted = window.itemHelpers.checkIfImageIsDeleted(this.state.inner_path, user_settings);
      if (!imageIsDeleted) {
        listItemImageContainer = React.createElement(ListItemImageContainer, {
          config: this.props.config,
          item: this.props.item,
          fileInfo: this.state.file_info,
          innerPath: this.state.inner_path,
          posterFileInfo: this.state.poster_file_info,
          posterInnerPath: this.state.poster_inner_path,
          onShowItem: this.showItem
        });
      }
    }

    let itemListItemCssClass = "ui card centered list-item";
    let itemDownloadPercetDisplay;
    const isDeleted = window.itemHelpers.checkIfItemIsDeleted(this.props.item, store.getState().user_settings);
    if (isDeleted) {
      itemListItemCssClass += " deleted";
    } else {
      if (this.state.file_info) {
        if (this.state.file_info.downloaded_percent) {
          itemDownloadPercetDisplay = React.createElement(
            'div',
            { className: 'piece success' },
            React.createElement(
              'div',
              { className: 'ui progress success' },
              React.createElement(
                'div',
                { style: { width: this.state.file_info.downloaded_percent + "%", 'overflow': 'hidden' }, className: 'bar' },
                React.createElement('div', { className: 'progress' })
              )
            )
          );
          if (this.state.file_info.downloaded_percent === 100) {
            itemListItemCssClass += " cached";
          }
        } else if (this.state.file_info.size < 1000000 && this.state.file_info.is_downloaded === 1) {
          itemListItemCssClass += " cached";
        }
      }
    }

    let adminModerationToggleDisplay;
    if (store.getState().site_info.settings.own === true) {
      adminModerationToggleDisplay = React.createElement(
        'div',
        { className: 'moderation-toggle-item' },
        React.createElement(
          'a',
          { onClick: this.onItemModerationToggle },
          'toggle moderation'
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'sixteen wide phone eight wide tablet four wide computer column list-item-container' },
      React.createElement(
        'div',
        { className: itemListItemCssClass },
        adminModerationToggleDisplay,
        listItemImageContainer,
        itemDownloadPercetDisplay,
        React.createElement(ListItemDetailsContainer, {
          config: this.props.config,
          item: this.props.item,
          groupIndex: this.props.groupIndex,
          onShowItem: this.showItem
        }),
        React.createElement(ListItemFooter, {
          item: this.props.item,
          fileInfo: this.state.file_info,
          groupIndex: this.props.groupIndex,
          onShowItem: this.showItem,
          isDeleted: isDeleted,
          onDeleteItem: this.props.onDeleteItem
        })
      )
    );
  }
}

class ListItemImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onImageLoadError = this.onImageLoadError.bind(this);
  }

  onImageLoadError() {
    // ('on image load error')
  }

  render() {
    let imagePath;
    if (this.props.posterFileInfo) {
      imagePath = this.props.posterInnerPath;
    } else if (this.props.fileInfo) {
      imagePath = this.props.innerPath;
    }
    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    let iconContainer;
    const iconClass = itemHelpers.getContentTypeIconClass(this.props.item.content_type);
    return React.createElement(
      'div',
      { className: 'image' },
      React.createElement(
        'a',
        { onClick: this.props.onShowItem },
        React.createElement('img', { src: imagePath, onError: this.onImageLoadError }),
        React.createElement('i', { className: iconClass + " icon" })
      )
    );
  }
}

class ListItemDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onShowItem = this.onShowItem.bind(this);
  }

  onShowItem() {
    store.dispatch(setCurrentItem(this.props.item, this.props.groupIndex));
  }

  render() {
    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    let itemTitle = this.props.item.title;
    if (itemTitle && itemTitle.length > 100) itemTitle = itemTitle.substr(0, 97) + '...';

    let channelImageSource;
    if (this.props.item.logo_file) {
      const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.logo_file;

      const user_settings = store.getState().user_settings;
      const isDeleted = window.itemHelpers.checkIfImageIsDeleted(imagePath, user_settings);

      if (isDeleted) {
        channelImageSource = "assets/img/x-avatar.png";
      } else {
        channelImageSource = imagePath;
      }
    } else {
      channelImageSource = "assets/img/x-avatar.png";
    }
    const channelImageElement = React.createElement('img', { className: 'avatar', src: channelImageSource });

    return React.createElement(
      'div',
      { className: 'content list-item-details-container' },
      React.createElement(
        'span',
        { className: 'item-filetype-text' },
        this.props.item.file_type
      ),
      React.createElement(
        'h3',
        { className: 'header' },
        React.createElement(
          'a',
          { href: itemLink },
          itemTitle
        )
      ),
      React.createElement(
        'div',
        { className: 'floated author' },
        channelImageElement,
        React.createElement(
          'a',
          { href: 'index.html?view:channel+id:' + this.props.item.channel_address },
          this.props.item.channel_name
        )
      ),
      React.createElement(
        'div',
        { className: 'description' },
        React.createElement(
          'article',
          null,
          this.props.description
        ),
        React.createElement(
          'div',
          { className: 'date' },
          timeAgo,
          ' \u25CF ',
          fileSize
        )
      )
    );
  }
}

class ListItemFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
  }

  onDeleteItemClick() {
    this.props.onDeleteItem(this.props.item, this.props.fileInfo);
  }

  render() {

    let listItemFooterCssClass = "ui extra content menu secondary list-item-footer",
        trashMenuItemDisplay;
    if (this.props.fileInfo || this.props.isDeleted) {
      listItemFooterCssClass += " w-trash";
      let itemDeletedText, trashIconColor;
      if (this.props.isDeleted) {
        trashIconColor = "red";
        itemDeletedText = "deleted";
        trashMenuItemDisplay = React.createElement(
          'a',
          { className: 'item disabled delete-status' },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: "trash icon red" }),
            React.createElement(
              'span',
              null,
              'deleted'
            )
          )
        );
      } else {
        trashMenuItemDisplay = React.createElement(
          'a',
          { onClick: this.onDeleteItemClick, className: 'item delete-status' },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: "trash icon gray" }),
            React.createElement(
              'span',
              null,
              'delete'
            )
          )
        );
      }
    }

    let peerCount, leechCount, seedCount;
    if (!this.props.isDeleted) {
      if (this.props.fileInfo) {
        peerCount = this.props.fileInfo.peer;
        if (this.props.fileInfo.peer_leech) {
          leechCount = this.props.fileInfo.peer_leech + "/";
        }
        if (this.props.fileInfo.peer_seed) {
          seedCount = this.props.fileInfo.peer_seed + "/";
        }
      } else {
        peerCount = "?";
      }
    } else {
      peerCount = "?";
    }

    return React.createElement(
      'div',
      { className: listItemFooterCssClass },
      trashMenuItemDisplay,
      React.createElement(
        'a',
        { className: 'item peers' },
        React.createElement(
          'h6',
          { className: 'ui icon header' },
          React.createElement('i', { className: 'users icon' }),
          React.createElement(
            'span',
            null,
            React.createElement(
              'span',
              { className: 'yellow' },
              leechCount
            ),
            React.createElement(
              'span',
              { className: 'green' },
              seedCount
            ),
            React.createElement(
              'span',
              null,
              peerCount
            )
          )
        )
      ),
      React.createElement(
        'a',
        { className: 'item up-votes' },
        React.createElement(
          'h6',
          { className: 'ui icon header' },
          React.createElement('i', { className: 'thumbs outline up icon' }),
          React.createElement(
            'span',
            null,
            this.props.item.up_votes
          )
        )
      ),
      React.createElement(
        'a',
        { className: 'item down-votes' },
        React.createElement(
          'h6',
          { className: 'ui icon header' },
          React.createElement('i', { className: 'thumbs outline down icon' }),
          React.createElement(
            'span',
            null,
            this.props.item.down_votes
          )
        )
      ),
      React.createElement(
        'a',
        { className: 'item comment-count' },
        React.createElement(
          'h6',
          { className: 'ui icon header' },
          React.createElement('i', { className: 'comments icon' }),
          React.createElement(
            'span',
            null,
            this.props.item.comment_count
          )
        )
      )
    );
  }
}
class ItemFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
    this.getItem = this.getItem.bind(this);
    this.handleItemTitleChange = this.handleItemTitleChange.bind(this);
    this.handleItemDescriptionChange = this.handleItemDescriptionChange.bind(this);
    this.handleItemCategoryChange = this.handleItemCategoryChange.bind(this);
    this.handleItemSubCategoryChange = this.handleItemSubCategoryChange.bind(this);
    this.handleItemContentTypeChange = this.handleItemContentTypeChange.bind(this);
    this.handleItemInnerFileChange = this.handleItemInnerFileChange.bind(this);
    this.handleAssociatedImageClick = this.handleAssociatedImageClick.bind(this);
    this.handleRemoveAssociatedImageClick = this.handleRemoveAssociatedImageClick.bind(this);
    this.handleFinishUploadingAssociatedImage = this.handleFinishUploadingAssociatedImage.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    console.log(this.props);
    this.getItem();
  }

  getItem() {
    const query = "SELECT * FROM item WHERE item_id='" + this.props.itemId + "'";
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ item: res[0] });
    }.bind(this));
  }

  handleItemTitleChange(title) {
    const item = this.state.item;
    item.title = title;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleItemDescriptionChange(description) {
    const item = this.state.item;
    item.description = description;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleItemCategoryChange(categoryId) {
    const item = this.state.item;
    item.category = categoryId;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleItemSubCategoryChange(categoryId) {
    const item = this.state.item;
    item.subcategory = categoryId;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleAssociatedImageClick(img) {
    const item = this.state.item;
    item.poster_file = img.file_name;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleRemoveAssociatedImageClick() {
    const item = this.state.item;
    item.poster_file = null;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleFinishUploadingAssociatedImage(imageItem) {
    const item = this.state.item;
    item.poster_file = imageItem.file_name;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleItemContentTypeChange(e) {
    const item = this.state.item;
    item.content_type = e.target.value;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  handleItemInnerFileChange(innerFile) {
    console.log(innerFile);
    const item = this.state.item;
    item.inner_file = innerFile;
    this.setState({ item: item }, function () {
      this.validateForm();
    });
  }

  validateForm() {
    const errors = formHelpers.validateItemForm(this.state.item);
    this.setState({ errors: errors });
  }

  handleFormSubmit() {
    if (this.state.errors.length === 0) this.props.onUpdateItemClick(this.state.item);
  }

  render() {
    if (this.state.item) {
      if (this.state.loading) {
        return React.createElement(LoadingContainer, null);
      } else {

        let itemPosterConfigContainer;
        if (this.state.item.content_type !== 'image') {
          itemPosterConfigContainer = React.createElement(ItemPosterConfigContainer, {
            isItem: true,
            item: this.state.item,
            page: this.props.page,
            channel: this.props.channel,
            user: this.props.user,
            config: this.props.config,
            onRemoveAssociatedImageClick: this.handleRemoveAssociatedImageClick,
            onFinishUploadingAssociatedImage: this.handleFinishUploadingAssociatedImage,
            onAssociatedImageClick: this.handleAssociatedImageClick
          });
        } else {
          const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.user.user_auth_address + "/" + this.state.item.file_name;
          itemPosterConfigContainer = React.createElement(
            "div",
            { className: "ui segment item-image" },
            React.createElement("img", { src: inner_path })
          );
        }

        return React.createElement(
          "div",
          { id: "item-form-container", className: "form-container" },
          React.createElement(
            "div",
            { className: "ui segment header blue" },
            React.createElement(
              "h2",
              null,
              this.state.item.title
            )
          ),
          React.createElement(
            "div",
            { className: "ui grid form-section-content" },
            React.createElement(
              "div",
              { className: "six wide tablet four wide computer column" },
              React.createElement(ItemStaticInfoContainer, {
                item: this.state.item,
                channel: this.props.channel,
                onSelectContentType: this.handleItemContentTypeChange,
                onItemSelectInnerFile: this.handleItemInnerFileChange
              }),
              itemPosterConfigContainer
            ),
            React.createElement(
              "div",
              { className: "ten wide tablet twelve wide computer column" },
              React.createElement(ItemForm, {
                item: this.state.item,
                page: this.props.page,
                channel: this.props.channel,
                user: this.props.user,
                config: this.props.config,
                errors: this.state.errors,
                onItemCategoryChange: this.handleItemCategoryChange,
                onItemSubCategoryChange: this.handleItemSubCategoryChange,
                onItemTitleChange: this.handleItemTitleChange,
                onItemDescriptionChange: this.handleItemDescriptionChange,
                onFormSubmit: this.handleFormSubmit
              })
            )
          )
        );
      }
    } else {
      return React.createElement(LoadingContainer, null);
    }
  }
}

class ItemStaticInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openInnerFileSelectModal = this.openInnerFileSelectModal.bind(this);
  }

  openInnerFileSelectModal() {
    jQuery('#inner-file-select-modal').modal('show');
  }

  render() {
    if (this.props.item) {

      let contentTypeContainer;
      if (this.props.item.file_type === 'zip') {
        contentTypeContainer = React.createElement(
          "select",
          { selected: this.props.item.content_type, onChange: this.props.onSelectContentType },
          React.createElement(
            "option",
            { selected: this.props.item.content_type === "archive" ? "selected" : "", value: "archive" },
            "archive"
          ),
          React.createElement(
            "option",
            { selected: this.props.item.content_type === "game" ? "selected" : "", value: "game" },
            "game"
          )
        );
      } else {
        contentTypeContainer = this.props.item.content_type;
      }

      let innerFileAnchorLink;
      if (this.props.item.content_type === 'game' && this.props.item.file_type === 'zip') {
        let innerFile;
        if (typeof this.props.item.inner_file === 'undefined') {
          innerFile = "select inner file";
        } else {
          innerFile = this.props.item.inner_file;
        }
        innerFileAnchorLink = React.createElement(
          "a",
          { className: "inner-file-anchor-link", onClick: this.openInnerFileSelectModal },
          React.createElement(
            "small",
            null,
            innerFile
          )
        );
      }

      let innerFileSelectModalDisplay;
      if (this.props.item.content_type === 'game' && this.props.item.file_type === 'zip') {
        innerFileSelectModalDisplay = React.createElement(
          "div",
          { className: "ui basic modal", id: "inner-file-select-modal" },
          React.createElement(
            "div",
            { className: "content segment white" },
            React.createElement(InnerFileSelectModal, {
              item: this.props.item,
              channel: this.props.channel,
              itemIndex: 0,
              onItemSelectInnerFile: this.props.onItemSelectInnerFile
            })
          )
        );
      }

      const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
      return React.createElement(
        "div",
        { id: "item-static-info-container" },
        React.createElement(
          "div",
          { className: "ui segment inverted item-static-info" },
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "file name:"
            ),
            React.createElement(
              "span",
              null,
              this.props.item.file_name
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "file size:"
            ),
            React.createElement(
              "span",
              null,
              this.props.item.file_size
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "file type:"
            ),
            React.createElement(
              "span",
              null,
              this.props.item.file_type
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "content type:"
            ),
            React.createElement(
              "span",
              null,
              contentTypeContainer
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "date uploaded:"
            ),
            React.createElement(
              "span",
              null,
              timeAgo
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "inner file:"
            ),
            React.createElement(
              "span",
              null,
              innerFileAnchorLink
            ),
            innerFileSelectModalDisplay
          )
        )
      );
    } else {
      let timeAgoContainer;
      if (this.props.channel.date_added) {
        const timeAgo = appHelpers.getTimeAgo(this.props.channel.date_added);
        timeAgoContainer = React.createElement(
          "span",
          null,
          timeAgo
        );
      }
      return React.createElement(
        "div",
        { id: "item-static-info-container" },
        React.createElement(
          "div",
          { className: "ui segment inverted item-static-info" },
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "cluster ID:"
            ),
            React.createElement(
              "span",
              null,
              this.props.channel.cluster_id
            )
          ),
          React.createElement(
            "div",
            { className: "item-static-info-row" },
            React.createElement(
              "span",
              null,
              "date created:"
            ),
            timeAgoContainer
          )
        )
      );
    }
  }
}

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemTitleInputChange = this.handleItemTitleInputChange.bind(this);
    this.handleItemDescriptionInputChange = this.handleItemDescriptionInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleItemTitleInputChange(e) {
    this.props.onItemTitleChange(e.target.value);
  }

  handleItemDescriptionInputChange(e) {
    this.props.onItemDescriptionChange(e.target.value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true }, function () {
      this.props.onFormSubmit();
    });
  }

  render() {
    let errorsContainer, uploadButton;
    if (this.props.errors.length > 0) {
      const formErrors = this.props.errors.map((error, i) => React.createElement(
        "p",
        { key: "{i}" },
        error
      ));
      errorsContainer = React.createElement(
        "div",
        { className: "ui error message" },
        React.createElement(
          "div",
          { className: "header" },
          "Error"
        ),
        formErrors
      );
    } else {
      uploadButton = React.createElement(
        "button",
        {
          className: "ui button primary floated right",
          type: "submit" },
        "Update Item"
      );
    }
    return React.createElement(
      "div",
      { id: "item-form", className: this.state.loading ? "ui form-view segment loading" : "ui form-view segment" },
      errorsContainer,
      React.createElement(
        "form",
        { onSubmit: this.handleFormSubmit, className: "ui form" },
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Title"
          ),
          React.createElement("input", {
            type: "text",
            defaultValue: this.props.item.title,
            onChange: this.handleItemTitleInputChange
          })
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Categories"
          ),
          React.createElement(CategorySelectContainer, {
            subcategory: this.props.item.subcategory,
            config: this.props.config,
            item: this.props.item,
            onItemCategoryChange: this.props.onItemCategoryChange,
            onItemSubCategoryChange: this.props.onItemSubCategoryChange
          })
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            null,
            "Description"
          ),
          React.createElement("textarea", {
            type: "textarea",
            placeholder: "Add description to the item",
            defaultValue: this.props.item.description,
            onChange: this.handleItemDescriptionInputChange })
        ),
        uploadButton
      )
    );
  }
}

class CategorySelectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let optionList = this.props.config.categories.slice();
    let selectedCategory, subOptionList, selectedSubcatgeory, subcategoryContainer;
    optionList.forEach(function (option, index) {
      if (this.props.item.category == option.category_id) {
        selectedCategory = option;
        subOptionList = option.subcategories.slice();
      }
      option.value = option.category_id;
      option.label = option.category_name;
    }.bind(this));
    if (selectedCategory) {
      subOptionList.forEach(function (option, index) {
        if (this.props.item.subcategory == option.category_id) selectedSubcatgeory = option;
        option.value = option.category_id;
        option.label = option.category_name;
      }.bind(this));
    }

    return React.createElement(
      "div",
      { id: "category-select-elements-container" },
      React.createElement(
        "div",
        { id: "category-select-container", className: "field" },
        React.createElement(FormSelectContainer, {
          item: this.props.item,
          options: optionList,
          onSelectChange: this.props.onItemCategoryChange,
          selectId: "category-select",
          selected: selectedCategory
        })
      ),
      React.createElement(
        "div",
        { id: "subcategory-select-container", className: "field" },
        React.createElement(FormSelectContainer, {
          item: this.props.item,
          options: subOptionList,
          onSelectChange: this.props.onItemSubCategoryChange,
          selectId: "subcategory-select",
          selected: selectedSubcatgeory
        })
      )
    );
  }
}

class ItemPosterConfigContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      images: []
    };
    this.getChannelImages = this.getChannelImages.bind(this);
    this.handleFinishUploadingAssociatedImage = this.handleFinishUploadingAssociatedImage.bind(this);
  }

  componentDidMount() {
    this.getChannelImages();
  }

  getChannelImages() {
    const query = "SELECT * FROM item WHERE content_type='image' AND item.item_id LIKE '" + this.props.channel.channel_address + "%'";
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ images: res, loading: false });
    }.bind(this));
  }

  handleFinishUploadingAssociatedImage(item) {
    this.setState({ loading: true }, function () {
      this.props.onFinishUploadingAssociatedImage(item);
      this.getChannelImages();
    });
  }

  render() {
    return React.createElement(
      "div",
      { id: "item-poster-config-container" },
      React.createElement(AssociatedImageUploadContainer, {
        isChannel: this.props.isChannel,
        isItem: this.props.isItem,
        item: this.props.item,
        config: this.props.config,
        channel: this.props.channel,
        user: this.props.user,
        onRemoveAssociatedImageClick: this.props.onRemoveAssociatedImageClick,
        onFinishUploadingAssociatedImage: this.handleFinishUploadingAssociatedImage
      }),
      React.createElement(ChannelImageSelection, {
        item: this.props.item,
        config: this.props.config,
        user: this.props.user,
        channel: this.props.channel,
        images: this.state.images,
        loading: this.state.loading,
        onAssociatedImageClick: this.props.onAssociatedImageClick
      })
    );
  }
}

class AssociatedImageUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleChangeAssociatedImageClick = this.handleChangeAssociatedImageClick.bind(this);
    this.handleRemoveAssociatedImageClick = this.handleRemoveAssociatedImageClick.bind(this);
    this.handleUploadAssociatedImageClick = this.handleUploadAssociatedImageClick.bind(this);
    this.onReadImage = this.onReadImage.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.generateUploadError = this.generateUploadError.bind(this);
    this.onFileUploadProgress = this.onFileUploadProgress.bind(this);
  }

  handleFileInputChange(e) {
    const imageFileObject = new Object(e.target.files[0]);
    this.setState({ loading: true }, function () {
      this.onReadImage(imageFileObject);
    }.bind(this));
  }

  handleRemoveAssociatedImageClick() {
    if (this.state.imageFileObject) {
      let changeInputElement;
      if (this.props.isItem) {
        changeInputElement = document.getElementById("files-input-" + this.props.item.item_id);
      } else {
        changeInputElement = document.getElementById("files-input-" + this.props.channel.channel_address);
      }
      if (changeInputElement) changeInputElement.value = '';

      this.setState({ imageFileObject: '' });
    } else if (this.props.isItem && this.props.poster_file || this.props.isChannel && this.props.channel) {
      this.props.onRemoveAssociatedImageClick();
    }
  }

  handleChangeAssociatedImageClick(e) {
    const imageFileObject = new Object(e.target.files[0]);
    this.setState({ loading: true }, function () {
      this.onReadImage(imageFileObject);
    }.bind(this));
  }

  handleUploadAssociatedImageClick() {
    this.setState({ loading: true }, function () {
      this.onUploadFile();
    });
  }

  onReadImage(imageFileObject) {
    const reader = new FileReader();
    const th = this;
    reader.onload = function () {
      imageFileObject.data = reader.result;
      let changeInputElement;
      if (th.props.isItem) {
        changeInputElement = document.getElementById("change-input-" + th.props.item.item_id);
      } else {
        changeInputElement = document.getElementById("change-input-" + th.props.channel.channel_address);
      }
      if (changeInputElement) changeInputElement.value = '';

      th.setState({ imageFileObject: imageFileObject, loading: false });
    };
    reader.readAsDataURL(imageFileObject);
  }

  onUploadFile() {
    console.log('on upload file');
    const item = fileHelpers.generateItemFromFile(this.props.channel, this.state.imageFileObject, this.props.config);
    item.is_associated = true;
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.user.user_auth_address + "/" + item.file_name;

    Page.cmd("optionalFileInfo", inner_path, function (res) {
      if (res) {
        this.generateUploadError(item);
      } else {
        this.setState({ uploading: true }, function () {
          this.uploadFile(this.state.imageFileObject, item, inner_path);
        });
      }
    }.bind(this));
  }

  generateUploadError(item) {
    let errors = [];
    if (this.state.errors) errors = this.state.errors;
    const error = { msg: 'file "' + item.file_name + '" already exists in user folder in this cluster!' };
    errors.push(error);
    this.setState({
      errors: errors,
      imageFileObject: '',
      loading: false
    }, function () {
      console.log(this.state.errors);
    });
  }

  uploadFile(file, item, inner_path) {
    Page.cmd("bigfileUploadInit", [inner_path, item.file_size], function (init_res) {
      var formdata = new FormData();
      var req = new XMLHttpRequest();
      formdata.append(item.file_name, file);
      // upload event listener
      req.upload.addEventListener("progress", function (res) {
        // update item progress
        this.onFileUploadProgress(res, item);
      }.bind(this));
      // loaded event listener
      req.upload.addEventListener("loadend", function () {
        this.createItem(item);
      }.bind(this));
      req.withCredentials = true;
      req.open("POST", init_res.url);
      req.send(formdata);
    }.bind(this));
  }

  onFileUploadProgress(res, item) {
    const fileProgress = parseInt(res.loaded / res.total * 100);
    this.updateFileUploadProgress(item, fileProgress);
  }

  updateFileUploadProgress(fileProgress) {
    this.setState({
      file_progress: fileProgress
    });
  }

  createItem(item) {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.user.user_auth_address + "/data.json";
    Page.cmd("fileGet", { inner_path: inner_path, required: false }, function (data) {
      if (data) {
        data = JSON.parse(data);
        if (!data.item) {
          data.next_item_id = 1;
          data.item = [];
        }
        item.item_id = this.props.channel.channel_address + '_item_' + data.next_item_id;
        item.date_added = +new Date();
        data.item.push(item);
        data.next_item_id += 1;
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
          Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
            this.finishUploadingFile(item);
          }.bind(this));
        }.bind(this));
      } else {
        console.log('fix wrong cluster?');
      }
    }.bind(this));
  }

  finishUploadingFile(item) {
    let changeInputElement;
    if (this.props.isItem) {
      changeInputElement = document.getElementById("files-input-" + this.props.item.item_id);
    } else {
      changeInputElement = document.getElementById("files-input-" + this.props.channel.channel_address);
    }
    if (changeInputElement) changeInputElement.value = '';

    let target;
    if (this.props.isItem) target = this.props.item;else target = this.prop.channel;

    this.setState({ uploading: false, imageFileObject: '' }, function () {
      this.props.onFinishUploadingAssociatedImage(target);
    });
  }

  render() {
    let selectedImagePlaceholder;
    if (this.state.imageFileObject) {
      selectedImagePlaceholder = React.createElement("img", { src: this.state.imageFileObject.data });
    } else {
      if (this.props.isItem && this.props.item.poster_file) {
        const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.item.poster_file;
        selectedImagePlaceholder = React.createElement("img", { src: imagePath });
      } else if (this.props.isChannel && this.props.channel.logo_file) {
        const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.channel.logo_file;

        selectedImagePlaceholder = React.createElement("img", { src: imagePath });
      } else {
        selectedImagePlaceholder = React.createElement(
          "h4",
          { className: "ui icon header" },
          React.createElement("i", { className: "icon upload cloud" }),
          React.createElement(
            "div",
            { className: "content" },
            "Drag & Drop",
            React.createElement("br", null),
            "OR",
            React.createElement("br", null),
            "Click here to upload files"
          )
        );
      }
    }

    let filesInputId;
    if (this.props.item) filesInputId = "files-input-" + this.props.item.item_id;else filesInputId = "files-input-" + this.props.channel.channel_address;

    const dropzoneWrapper = React.createElement(
      "div",
      { className: this.state.loading ? "dropzone associated-image-uploader loading ui message" : "dropzone associated-image-uploader ui message" },
      React.createElement("input", {
        type: "file",
        id: filesInputId,
        accept: ".jpg,.png,.gif,.jpeg",
        onChange: this.handleFileInputChange }),
      selectedImagePlaceholder
    );

    let associatedImageFile;
    if (this.props.item) associatedImageFile = this.props.item.poster_file;else associatedImageFile = this.props.channel.logo_file;
    let imageConfigMenuContainer;
    if (this.state.imageFileObject && this.state.imageFileObject.data || associatedImageFile) {
      let uploadMenuItem;
      if (this.state.imageFileObject) uploadMenuItem = React.createElement(
        "a",
        { className: "item", onClick: this.handleUploadAssociatedImageClick },
        React.createElement("i", { className: "icon upload" }),
        "upload"
      );

      let changeInputId;
      if (this.props.item) changeInputId = "change-input-" + this.props.item.item_id;else changeInputId = "change-input-" + this.props.channel.channel_address;

      imageConfigMenuContainer = React.createElement(
        "div",
        { className: this.state.imageFileObject ? "ui menu three item" : "ui menu two item" },
        React.createElement(
          "a",
          { className: "item", onClick: this.handleRemoveAssociatedImageClick },
          React.createElement("i", { className: "icon remove" }),
          "remove"
        ),
        React.createElement(
          "a",
          { className: "item" },
          React.createElement("input", {
            type: "file",
            id: changeInputId,
            accept: ".jpg,.png,.gif,.jpeg",
            onChange: this.handleChangeAssociatedImageClick,
            className: "hidden" }),
          React.createElement("i", { className: "icon undo" }),
          "change"
        ),
        uploadMenuItem
      );
    }

    let errorList;
    if (this.state.errors) {
      const errors = this.state.errors.map((error, i) => React.createElement(
        "li",
        { key: i },
        error.msg
      ));
      errorList = React.createElement(
        "div",
        { className: "ui message error" },
        React.createElement(
          "ul",
          null,
          errors
        )
      );
    }

    return React.createElement(
      "div",
      { className: "associated-image-config-container" },
      errorList,
      dropzoneWrapper,
      imageConfigMenuContainer
    );
  }
}

class ChannelImageSelection extends React.Component {
  render() {
    if (this.props.images.length > 0) {
      const images = this.props.images.map((image, i) => React.createElement(ChannelImageSelectionItem, {
        key: i + image.item_id,
        image: image,
        item: this.props.item,
        config: this.props.config,
        channel: this.props.channel,
        onAssociatedImageClick: this.props.onAssociatedImageClick
      }));
      return React.createElement(
        "div",
        { className: this.props.loading ? "channel-image-selection ui segment green loading" : "channel-image-selection ui segment green" },
        React.createElement(
          "div",
          { className: "ui grid secondary" },
          images
        )
      );
    } else {
      return null;
    }
  }
}

class ChannelImageSelectionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageItemClick = this.handleImageItemClick.bind(this);
  }

  handleImageItemClick() {
    let target;
    if (this.props.item) {
      target = this.props.item;
    } else {
      target = this.props.channel;
    }
    this.props.onAssociatedImageClick(this.props.image, target);
  }

  render() {
    const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.image.file_name;

    let parentItemAssociatedImage;
    if (this.props.item) parentItemAssociatedImage = this.props.item.poster_file;else parentItemAssociatedImage = this.props.channel.logo_file;

    return React.createElement(
      "div",
      { className: "column five wide computer" },
      React.createElement(
        "a",
        { className: parentItemAssociatedImage === this.props.image.file_name ? "item-image active" : "item-image",
          onClick: this.handleImageItemClick },
        React.createElement("img", { src: imagePath })
      )
    );
  }
}
window.itemHelpers = function () {

  // generate item sort menu
  function genereateSortOptions() {
    const sort_options = [{
      label: 'newest',
      val: 'i.date_added DESC'
    }, {
      label: 'oldest',
      val: 'i.date_added ASC'
    }, {
      label: 'title z - a',
      val: 'i.title DESC'
    }, {
      label: 'title a - z',
      val: 'i.title ASC'
    }, {
      label: 'top voted',
      val: 'v.diff desc, i.item_id'
    }, {
      label: 'top commented',
      val: 'comment_count desc, i.item_id',
      dir: 'DESC' /*,{
                   label:'peers',
                   val:'-peer'
                  }*/ }];
    return sort_options;
  }

  // generate item sort menu
  function genereateChannelItemsSortOptions() {
    const sort_options = [{
      label: 'title',
      val: 'i.title',
      dir: 'DESC'
    }, {
      label: 'in cache',
      val: '',
      dir: ''
    }, {
      label: 'peers',
      val: '',
      dir: ''
    }, {
      label: 'file size',
      val: 'i.file_size',
      dir: 'DESC'
    }, {
      label: 'content',
      val: 'i.content_type',
      dir: 'DESC'
    }, {
      label: 'file type',
      val: 'i.file_type',
      dir: 'DESC'
    }, {
      label: 'date uploaded',
      val: 'i.date_added',
      dir: 'DESC'
    }];
    return sort_options;
  }

  function getDefaultModerationQueryValues(q, moderations) {
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND channel NOT LIKE '%" + hi.item_id + "'";
        });
      }
    }
    return q;
  }

  // count total items
  function countTotalItems(filters, moderations, channel, searchPhrase) {
    let q = "SELECT count(*) FROM item";
    q += " WHERE item_id IS NOT NULL";
    if (filters.file_type && filters.file_type !== 'all') {
      q += " AND file_type='" + filters.file_type + "'";
    } else {
      if (filters.content_type && filters.content_type !== 'all' && filters.content_type !== 'archive') {
        q += " AND content_type='" + filters.content_type + "'";
      } else if (filters.content_type === 'archive') {
        q += " AND ( file_type='zip' OR file_type='tar' ) ";
      }
    }
    if (channel && channel.channel_address) {
      q += " AND channel='" + channel.channel_address + "'";
    }
    q = this.getDefaultModerationQueryValues(q, moderations);
    if (searchPhrase && searchPhrase.length > 0) {
      q += " AND title LIKE '%" + searchPhrase + "%'";
    }
    return q;
  }

  // count total items for content type
  function countContentTypeTotalItemsQuery(content_type, channel, moderations, searchPhrase) {
    let q = "SELECT count(*) FROM item";
    q += " WHERE item_id IS NOT NULL";
    if (channel) q += " AND channel='" + channel.channel_address + "'";
    if (content_type !== 'all') {
      if (content_type === 'archive') {
        q += " AND ( file_type='zip' OR file_type='tar' )";
      } else {
        q += " AND content_type='" + content_type + "'";
      }
    }
    q = this.getDefaultModerationQueryValues(q, moderations);
    if (searchPhrase && searchPhrase.length > 0) {
      q += " AND title LIKE '%" + searchPhrase + "%'";
    }
    return q;
  }

  // counte total items for file type
  function countFileTypeTotalItemsQuery(content_type, file_type, channel, moderations, searchPhrase) {
    let q = "SELECT count(*) FROM item";
    q += " WHERE item_id IS NOT NULL";
    if (channel) q += " AND channel='" + channel.channel_address + "'";
    if (file_type !== 'all') {
      q += " AND file_type='" + file_type + "'";
    } else {
      if (content_type && content_type !== 'all') {
        if (content_type !== 'archive') {
          q += " AND content_type='" + content_type.split('s')[0] + "'";
        } else {
          if (file_type === 'all') {
            q += " AND ( file_type='zip' OR file_type='tar' )";
          }
        }
      }
    }
    q = this.getDefaultModerationQueryValues(q, moderations);
    if (searchPhrase && searchPhrase.length > 0) {
      q += " AND title LIKE '%" + searchPhrase + "%'";
    }
    return q;
  }

  // render pagination
  function renderPagination(config, filters, item_count, view) {
    const pagination = {};
    pagination.totalItems = item_count;
    pagination.currentPage = filters.current_page;
    pagination.items_per_page = view === "user" ? filters.items_per_page : config.listing.items_per_page;
    pagination.numPages = Math.ceil(pagination.totalItems / pagination.items_per_page);
    return pagination;
  }

  // get default item query values
  function getDefaultItemQueryValues() {
    let q = "SELECT i.*, c.*, id.*, count(cm.item_id) as comment_count";
    q += ", (SELECT count(*) FROM comment WHERE comment.item_id=i.item_id) as comment_count";
    q += ", (SELECT count(*) FROM vote WHERE vote.item_id=i.item_id AND vote.vote=1) as up_votes";
    q += ", (SELECT count(*) FROM vote WHERE vote.item_id=i.item_id AND vote.vote=0) as down_votes";
    q += " FROM item AS i";
    q += " JOIN channel AS c ON i.channel=c.channel_address";
    q += " LEFT JOIN item_deleted AS id ON i.item_id=id.item_id";
    q += " LEFT JOIN comment AS cm ON i.item_id=cm.item_id";
    q += " LEFT JOIN ( SELECT item_id, sum(case when vote = 1 then 1 else 0 end) - sum(case when vote = 0 then 1 else 0 end) diff FROM vote GROUP BY item_id ) AS v ON i.item_id = v.item_id";
    q += " LEFT JOIN ( SELECT count(*) FROM comment) AS cm ON i.item_id = cm.item_id";
    return q;
  }

  // get items sql query
  function getItemsQuery(config, moderations, showModerations, filters, channel, searchPhrase) {
    q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT NULL";
    if (channel && channel.channel_address) {
      q += " AND i.channel='" + channel.channel_address + "'";
    }
    if (filters.content_type === 'archive' && !filters.file_type) {
      q += " AND ( i.file_type='zip' OR i.file_type='tar' )";
    } else {

      if (filters.file_type && filters.file_type !== 'all') {
        q += " AND i.file_type='" + filters.file_type + "'";
      } else {
        if (filters.content_type && filters.content_type !== 'all' && filters.content_type !== 'archive') {
          q += " AND i.content_type='" + filters.content_type + "'";
          if (filters.content_type === 'video') q += " AND file_type!='ogg'";
        }
      }
    }

    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND i.channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND i.channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND i.item_id!='" + hi.item_id + "'";
        });
      }
    }

    if (searchPhrase && searchPhrase.length > 0) {
      q += " AND i.title LIKE '%" + searchPhrase + "%'";
    }
    // q+= "AND (i.is_associated IS NULL OR i.is_associated!=1)"
    q += " GROUP BY i.item_id";
    q += " ORDER BY " + filters.sort_by.val + "";
    if (filters.pagination) {
      q += " LIMIT " + parseInt(filters.pagination.items_per_page);
      if (filters.pagination.currentPage > 1) q += " OFFSET " + (filters.pagination.currentPage - 1) * filters.pagination.items_per_page;
    }
    return q;
  }

  // get items id array
  function getItemsIdArray(items) {
    let itemsId = [];
    items.forEach(function (item, index) {
      itemsId.push(item.item_id);
    });
    return itemsId;
  }

  // get item
  function getItemQuery(route) {
    q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id='" + route.id + "'";
    return q;
  }

  // get related item: file type
  function getRelatedItemsByFileTypeQuery(item, itemsPerQuery, itemsId, moderations) {
    let q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT '" + item.item_id + "'";
    q += " AND i.file_type='" + item.file_type + "'";
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND i.channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND i.channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND i.item_id!='" + hi.item_id + "'";
        });
      }
    }
    q += " GROUP BY i.item_id";
    q += " ORDER BY i.date_added DESC";
    q += " LIMIT " + itemsPerQuery;
    return q;
  }

  // get related item: content type
  function getRelatedItemsByContentTypeQuery(item, itemsPerQuery, itemsId, moderations) {
    let q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT '" + item.item_id + "'";
    if (itemsId) {
      itemsId.forEach(function (id, index) {
        q += " AND i.item_id IS NOT '" + id + "'";
      });
    }
    q += " AND i.content_type='" + item.content_type + "'";
    q += " AND i.file_type IS NOT '" + item.file_type + "'";
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND i.channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND i.channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND i.item_id!='" + hi.item_id + "'";
        });
      }
    }
    q += " GROUP BY i.item_id";
    q += " ORDER BY i.date_added DESC";
    q += " LIMIT " + itemsPerQuery;
    return q;
  }

  // get related item: channel
  function getRelatedItemsByChannel(item, itemsPerQuery, itemsId) {
    let q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT '" + item.item_id + "'";
    if (itemsId) {
      itemsId.forEach(function (id, index) {
        q += " AND i.item_id IS NOT '" + id + "'";
      });
    }
    q += " AND i.content_type IS NOT '" + item.content_type + "'";
    q += " AND i.file_type IS NOT '" + item.file_type + "'";
    q += " AND i.channel='" + item.channel + "'";
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND i.channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND i.channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND i.item_id!='" + hi.item_id + "'";
        });
      }
    }
    q += " GROUP BY i.item_id";
    q += " ORDER BY i.date_added DESC";
    q += " LIMIT " + itemsPerQuery;
    return q;
  }

  // get related item: title
  function getRelatedItemsByTitle(item, itemsPerQuery, itemsId, titleChunksArray) {
    let q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT '" + item.item_id + "'";
    if (itemsId) {
      itemsId.forEach(function (id, index) {
        q += " AND i.item_id IS NOT '" + id + "'";
      });
    }
    q += " AND i.content_type IS NOT '" + item.content_type + "'";
    q += " AND i.file_type IS NOT '" + item.file_type + "'";
    q += " AND i.channel IS NOT '" + item.channel + "'";
    if (titleChunksArray) {
      q += " AND (";
      titleChunksArray.forEach(function (tc, index) {
        q += " i.title LIKE '%" + tc + "%'";
        if (index + 1 < titleChunksArray.length) q += " OR";
      });
      q += " )";
    }
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND i.channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND i.channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND i.item_id!='" + hi.item_id + "'";
        });
      }
    }
    q += " GROUP BY i.item_id";
    q += " ORDER BY i.date_added DESC";
    q += " LIMIT " + itemsPerQuery;
    return q;
  }

  // get related items
  function getRelatedItemsQuery(config, moderations, filters) {
    q = this.getDefaultItemQueryValues();
    q += " WHERE i.item_id IS NOT '" + filters.item_id + "'";
    if (filters.content_type && filters.content_type !== 'all') {
      q += " AND content_type='" + filters.content_type + "'";
      if (filters.content_type === 'video') q += " AND file_type!='ogg'";
    }
    if (moderations && moderations.show_moderations) {
      if (moderations.moderations.users) {
        moderations.moderations.users.forEach(function (hu, index) {
          q += " AND channel NOT LIKE '%" + hu.item_id + "'";
        });
      }
      if (moderations.moderations.channels) {
        q += " AND channel NOT IN (";
        moderations.moderations.channels.forEach(function (hc, index) {
          if (index > 0) q += ",";
          q += "'" + hc.item_id + "'";
        });
        q += ")";
      }
      if (moderations.moderations.items) {
        moderations.moderations.items.forEach(function (hi, index) {
          q += " AND channel NOT LIKE '%" + hi.item_id + "'";
        });
      }
    }
    q += " GROUP BY i.item_id";
    q += " ORDER BY i.date_added DESC";
    q += " LIMIT 20";
    return q;
  }

  function getChannelItemsQuery(filters) {
    q = this.getDefaultItemQueryValues();
    q += " WHERE i.channel='" + filters.channel.channel_address + "'";
    q += " GROUP BY i.item_id";
    if (filters.sortBy) {
      q += " ORDER BY " + filters.sortBy.val + " " + filters.sortBy.dir + " ";
    }
    if (filters.pagination) {
      q += " LIMIT " + parseInt(filters.pagination.items_per_page);
      if (filters.pagination.currentPage > 1) q += " OFFSET " + (filters.pagination.currentPage - 1) * filters.pagination.items_per_page;
    }
    return q;
  }

  function getDefaultItemImagePath(item) {
    let path = "assets/img/";
    if (item.content_type === 'audio') {
      path += "music.png";
    } else if (item.content_type === 'book') {
      path += "book_default_icon.jpg";
    } else if (item.content_type === 'image') {
      path += "image_default_icon.jpg";
    } else if (item.content_type === 'game') {
      if (item.file_type === 'bin') {
        path += "logo_atari.jpg";
      } else if (item.file_type === 'nes') {
        path += "logo_nes.png";
      } else if (item.file_type === 'sna') {
        path += "logo_sna.jpg";
      } else if (item.file_type === 'zip') {
        path += "logo_dos.gif";
      }
    } else if (item.content_type === 'video') {
      path += "video_default_icon.jpg";
    }
    return path;
  }

  function getContentTypeIconClass(contentType) {
    let iconClass;
    if (contentType === 'all') iconClass = 'cloud download';else if (contentType === 'archive') iconClass = 'archive';else if (contentType === 'audio') iconClass = 'sound';else if (contentType === 'book') iconClass = 'book';else if (contentType === 'image') iconClass = 'image';else if (contentType === 'game') iconClass = 'game';else if (contentType === 'video') iconClass = 'film';
    return iconClass;
  }

  function getContentTypeFileTypes(content_type, content_types) {
    let file_types;
    if (content_type !== 'all') {
      content_types.forEach(function (ct, index) {
        if (ct.type === content_type) {
          file_types = ct.file_types;
        }
      });
    }
    return file_types;
  }

  function getItemFilePiecesInfo(res, item) {
    const pieceStandardSize = 1048576;
    let pieceInfo = [];
    for (var i = 0; i < res.pieces; i++) {
      let piece = {};
      piece.index = i;
      piece.start = piece.index * pieceStandardSize;
      piece.end = (piece.index + 1) * pieceStandardSize;
      if (res.pieces_downloaded === 0) {
        if (i === 0) {
          piece.state = 'downloading';
        }
      } else {
        if (i <= res.pieces_downloaded) {
          piece.state = 'complete';
        } else if (i === res.pieces_downloaded + 1) {
          piece.state = 'downloading';
        }
      }
      pieceInfo.push(piece);
    }
    return pieceInfo;
  }

  function checkIfItemIsDeleted(item, localStorage) {
    let isDeleted = false;
    if (localStorage.deleted_items) {
      localStorage.deleted_items.forEach(function (dItem, index) {
        if (dItem.item_id === item.item_id) {
          isDeleted = true;
        }
      });
    }
    return isDeleted;
  }

  function checkIfImageIsDeleted(imagePath, localStorage) {
    let isDeleted = false;
    if (localStorage.deleted_items) {
      localStorage.deleted_items.forEach(function (dItem, index) {
        if (dItem.fileAddress === imagePath) {
          isDeleted = true;
        }
      });
    }
    return isDeleted;
  }

  function removeItemFromDeletedItems(item, localStorage) {
    let removedItemIndex;
    localStorage.deleted_items.forEach(function (dItem, index) {
      if (dItem.item_id === item.item_id) {
        removedItemIndex = index;
      }
    });
    localStorage.deleted_items.splice(removedItemIndex, 1);
    return localStorage;
  }

  return {
    countContentTypeTotalItemsQuery,
    countFileTypeTotalItemsQuery,
    genereateSortOptions,
    getDefaultModerationQueryValues,
    genereateChannelItemsSortOptions,
    countTotalItems,
    renderPagination,
    getDefaultItemQueryValues,
    getItemsQuery,
    getItemsIdArray,
    getRelatedItemsByFileTypeQuery,
    getRelatedItemsByContentTypeQuery,
    getRelatedItemsByChannel,
    getRelatedItemsByTitle,
    getRelatedItemsQuery,
    getItemQuery,
    getChannelItemsQuery,
    getDefaultItemImagePath,
    getContentTypeIconClass,
    getContentTypeFileTypes,
    getItemFilePiecesInfo,
    checkIfItemIsDeleted,
    checkIfImageIsDeleted,
    removeItemFromDeletedItems
  };
}();
class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getItem = this.getItem.bind(this);
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
    this.onGetOptionalFileInfo = this.onGetOptionalFileInfo.bind(this);
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
    this.handleApproveRedownloadClick = this.handleApproveRedownloadClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  componentDidMount() {
    window.Page.cmd('WrapperSetTitle', 'hello');
    this.setState({ loading: true }, function () {
      this.getItem();
    });
  }

  getItem() {
    if (this.props.item) {
      this.setState({ item: this.props.item }, function () {
        store.dispatch(setItemInfo(this.props.item));
        this.onGetOptionalFileInfo();
      });
    } else {
      const query = itemHelpers.getItemQuery(this.props.route);
      Page.cmd("dbQuery", [query], function (res) {
        this.setState({ item: res[0] }, function () {
          store.dispatch(setItemInfo(res[0]));
          this.onGetOptionalFileInfo();
        });
      }.bind(this));
    }
  }

  onGetOptionalFileInfo() {
    // document.title = store.getState().item.title;
    const item = store.getState().item.item_info;
    window.Page.cmd('WrapperSetTitle', item.title);
    const isDeleted = window.itemHelpers.checkIfItemIsDeleted(item, store.getState().user_settings);
    if (isDeleted) {
      this.setState({ loading: false, deleted: true });
    } else {
      this.getOptionalFileInfo();
    }
  }

  getOptionalFileInfo() {
    const itemInfo = store.getState().item.item_info;
    const inner_path = "merged-" + store.getState().config.merger_name + "/" + itemInfo.cluster_id + "/data/users/" + itemInfo.channel_address.split('_')[1] + "/" + itemInfo.file_name;
    Page.cmd("optionalFileInfo", inner_path, function (res) {
      store.dispatch(setFileInfo(res));
      this.setState({ loading: false });
    }.bind(this));
  }

  handleDeleteItemClick(fileInfo, item) {
    const user_settings = store.getState().user_settings;
    if (!user_settings.deleted_items) {
      user_settings.deleted_items = [];
    }

    const fileAddress = "merged-" + this.props.config.merger_name + "/" + item.cluster_id + "/" + fileInfo.inner_path;
    const deleted_item = {
      item_id: item.item_id,
      fileAddress: fileAddress
    };
    user_settings.deleted_items.push(deleted_item);
    // set local storage
    Page.cmd("userSetSettings", { settings: user_settings }, function (res) {
      // delete optional file
      Page.cmd("optionalFileDelete", fileAddress, function (res) {
        Page.cmd("optionalFileDelete", fileAddress + ".piecemap.msgpack", function (res) {
          window.top.location.href = "index.html";
        });
      });
    });
  }

  handleApproveRedownloadClick() {
    const item = store.getState().item.item_info;
    let user_settings = store.getState().user_settings;
    user_settings = window.itemHelpers.removeItemFromDeletedItems(item, user_settings);
    Page.cmd("userSetSettings", { settings: user_settings }, function (res) {
      window.top.location.href = "index.html?view:item+id:" + item.item_id + "+type:" + item.item_type;
    });
  }

  handleGoBackClick() {
    window.top.location.href = "index.html";
  }

  render() {

    if (this.state.loading === false) {
      if (this.state.deleted === true) {
        return React.createElement(
          'section',
          { id: 'item-view', className: 'viewport' },
          React.createElement(
            'div',
            { id: 'item-redownload-form' },
            React.createElement(
              'div',
              { className: 'form' },
              React.createElement(
                'div',
                { className: 'ui icon header' },
                React.createElement('i', { className: 'trash icon' }),
                'File(s) Deleted'
              ),
              React.createElement(
                'div',
                { className: 'content' },
                React.createElement(
                  'p',
                  null,
                  'are you sure you want to redownload the file(s) again?'
                )
              ),
              React.createElement(
                'div',
                { className: 'actions' },
                React.createElement(
                  'div',
                  { className: 'ui red basic cancel inverted button', onClick: this.handleGoBackClick },
                  React.createElement('i', { className: 'remove icon' }),
                  'No'
                ),
                React.createElement(
                  'div',
                  { className: 'ui green ok inverted button', onClick: this.handleApproveRedownloadClick },
                  React.createElement('i', { className: 'checkmark icon' }),
                  'Yes'
                )
              )
            )
          ),
          React.createElement(ItemViewContainer, {
            user: this.props.user,
            page: this.props.page,
            config: this.props.config,
            moderations: this.props.moderations,
            item: this.state.item,
            fileInfo: this.state.file_info,
            onDeleteItem: this.handleDeleteItemClick
          })
        );
      } else {
        return React.createElement(
          'section',
          { id: 'item-view', className: 'viewport' },
          React.createElement(ItemMediaPlayerContainer, {
            page: this.props.page,
            config: this.props.config,
            item: this.state.item,
            fileInfo: this.state.file_info
          }),
          React.createElement(ItemViewContainer, {
            user: this.props.user,
            page: this.props.page,
            config: this.props.config,
            moderations: this.props.moderations,
            item: this.state.item,
            fileInfo: this.state.file_info,
            onDeleteItem: this.handleDeleteItemClick
          })
        );
      }
    } else {
      return React.createElement(LoadingContainer, { msg: 'loading item' });
    }
  }
}

class ItemMediaPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initFileDownload = this.initFileDownload.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.downloadFailed = this.downloadFailed.bind(this);
    this.finishDownload = this.finishDownload.bind(this);
    this.handleApproveRedownloadClick = this.handleApproveRedownloadClick.bind(this);
  }

  componentDidMount() {
    this.initFileDownload();
  }

  initFileDownload() {
    const fileInfo = store.getState().item.file_info;
    if (fileInfo) {
      // check if file is fully downloaded
      if (fileInfo.bytes_downloaded === fileInfo.size || fileInfo.uploaded > 0) {
        // file is fully downloaded, finish loading item
        this.finishDownload();
      } else {
        const isDeleted = window.itemHelpers.checkIfItemIsDeleted(this.props.item, store.getState().user_settings);
        if (isDeleted && fileInfo.is_downloaded === 0) {
          this.setState({ loading: false, deleted: true, redownload: false });
        } else {
          this.downloadFile();
        }
      }
    } else {
      this.downloadFailed();
    }
  }

  finishDownload() {
    // console.log('finish download');
  }

  downloadFile() {
    // console.log('download file')
    const item = store.getState().item;
    const inner_path = "merged-" + store.getState().config.merger_name + "/" + item.item_info.cluster_id + "/" + item.file_info.inner_path;
    // Page.cmd("fileNeed", inner_path + "|all");
    Page.cmd("fileNeed", inner_path, function (res) {
      // console.log('file need');
      const th = this;
      Page.onRequest = function (cmd, message) {
        // console.log('on request');
        const filePath = item.file_info.inner_path;
        let msgInfo, eventPath, fileChunk;
        // console.log(message.event);
        if (message.event && message.event.length > 0) {
          if (message.event[0]) msgInfo = message.event[0];
          if (message.event[1]) eventPath = message.event[1];
          if (eventPath) {
            if (eventPath.indexOf('|') > -1) {
              fileChunk = eventPath.split('|')[1];
              eventPath = eventPath.split('|')[0];
            }
          }
          // console.log(cmd);
          if (cmd === "setSiteInfo" && eventPath === filePath) {
            if (msgInfo === "file_failed") {
              // th.updateFilePiecesInfo(fileChunk,msgInfo);
              store.dispatch(fileDownloadFailed());
            } else {
              Page.cmd("optionalFileInfo", inner_path, function (res) {
                // console.log('what the fuck');
                store.dispatch(setFileInfo(res));
              }.bind(th));
            }
          }
        }
      };
    }.bind(this));
  }

  downloadFailed() {
    console.log("download failed");
  }

  handleApproveRedownloadClick() {
    this.setState({ redownload: true }, function () {
      this.downloadFile();
    });
  }

  render() {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.file_name;
    let poster_path;
    if (this.props.item.poster_file) {
      poster_path = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.poster_file;
    }

    let itemMediaPlayer, ItemFileInfoDownloadBarDisplay;
    if (this.state.deleted === true && this.state.redownload === false) {
      itemMediaPlayer = React.createElement(ItemMediaPlayerFileDeletedDisplay, {
        onApproveRedownloadClick: this.handleApproveRedownloadClick
      });
    } else {
      ItemFileInfoDownloadBarDisplay = React.createElement(ItemFileInfoDownloadBarWrapper, null);
      if (this.props.item.content_type === 'audio' || 'video') {
        itemMediaPlayer = React.createElement(AVPlayer, {
          innerPath: inner_path,
          posterPath: poster_path,
          item: this.props.item,
          fileInfo: this.props.fileInfo
        });
      }
      if (this.props.item.content_type === 'book' || this.props.item.file_type === 'pdf') {
        itemMediaPlayer = React.createElement(BookReader, {
          page: this.props.page,
          innerPath: inner_path,
          posterPath: poster_path,
          item: this.props.item,
          fileInfo: this.props.fileInfo
        });
      }
      if (this.props.item.content_type === 'image') {
        itemMediaPlayer = React.createElement(ImageViewer, {
          innerPath: inner_path,
          item: this.props.item,
          fileInfo: this.props.fileInfo
        });
      }
      if (this.props.item.content_type === 'game') {
        itemMediaPlayer = React.createElement(GameEmulatorContainer, {
          page: this.props.page,
          innerPath: inner_path,
          item: this.props.item,
          fileInfo: this.props.fileInfo
        });
      }
      if (this.props.item.content_type === 'archive') {
        itemMediaPlayer = React.createElement(ArchiveViewerWrapper, {
          page: this.props.page,
          innerPath: inner_path,
          item: this.props.item,
          fileInfo: this.props.fileInfo
        });
      }
    }

    if (this.state.loading) {
      return React.createElement(
        'div',
        { id: 'item-media-player-container', className: 'ui inverted' },
        React.createElement(LoadingContainer, {
          inverted: true,
          msg: 'loading content'
        })
      );
    } else {

      return React.createElement(
        'div',
        { id: 'item-media-player-container' },
        itemMediaPlayer,
        ItemFileInfoDownloadBarDisplay
      );
    }
  }
}

class ItemMediaPlayerFileDeletedDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(
      'div',
      { id: 'item-media-player-container', className: 'ui inverted' },
      React.createElement(
        'div',
        { id: 'authorize-redownload-form' },
        React.createElement(
          'div',
          { className: 'form ui basic' },
          React.createElement(
            'div',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'trash icon' }),
            ' File(s) deleted'
          ),
          React.createElement(
            'p',
            null,
            'Are you sure you want to redownload this file(s)?'
          ),
          React.createElement(
            'div',
            { onClick: this.props.onApproveRedownloadClick, className: 'ui green ok inverted button' },
            React.createElement('i', { className: 'checkmark icon' }),
            'Yes'
          )
        )
      )
    );
  }
}

class ItemViewContainer extends React.Component {
  render() {
    return React.createElement(
      'div',
      { id: 'item-view-container', className: 'ui container grid' },
      React.createElement(
        'div',
        { id: 'item-view-container-left', className: 'sixteen wide phone ten wide tablet eleven wide computer column' },
        React.createElement(ItemDetailsContainerWrapper, {
          user: this.props.user,
          page: this.props.page,
          config: this.props.config,
          onDeleteItem: this.props.onDeleteItem
        }),
        React.createElement(
          'div',
          { id: 'item-comments-container' },
          React.createElement(CommentsContainer, {
            user: this.props.user,
            item: this.props.item,
            page: this.props.page,
            config: this.props.config,
            moderations: this.props.moderations
          })
        )
      ),
      React.createElement(
        'div',
        { id: 'item-view-container-right', className: 'sixteen wide phone six wide tablet five wide computer column' },
        React.createElement(ItemRelatedItemList, {
          config: this.props.config,
          moderations: this.props.moderations,
          item: this.props.item })
      )
    );
  }
}

class ItemFileInfoDownloadBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      piecesInfo: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.fileInfo.downloaded_percent);
  }

  render() {
    // start check up
    let downloadInformationTextDisplay,
        greenBarWidth,
        yellowBarWidth,
        redBarWidth = '0%';
    if (this.props.fileInfo) {

      downloadInformationTextDisplay = React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          null,
          ' Fetching file piecemap information '
        ),
        React.createElement('div', { className: 'ui active mini inline loader' })
      );
      if (this.props.fileInfo.downloaded_percent) {
        greenBarWidth = this.props.fileInfo.downloaded_percent + '%';
        yellowBarWidth = 100 - this.props.fileInfo.downloaded_percent + '%';
        if (this.props.fileInfo.downloaded_percent === 100) {
          downloadInformationTextDisplay = "Download finished!";
        } else {
          downloadInformationTextDisplay = "Downloading " + this.props.fileInfo.downloaded_percent + "%";
        }
      } else {
        downloadInformationTextDisplay = 'File piecemap fetched! Initiating...';
        greenBarWidth = '0%';
        yellowBarWidth = '100%';
        if (this.props.fileInfo.is_downloaded === 1) {
          greenBarWidth = '100%';
          yellowBarWidth = '0%';
          downloadInformationTextDisplay = 'Download finished!';
        }
      }
    } else {
      downloadInformationTextDisplay = "Download failed, File piecemap information could not be retrieved.";
      redBarWidth = '100%';
      greenBarWidth = '0%';
      yellowBarWidth = '0%';
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'fetching-piecemap-information' },
        downloadInformationTextDisplay
      ),
      React.createElement(
        'div',
        { id: 'item-file-piece-download-info-container', className: "" },
        React.createElement(
          'div',
          { style: { width: greenBarWidth, 'overflow': 'hidden' }, className: 'piece success' },
          React.createElement(
            'div',
            { className: 'ui progress success' },
            React.createElement(
              'div',
              { className: 'bar' },
              React.createElement('div', { className: 'progress' })
            )
          )
        ),
        React.createElement(
          'div',
          { style: { width: yellowBarWidth, 'overflow': 'hidden' }, className: 'piece active' },
          React.createElement(
            'div',
            { className: 'ui progress active' },
            React.createElement(
              'div',
              { className: 'bar' },
              React.createElement('div', { className: 'progress' })
            )
          )
        ),
        React.createElement(
          'div',
          { style: { width: redBarWidth, 'overflow': 'hidden' }, className: 'piece active' },
          React.createElement(
            'div',
            { className: 'ui progress error' },
            React.createElement(
              'div',
              { className: 'bar' },
              React.createElement('div', { className: 'progress' })
            )
          )
        )
      )
    );
  }
}

const mapStateToItemFileInfoDownloadBar = state => {
  const fileInfo = state.item.file_info;
  const item = state.item.item_info;
  const download_failed = state.item.download_failed;
  return {
    fileInfo,
    item,
    download_failed
  };
};

const mapDispatchToItemFileInfoDownloadBar = dispatch => {
  return {
    dispatch
  };
};

const ItemFileInfoDownloadBarWrapper = ReactRedux.connect(mapStateToItemFileInfoDownloadBar, mapDispatchToItemFileInfoDownloadBar)(ItemFileInfoDownloadBar);

class ItemFileInfoDownloadBarPiece extends React.Component {
  render() {
    const pieceWidth = 100 / this.props.piecesLength;
    let containerClass = "ui progress ";
    if (this.props.piece.state === 'complete') containerClass += " success";else if (this.props.piece.state === 'downloading') containerClass += " active";else if (this.props.piece.state === 'failed') containerClass += "error";

    return React.createElement(
      'div',
      { style: { width: pieceWidth + '%' }, className: "piece " + this.props.piece.state },
      React.createElement(
        'div',
        { className: containerClass },
        React.createElement(
          'div',
          { className: 'bar' },
          React.createElement('div', { className: 'progress' })
        )
      )
    );
  }
}

class ItemDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onDeleteItem() {
    this.props.onDeleteItem(this.props.fileInfo, this.props.item);
  }

  render() {

    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);
    const dlLink = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.file_name;

    let downloadElement;
    if (this.props.fileInfo && this.props.fileInfo.is_downloaded) {
      if (this.props.fileInfo.downloaded_percent && this.props.fileInfo.downloaded_percent < 100) {
        // console.log('not 100%');
      } else {
        downloadElement = React.createElement(
          'a',
          { id: 'item-download-link', href: dlLink, download: this.props.item.file_name },
          React.createElement('i', { className: 'download icon' }),
          'download ',
          this.props.item.content_type
        );
      }
    }

    let peerCount = "?",
        leechersSeedersDisplay;
    if (this.props.fileInfo) {
      peerCount = this.props.fileInfo.peer;
      let leechCount = this.props.fileInfo.peer_leech,
          seedCount = this.props.fileInfo.peer_seed;
      if (!leechCount) leechCount = "0";
      if (!seedCount) seedCount = "0";
      leechersSeedersDisplay = React.createElement(
        'span',
        null,
        React.createElement(
          'small',
          null,
          "" + leechCount + " Leech / " + seedCount + " Seed"
        ),
        React.createElement(
          'small',
          null,
          'Online'
        )
      );
    }

    let channelImageSource;
    if (this.props.item.logo_file) {
      const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.logo_file;

      const user_settings = store.getState().user_settings;
      const isDeleted = window.itemHelpers.checkIfImageIsDeleted(imagePath, user_settings);

      if (isDeleted) {
        channelImageSource = "assets/img/x-avatar.png";
      } else {
        channelImageSource = imagePath;
      }
    } else {
      channelImageSource = "assets/img/x-avatar.png";
    }
    const channelImageElement = React.createElement('img', { className: 'avatar', src: channelImageSource });

    let fileChunkInformation;
    if (this.props.fileInfo && this.props.fileInfo.downloaded_percent) {
      fileChunkInformation = this.props.fileInfo.downloaded_percent + "%";
    } else if (this.props.fileInfo && !this.props.fileInfo.downloaded_percent) {
      fileChunkInformation = "0";
    } else {
      if (this.props.fileInfo && !this.props.fileInfo.pieces && this.props.fileInfo.bytes_downloaded) {
        fileChunkInformation = "single file";
      } else {
        fileChunkInformation = "0";
      }
    }
    const fileProgressInformation = React.createElement(
      'div',
      null,
      React.createElement(
        'b',
        null,
        'downloaded percent: '
      ),
      ' ',
      fileChunkInformation
    );

    return React.createElement(
      'div',
      { id: 'item-details-container' },
      React.createElement(
        'div',
        { id: 'item-details-top', className: 'item-details-row' },
        React.createElement(
          'h1',
          null,
          this.props.item.title
        ),
        React.createElement(
          'div',
          { className: 'floated author channel-info-container' },
          channelImageElement,
          React.createElement(
            'a',
            { href: 'index.html?view:channel+id:' + this.props.item.channel_address },
            this.props.item.channel_name
          )
        ),
        React.createElement(
          'div',
          { id: 'item-peer-count' },
          React.createElement(
            'h4',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'users icon' }),
            React.createElement(
              'span',
              null,
              peerCount,
              ' peers'
            ),
            leechersSeedersDisplay
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'item-details-row', id: 'item-details-mid' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'b',
            null,
            'size:'
          ),
          ' ',
          fileSize
        ),
        fileProgressInformation,
        React.createElement(
          'div',
          null,
          React.createElement(
            'b',
            null,
            'date added:'
          ),
          ' ',
          timeAgo
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'b',
            null,
            'file name:'
          ),
          ' ',
          this.props.item.file_name
        ),
        React.createElement(ItemVotesContainer, {
          config: this.props.config,
          user: this.props.user,
          page: this.props.page,
          item: this.props.item,
          onDeleteItem: this.onDeleteItem
        }),
        downloadElement
      ),
      React.createElement(
        'div',
        { className: 'item-details-row' },
        this.props.item.description
      ),
      React.createElement(
        'div',
        { className: 'item-details-row' },
        React.createElement(ItemEmbedCode, {
          dlLink: dlLink
        })
      )
    );
  }
}

const mapStateToItemDetailsContainerProps = state => {
  const chunks_info = state.chunks_info;
  const fileInfo = state.item.file_info;
  const item = state.item.item_info;
  const user = state.user;
  return {
    chunks_info,
    fileInfo,
    item,
    user
  };
};

const mapDispatchToItemDetailsContainerProps = dispatch => {
  return {
    dispatch
  };
};

const ItemDetailsContainerWrapper = ReactRedux.connect(mapStateToItemDetailsContainerProps, mapDispatchToItemDetailsContainerProps)(ItemDetailsContainer);

class ItemVotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up_votes: [],
      down_votes: [],
      up_voted: '',
      down_voted: ''
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

  getItemVotes() {
    const query = "SELECT * FROM vote WHERE vote.item_id='" + this.props.item.item_id + "'";
    Page.cmd("dbQuery", [query], function (res) {
      this.renderItemVotes(res);
    }.bind(this));
  }

  renderItemVotes(res) {
    if (res) {
      let down_votes = [];
      let up_votes = [];
      let up_voted, down_voted;
      const cert_user_id = store.getState().site_info.cert_user_id;
      res.forEach(function (vote, index) {
        if (vote.vote === 1) {
          up_votes.push(vote);
          if (vote.user_id === cert_user_id) up_voted = true;
        } else {
          down_votes.push(vote);
          if (vote.user_id === cert_user_id) down_voted = true;
        }
      });
      this.setState({
        up_votes: up_votes,
        down_votes: down_votes,
        up_voted: up_voted,
        down_voted: down_voted,
        loading: false
      });
    }
  }

  handleUpVoteClick() {
    const vote_type = "up";
    this.onVoteItem(vote_type);
  }

  handleDownVoteClick() {
    const vote_type = "down";
    this.onVoteItem(vote_type);
  }

  onVoteItem(vote_type) {
    this.setState({
      loading: true
    }, function () {
      if (vote_type === "up") {
        if (this.state.up_voted) vote_type = "delete";else if (this.state.down_voted) vote_type = "change";
      } else if (vote_type === "down") {
        if (this.state.up_voted) vote_type = "change";else if (this.state.down_voted) vote_type = "delete";
      }
      this.voteItem(vote_type);
    });
  }

  voteItem(vote_type) {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.user.cluster + "/data/users/" + this.props.user.user_auth_address + "/data.json";
    Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
      const votes = this.state.up_votes.concat(this.state.down_votes);
      data = voteHelpers.renderDataOnItemVote(data, this.props.item, votes, vote_type, this.props.user.user_name);
      const action = 'vote';
      data = appHelpers.renderDataOnNotificaion(data, this.props.user, this.props.item, action, vote_type);
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
          this.getItemVotes();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  render() {

    let votingsContainerDisplay, containerCssClass;
    if (this.props.user && this.props.user.user_name) {
      votingsContainerDisplay = React.createElement(
        'div',
        { className: 'ui menu secondary' },
        React.createElement(
          'a',
          { className: 'item up-votes', onClick: this.handleUpVoteClick },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'thumbs outline up icon green' }),
            React.createElement(
              'span',
              { className: 'green' },
              this.state.up_votes.length
            )
          )
        ),
        React.createElement(
          'a',
          { className: 'item down-votes', onClick: this.handleDownVoteClick },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'thumbs outline down icon red' }),
            React.createElement(
              'span',
              { className: 'red' },
              this.state.down_votes.length
            )
          )
        )
      );
    } else {
      votingsContainerDisplay = React.createElement(
        'div',
        { className: 'ui menu secondary' },
        React.createElement(
          'a',
          { className: 'item up-votes' },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'thumbs outline up icon grey' }),
            React.createElement(
              'span',
              { className: 'grey' },
              this.state.up_votes.length
            )
          )
        ),
        React.createElement(
          'a',
          { className: 'item down-votes' },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'thumbs outline down icon grey' }),
            React.createElement(
              'span',
              { className: 'grey' },
              this.state.down_votes.length
            )
          )
        )
      );
    }

    return React.createElement(
      'div',
      { id: 'item-votes-container', className: this.state.loading ? "ui segment loading" : "ui segment" },
      votingsContainerDisplay,
      React.createElement(
        'div',
        { className: 'ui menu secondary', id: 'delete-optional-file-menu' },
        React.createElement(
          'a',
          { className: 'item delete-optional-file', onClick: this.props.onDeleteItem },
          React.createElement(
            'h6',
            { className: 'ui icon header' },
            React.createElement('i', { className: 'trash outline up icon red' }),
            React.createElement(
              'span',
              null,
              'Delete'
            )
          )
        )
      )
    );
  }
}

class ItemEmbedCode extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const target = document.getElementById("item-embed-code");
    target.select();
    document.execCommand('copy');
  }

  render() {
    return React.createElement(
      'div',
      { id: 'item-embed-container', className: 'ui form' },
      React.createElement(
        'div',
        { className: 'field' },
        React.createElement(
          'h3',
          null,
          'Embed Code'
        ),
        React.createElement('textarea', {
          id: 'item-embed-code',
          onClick: this.handleClick,
          value: this.props.dlLink,
          readOnly: true,
          rows: '3' }),
        React.createElement(
          'button',
          { className: 'ui button primary',
            onClick: this.handleClick },
          'Copy'
        )
      )
    );
  }
}

class ItemRelatedItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      items_per_query: 4
    };
    this.getRelatedItems = this.getRelatedItems.bind(this);
    this.finishLoadingRelatedItems = this.finishLoadingRelatedItems.bind(this);
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  getRelatedItems() {
    const moderations = store.getState().moderations;
    let items = [],
        itemsId = [];
    if (this.state.items) items = this.state.items;
    if (this.state.itemsId) itemsId = this.state.itemsId;
    const query = itemHelpers.getRelatedItemsByFileTypeQuery(this.props.item, this.state.items_per_query, itemsId, moderations);
    Page.cmd("dbQuery", [query], function (res) {
      items = items.concat(res);
      itemsId = itemHelpers.getItemsIdArray(items);
      let items_per_query = this.state.items_per_query + (this.state.items_per_query - res.length);
      const query = itemHelpers.getRelatedItemsByContentTypeQuery(this.props.item, items_per_query, itemsId, moderations);
      Page.cmd("dbQuery", [query], function (res) {
        items = items.concat(res);
        itemsId = itemHelpers.getItemsIdArray(items);
        items_per_query = items_per_query + (items_per_query - res.length);
        const query = itemHelpers.getRelatedItemsByChannel(this.props.item, items_per_query, itemsId, moderations);
        Page.cmd("dbQuery", [query], function (res) {
          items = items.concat(res);
          itemsId = itemHelpers.getItemsIdArray(items);
          let titleChunksArray;
          if (this.props.item.title.indexOf(' ') > -1) {
            titleChunksArray = this.props.item.title.split(' ');
          } else {
            if (this.props.item.title.indexOf('_') > -1) {
              titleChunksArray = this.props.item.title.split('_');
            }
          }
          const query = itemHelpers.getRelatedItemsByTitle(this.props.item, items_per_query, itemsId, titleChunksArray, moderations);
          Page.cmd("dbQuery", [query], function (res) {
            items = items.concat(res);
            itemsId = itemHelpers.getItemsIdArray(items);
            items = appHelpers.shuffleArray(items);
            this.finishLoadingRelatedItems(items, itemsId);
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  finishLoadingRelatedItems(items, itemsId) {
    this.setState({ items: items, itemsId: itemsId });
  }

  render() {
    const relatedItems = this.state.items.map((related_item, i) => React.createElement(RelatedItem, {
      key: this.props.item + i,
      item: related_item,
      config: this.props.config
    }));
    return React.createElement(
      'div',
      { id: 'related-item-list', className: 'ui relaxed divided list' },
      relatedItems,
      React.createElement(
        'a',
        { id: 'show-more-btn', onClick: this.getRelatedItems },
        'Show More'
      )
    );
  }
}

class RelatedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_info: {}
    };
    this.getOptionalFileInfo = this.getOptionalFileInfo.bind(this);
  }

  componentDidMount() {
    this.getOptionalFileInfo();
  }

  getOptionalFileInfo() {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.file_name;
    Page.cmd("optionalFileInfo", inner_path, function (res) {
      const fileInfo = appHelpers.configureOptionalFileStatus(res, this.props.item.title);
      if (this.props.item.poster_file) {
        const posterInnerPath = "merged-" + this.props.config.merger_name + "/" + this.props.item.cluster_id + "/data/users/" + this.props.item.channel_address.split('_')[1] + "/" + this.props.item.poster_file;
        Page.cmd("optionalFileInfo", posterInnerPath, function (res) {
          const posterFileInfo = appHelpers.configureOptionalFileStatus(res);
          this.setState({
            poster_file_info: posterFileInfo,
            poster_inner_path: posterInnerPath,
            file_info: fileInfo,
            inner_path: inner_path
          });
        }.bind(this));
      } else {
        this.setState({
          file_info: fileInfo,
          inner_path: inner_path
        });
      }
    }.bind(this));
  }

  render() {

    const iconClass = itemHelpers.getContentTypeIconClass(this.props.item.content_type);
    const itemLink = "index.html?view:item+id:" + this.props.item.item_id + "+type:" + this.props.item.content_type;
    let listItemImageContainer = React.createElement(
      'div',
      { className: 'list-item-image-container default-image' },
      React.createElement(
        'a',
        { href: itemLink },
        React.createElement('i', { className: iconClass + " icon" })
      )
    );
    if (this.state.file_info && this.props.item.content_type === 'image' || this.state.poster_file_info) {
      const user_settings = store.getState().user_settings;
      const imageIsDeleted = window.itemHelpers.checkIfImageIsDeleted(this.state.inner_path, user_settings);
      if (!imageIsDeleted) {
        listItemImageContainer = React.createElement(ListItemImageContainer, {
          config: this.props.config,
          item: this.props.item,
          fileInfo: this.state.file_info,
          innerPath: this.state.inner_path,
          posterFileInfo: this.state.poster_file_info,
          posterInnerPath: this.state.poster_inner_path
        });
      }
    }

    const timeAgo = appHelpers.getTimeAgo(this.props.item.date_added);
    const fileSize = appHelpers.getFileSize(this.props.item.file_size);

    let itemListItemCssClass = "related-list-item item";
    const isDeleted = window.itemHelpers.checkIfItemIsDeleted(this.props.item, store.getState().local_storage);
    if (isDeleted) {
      itemListItemCssClass += " deleted";
    } else {
      if (this.state.file_info) {
        if (this.state.file_info.pieces && this.state.file_info.pieces === this.state.file_info.pieces_downloaded || this.state.file_info.bytes_downloaded === this.state.file_info.size || this.state.file_info.uploaded || this.state.file_info.size < 1000000 && this.state.file_info.is_downloaded === 1) {
          itemListItemCssClass += " cached";
        }
      }
    }

    return React.createElement(
      'div',
      { className: itemListItemCssClass },
      listItemImageContainer,
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'a',
          { className: 'header', href: itemLink },
          this.props.item.title
        ),
        React.createElement(
          'div',
          { className: 'description' },
          React.createElement(
            'div',
            null,
            this.props.item.channel_name
          ),
          React.createElement(
            'div',
            null,
            timeAgo,
            ' | ',
            fileSize
          )
        )
      )
    );
  }
}
class AVPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*const defaultVolume = 0.25;
    videojs('video-player', {}, function() {
      this.volume(defaultVolume);
    });*/
    var vid = document.getElementById("video-player");
    vid.volume = 0.2;
  }

  render() {

    return React.createElement(
      "video",
      {
        id: "video-player",
        className: "video-js",
        controls: true,
        autoPlay: true,
        preload: "auto",
        width: "640",
        height: "264",
        poster: this.props.posterPath },
      React.createElement("source", {
        src: this.props.innerPath,
        type: this.props.item.content_type + '/' + this.props.item.file_type
      }),
      React.createElement(
        "p",
        { className: "vjs-no-js" },
        "To view this video please enable JavaScript, and consider upgrading to a web browser that",
        React.createElement(
          "a",
          { href: "http://videojs.com/html5-video-support/", target: "_blank" },
          "supports HTML5 video"
        )
      )
    );
  }
}

class ImageViewer extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "image-viewer" },
      React.createElement("img", { src: this.props.innerPath })
    );
  }
}

class BookReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  componentDidMount() {

    Page.cmd("wrapperGetAjaxKey", [], function (res) {
      const innerPath = this.props.innerPath + "?ajax_key=" + res;
      $.ajax(innerPath).done(function (res) {
        // console.log("File size: " + res.length);
      });
    }.bind(this));
  }

  render() {
    return React.createElement(
      "div",
      { id: "book-reader-container" },
      React.createElement(
        "div",
        { className: "ui container", id: "book-reader" },
        React.createElement(
          "div",
          { className: "ui segment inverted centered compact" },
          React.createElement(
            "h2",
            null,
            "No Preview Available"
          )
        ),
        React.createElement("div", { id: "book-container" })
      )
    );
  }
}

class GameEmulatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.initGameEmulator = this.initGameEmulator.bind(this);
  }

  componentDidMount() {
    this.initGameEmulator();
  }

  initGameEmulator() {
    if (this.props.item.file_type === 'zip') {
      Page.cmd('fileList', { inner_path: this.props.innerPath }, function (res) {
        let innerFile, emulatorType;
        res.map((fileName, i) => {
          const index = fileName.lastIndexOf('.');
          const fileType = fileName.slice(index + 1);
          const eType = emulatorHelpers.getEmulatorTypeByFileType(fileType);
          if (eType) {
            emulatorType = eType;
            innerFile = fileName;
          }
        });
        this.setState({
          loading: false,
          emulatorType: emulatorType,
          innerFile: innerFile
        });
      }.bind(this));
    } else {
      const emulatorType = emulatorHelpers.getEmulatorTypeByFileType(this.props.item.file_type);
      this.setState({
        loading: false,
        emulatorType: emulatorType
      });
    }
  }

  render() {
    let emulator;
    if (!this.state.loading) {
      const emulatorType = this.state.emulatorType;
      if (emulatorType === 'nes') {
        emulator = React.createElement(NesEmulator, {
          item: this.props.item,
          innerPath: this.props.innerPath,
          innerFile: this.state.innerFile
        });
      } else if (emulatorType === 'atari') {
        emulator = React.createElement(AtariEmulator, {
          page: this.props.page,
          item: this.props.item,
          innerPath: this.props.innerPath,
          innerFile: this.state.innerFile
        });
      } else if (emulatorType === 'amstrad') {
        emulator = React.createElement(AmstradEmulator, {
          page: this.props.page,
          item: this.props.item,
          innerPath: this.props.innerPath,
          innerFile: this.state.innerFile
        });
      } else if (emulatorType === 'dos') {
        emulator = React.createElement(DosEmulator, {
          page: this.props.page,
          item: this.props.item,
          innerPath: this.props.innerPath,
          innerFile: this.state.innerFile
        });
      }
    }
    return React.createElement(
      "div",
      { id: "game-emulators-container" },
      emulator
    );
  }
}

class ArchiveViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.initArchiveViewer = this.initArchiveViewer.bind(this);
  }

  componentDidMount() {
    if (this.props.item) {
      this.initArchiveViewer();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.initArchiveViewer();
  }

  initArchiveViewer() {
    // console.log('archive viewer');
    // console.log(this.props);
    Page.cmd("fileNeed", this.props.innerPath + "|all", function (res) {
      // console.log(res);
      Page.onRequest = function (cmd, message) {
        // console.log(cmd);
        // console.log(message);
      };
    }.bind(this));
    /*  const fileInfo = this.props.item.file_info;
      if (fileInfo){
        if ( fileInfo.pieces_downloaded === fileInfo.pieces ||
            !fileInfo.pieces && fileInfo.is_downloaded){
          Page.cmd('fileList',{inner_path:this.props.innerPath},function(res){
            const fileList = [];
            res.forEach(function(f,i){
              const index = f.lastIndexOf('.');
              const fileName = f.slice(0, index);
              const fileType = f.split(fileName)[1];
              const file = {
                name:fileName,
                type:fileType
              }
              fileList.push(file);
            });
            this.setState({fileList:fileList,downloading:false,loading:false});
          }.bind(this));
        } else {
          this.setState({downloading:true,loading:false});
        }
      }*/
  }

  render() {
    let archiveDisplay;
    if (this.state.loading === true) {
      archiveDisplay = React.createElement(
        "p",
        null,
        "loading"
      );
    } else if (this.state.downloading === true) {
      archiveDisplay = React.createElement(
        "div",
        { className: "loading-archive-container" },
        React.createElement("i", { className: "archive icon" }),
        React.createElement("i", { className: "cloud download icon" })
      );
    } else {
      const fileList = this.state.fileList.map((f, index) => React.createElement(
        "li",
        { key: index },
        React.createElement(
          "span",
          null,
          f.name,
          f.type
        )
      ));
      archiveDisplay = React.createElement(
        "div",
        { className: "archive-display" },
        React.createElement(
          "ul",
          null,
          fileList
        )
      );
    }
    return React.createElement(
      "div",
      { id: "archive-view-container" },
      archiveDisplay
    );
  }
}

const mapStateToArchiveViewProps = state => {
  const item = state.item;
  const chunks_info = state.chunks_info;
  return {
    item,
    chunks_info
  };
};

const mapDispatchToArchiveViewProps = dispatch => {
  return {
    dispatch
  };
};

const ArchiveViewerWrapper = ReactRedux.connect(mapStateToArchiveViewProps, mapDispatchToArchiveViewProps)(ArchiveViewer);
window.moderationHelpers = function () {
  function renderModerations(res) {
    moderations = {
      users: [],
      channels: [],
      items: []
    };
    res.forEach(function (mod, index) {
      if (mod.hide === 1) {
        if (mod.moderation_type === 'user_channels') moderations.users.push(mod);else if (mod.moderation_type === 'channel') moderations.channels.push(mod);else if (mod.moderation_type === 'item') moderations.items.push(mod);
      }
    }.bind(this));
    return moderations;
  }
  return {
    renderModerations
  };
}();
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.pagination.numPages > 1) {

      let start, end;
      const pagesCutOff = 11;
      const ceiling = Math.ceil(pagesCutOff / 2);
      const floor = Math.floor(pagesCutOff / 2);
      const numPages = this.props.pagination.numPages;
      const currentPage = this.props.pagination.currentPage;
      if (numPages < pagesCutOff) {
        start = 0;
        end = numPages;
      } else if (currentPage >= 1 && currentPage <= ceiling) {
        start = 0;
        end = pagesCutOff;
      } else if (currentPage + floor >= numPages) {
        start = numPages - pagesCutOff;
        end = numPages;
      } else {
        start = currentPage - ceiling;
        end = currentPage + floor;
      }

      let pages = ['first', 'previous'];
      for (var i = start; i < end; i++) {
        pages.push(i);
      }

      pages.push('next', 'last');
      this.setState({ pages: pages });
    }
  }

  render() {
    if (this.state.pages) {
      const pagination = this.state.pages.map((page, i) => React.createElement(PaginationButton, {
        key: i,
        page: page,
        pagination: this.props.pagination,
        onPaginationButtonClick: this.props.onPaginationButtonClick
      }));
      return React.createElement(
        'div',
        { id: 'pagination-menu-container', className: 'ui centered grid' },
        React.createElement(
          'div',
          { id: 'pagination-menu-wrapper', className: 'center aligned column ' },
          React.createElement(
            'div',
            { id: 'pagination-menu', className: 'ui pagination menu' },
            pagination
          )
        )
      );
    } else {
      return React.createElement('div', { id: 'pagination-menu-container', className: 'ui centered grid' });
    }
  }
}

class PaginationButton extends React.Component {

  render() {
    let displayText;
    if (typeof this.props.page === 'string') {
      const iconClass = appHelpers.getPaginationItemIconClass(this.props.page);
      displayText = React.createElement('i', { className: "icon " + iconClass });
    } else {
      displayText = this.props.page + 1;
    }

    const route = store.getState().route;

    let baseHref = "index.html?";

    if (route.view) {
      baseHref += "view:" + route.view;
    } else {
      baseHref += "view:main";
    }

    if (route.id) {
      baseHref += "+id:" + route.id;
    }

    if (route.type) {
      baseHref += "+type:" + route.type;
    }

    if (route.f_type) {
      baseHref += "+f_type:" + route.f_type;
    }

    baseHref += "+page:";

    let buttonHref;
    if (typeof this.props.page === 'string') {
      const hrefPageNumber = appHelpers.getPaginationButtonNumber(this.props.page, this.props.pagination.currentPage, this.props.pagination.numPages);
      buttonHref = baseHref + hrefPageNumber;
    } else {
      buttonHref = baseHref + parseInt(this.props.page + 1);
    }
    return React.createElement(
      'a',
      {
        href: buttonHref,
        className: this.props.page + 1 === this.props.pagination.currentPage ? "item active" : "item"
      },
      displayText
    );
  }
}
class TemplateContainer extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "template-container", className: "ui main" },
      React.createElement(NavBarWrapper, null),
      React.createElement(SideBar, {
        route: this.props.route,
        config: this.props.config,
        sites: this.props.sites
      }),
      React.createElement(
        "div",
        { className: "pusher", id: "main-template" },
        React.createElement(ViewContainer, {
          loading: this.props.loading,
          localStorage: this.props.localStorage,
          sites: this.props.sites,
          route: this.props.route,
          page: this.props.page,
          config: this.props.config,
          moderations: this.props.moderations,
          showModerations: this.props.showModerations,
          user: this.props.user,
          channel: this.props.channel,
          onClusterFileDistributeChange: this.props.onClusterFileDistributeChange,
          onAllFileDistributeChange: this.props.onAllFileDistributeChange
        })
      )
    );
  }
}

class ViewContainer extends React.Component {
  render() {

    if (this.props.route.view === 'main' || this.props.route.view === 'channel' || this.props.route.view === 'search') {
      return React.createElement(MainView, {
        channel: this.props.channel,
        page: this.props.page,
        config: this.props.config,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations
      });
    } else if (this.props.route.view === 'item') {
      return React.createElement(ItemView, {
        page: this.props.page,
        config: this.props.config,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations,
        route: this.props.route,
        user: this.props.user
      });
    } else if (this.props.route.view === 'user' && this.props.user) {
      return React.createElement(UserView, {
        localStorage: this.props.localStorage,
        page: this.props.page,
        config: this.props.config,
        moderations: this.props.moderations,
        route: this.props.route,
        user: this.props.user,
        sites: this.props.sites
      });
    } else if (this.props.route.view === 'clusters') {
      return React.createElement(ClustersView, {
        page: this.props.page,
        config: this.props.config,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations,
        route: this.props.route,
        user: this.props.user,
        sites: this.props.sites,
        onClusterFileDistributeChange: this.props.onClusterFileDistributeChange,
        onAllFileDistributeChange: this.props.onAllFileDistributeChange
      });
    } else if (this.props.route.view === 'admin') {
      return React.createElement(AdminView, {
        page: this.props.page,
        config: this.props.config,
        moderations: this.props.moderations,
        route: this.props.route,
        user: this.props.user
      });
    } else {
      return React.createElement(LoadingContainer, null);
    }
  }
}

class MainView extends React.Component {
  render() {
    let introDiv;
    if (this.props.channel) {
      introDiv = React.createElement(ChannelInfoBox, {
        config: this.props.config,
        channel: this.props.channel
      });
    } else {
      introDiv = React.createElement(
        "div",
        { className: "ui container" },
        React.createElement(
          "div",
          { className: "ui container inverted introduction" },
          React.createElement("img", { src: "assets/img/ifs-logo-title-lg-black.png" })
        )
      );
    }
    return React.createElement(
      "section",
      { className: "viewport", id: "main-view" },
      React.createElement("div", { id: "main-view-page-header" }),
      React.createElement(ItemDashboardWrapper, {
        page: this.props.page,
        config: this.props.config,
        showModerations: this.props.showModerations,
        moderations: this.props.moderations,
        channel: this.props.channel
      })
    );
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: []
    };
    this.renderClusters = this.renderClusters.bind(this);
  }

  componentWillMount() {
    this.renderClusters();
  }

  renderClusters() {
    const clusters = [];
    this.props.config.clusters.forEach(function (cluster, cIndex) {
      for (var site in this.props.sites) {
        if (cluster.cluster_id === site) {
          var c = this.props.sites[site];
          clusters.push(c);
        }
      }
    }.bind(this));
    this.setState({ clusters: clusters });
  }

  render() {
    let clusters;
    if (this.state.clusters) {
      clusters = this.state.clusters.map((cluster, i) => React.createElement(
        "a",
        { className: this.props.route && this.props.route.id === cluster.address ? "item active" : "item",
          key: cluster.address,
          href: 'index.html?view:clusters+id:' + cluster.address },
        cluster.content.title
      ));
    }
    return React.createElement(
      "div",
      { id: "sidebar-container", className: "ui sidebar inverted vertical menu thin" },
      React.createElement(
        "div",
        { className: "ui secondary vertical menu" },
        React.createElement(
          "a",
          { className: this.props.route && !this.props.route.id ? "item active" : "item",
            href: "index.html?view:clusters" },
          "All"
        ),
        clusters
      )
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeAccountClick = this.handleChangeAccountClick.bind(this);
    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.handleToggleSideBarClick = this.handleToggleSideBarClick.bind(this);
    this.onSearchInputKeyPress = this.onSearchInputKeyPress.bind(this);
    this.handleSearchFormChange = this.handleSearchFormChange.bind(this);
    this.onSearchSite = this.onSearchSite.bind(this);
    this.handleUserIconClick = this.handleUserIconClick.bind(this);
  }

  componentDidMount() {
    const route = store.getState().route;
    if (route.view === 'search') {
      this.setState({ searchPhrase: route.id }, function () {
        store.dispatch(setSearchPhrase(this.state.searchPhrase));
      });
    }
  }

  handleChangeAccountClick() {
    this.props.onChangeAccountClick();
  }

  handleCreateAccountClick() {
    this.props.onCreateAccountClick();
  }

  handleToggleSideBarClick() {
    jQuery('.ui.sidebar').sidebar({ context: jQuery('#main-template') }).sidebar('setting', 'transition', 'overlay').sidebar('toggle');
  }

  onSearchInputKeyPress(e) {
    if (e.key === "Enter") {
      this.onSearchSite();
    }
  }

  handleSearchFormChange(e) {
    const searchPhrase = e.target.value;
    this.setState({ searchPhrase: searchPhrase }, function () {
      // console.log(this.state);
    });
  }

  onSearchSite() {
    window.top.location.href = "index.html?view:search+id:" + this.state.searchPhrase.split(' ').join('_');
  }

  handleUserIconClick() {
    const show_user_menu = this.state.show_user_menu ? false : true;
    this.setState({ show_user_menu: show_user_menu });
  }

  render() {
    let placeholder = "Search...";
    if (store.getState().route.view === 'search') {
      placeholder = store.getState().route.id;
    }
    const searchField = React.createElement(
      "div",
      { id: "items-search-form-container", className: "ui centered grid" },
      React.createElement(
        "div",
        { className: "center aligned column", id: "search-form-wrapper" },
        React.createElement(
          "div",
          { className: "ui input", id: "items-search-input" },
          React.createElement(
            "div",
            { className: "wrapper" },
            React.createElement("input", {
              type: "text",
              placeholder: placeholder,
              onChange: this.handleSearchFormChange,
              defaultValue: this.state.searchPhrase,
              onKeyPress: e => this.onSearchInputKeyPress(e)
            }),
            React.createElement(
              "div",
              { className: "ui ok", onClick: this.onSearchSite },
              React.createElement("i", { className: "search icon" })
            )
          )
        )
      )
    );

    return React.createElement(
      "navbar",
      { id: "main-navbar", className: "ui menu inverted" },
      React.createElement(
        "div",
        { id: "navbar-grid", className: "ui grid" },
        React.createElement(
          "div",
          { className: "ui column four wide computer" },
          React.createElement(
            "div",
            { className: "ui secondary menu", id: "main-menu" },
            React.createElement(
              "a",
              {
                onClick: this.handleToggleSideBarClick,
                className: "item",
                id: "toggle-sidebar-link" },
              React.createElement("i", { className: "sidebar icon" })
            ),
            searchField
          )
        ),
        React.createElement(NavBarLogoSection, null),
        React.createElement(
          "div",
          { className: "ui column four wide computer" },
          React.createElement(
            "div",
            { id: "right-side-user-menu" },
            React.createElement(NavBarUserMenuWrapper, null)
          )
        )
      )
    );
  }
}

const mapStateToNavBarProps = state => {
  user = state.user;
  return {
    user
  };
};

const mapDispatchToNavBarProps = dispatch => {
  return {
    dispatch
  };
};

const NavBarWrapper = ReactRedux.connect(mapStateToNavBarProps, mapDispatchToNavBarProps)(NavBar);

class NavBarLogoSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.toggleChannelModeration = this.toggleChannelModeration.bind(this);
  }

  toggleChannelModeration() {
    const config = store.getState().config;
    const user = store.getState().user;
    const inner_path = "merged-" + config.merger_name + "/" + user.cluster + "/data/users/" + user.user_auth_address + "/data.json";

    Page.cmd("fileGet", { "inner_path": inner_path, "required": false }, function (data) {
      if (data) {
        data = JSON.parse(data);
        if (!data.moderation) {
          data.moderation = [];
          data.next_moderation_id = 1;
        }
      } else {
        data = { "next_moderation_id": 1, "moderation": [] };
      }
      console.log(data);
      // moderation
      const moderation = {
        moderation_id: user.user_auth_address + "_mod_" + data.next_moderation_id,
        moderation_type: "channel",
        item_id: store.getState().channel.channel_address,
        hide: 1,
        current: 1,
        date_added: +new Date()
      };
      data.next_moderation_id += 1;
      data.moderation.push(moderation);
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
          // window.top.location.href = "index.html";
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  render() {

    const address = store.getState().site_info.address;
    const config = store.getState().config;
    const channel = store.getState().channel;
    console.log(channel);

    let preText = "INTERGALACTIC",
        postText = "FILE SERVER",
        imgUrl = "assets/img/ifs-logo-lg-white.png",
        logoContainerCssClass = "",
        divContainerCssClass = "";

    if (channel.channel_name) {
      preText = channel.channel_name.toUpperCase();
      postText = "CHANNEL";
      divContainerCssClass = "w-channel";
      logoContainerCssClass = "w-logo";
      imgUrl = "assets/img/x-avatar.png";
      if (channel.logo_file) {
        imgUrl = "merged-" + config.merger_name + "/" + channel.cluster_id + "/data/users/" + channel.channel_address.split('_')[1] + "/" + channel.logo_file;
        const local_storage = store.getState().local_storage;
        const imageIsDeleted = window.itemHelpers.checkIfImageIsDeleted(imgUrl, local_storage);
        if (imageIsDeleted) {
          imgUrl = "assets/img/x-avatar.png";
        }
      }
    }

    let toggleChannelVisibility;
    if (store.getState().site_info.settings.own) toggleChannelVisibility = React.createElement(
      "a",
      { onClick: this.toggleChannelModeration },
      "TOGGLE VISIBLITY"
    );

    return React.createElement(
      "div",
      { id: "navbar-logo-section", className: "ui column eight wide computer " + divContainerCssClass },
      React.createElement(
        "a",
        { id: "logo-element", href: '/' + address, className: logoContainerCssClass },
        React.createElement("img", { src: imgUrl })
      ),
      React.createElement(
        "div",
        { className: "ui grid" },
        React.createElement(
          "div",
          { id: "intergalactic", className: "ui column eight wide computer" },
          React.createElement(
            "a",
            { href: '/' + address },
            preText
          ),
          toggleChannelVisibility
        ),
        React.createElement(
          "div",
          { id: "file-server", className: "ui column eight wide computer" },
          React.createElement(
            "a",
            { href: '/' + address },
            postText
          )
        )
      )
    );
  }
}

class NavBarUserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_menu: false,
      show_moderations: this.props.moderations.show_moderations
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.handleModerationsToggle = this.handleModerationsToggle.bind(this);
    this.handleFaqRulesClick = this.handleFaqRulesClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.showOverwriteAccountModal = this.showOverwriteAccountModal.bind(this);
    this.handleOverwriteAccountClick = this.handleOverwriteAccountClick.bind(this);
    this.createIfsCertificate = this.createIfsCertificate.bind(this);
    this.certSelect = this.certSelect.bind(this);
  }

  toggleDropdownMenu() {
    const show_menu = this.state.show_menu ? false : true;
    this.setState({ show_menu: show_menu }, function () {
      if (show_menu === true) {
        const self = this;
        function onDocumentClick(e) {
          if (!e.target.className.indexOf('user-item-menu') > -1 && e.target.id !== "user-menu-toggle-button" && e.target.id !== "user-menu-toggle-icon") {
            self.toggleDropdownMenu();
            document.removeEventListener('click', onDocumentClick);
          }
        };
        document.addEventListener('click', onDocumentClick);
      }
    });
  }

  handleModerationsToggle(e) {
    const local_storage = store.getState().local_storage;
    const show_moderations = local_storage.show_moderations === true ? false : true;
    local_storage["show_moderations"] = show_moderations;
    Page.cmd("wrapperSetLocalStorage", local_storage);
    store.dispatch(setLocalStorage(local_storage));
    store.dispatch(toggleModerations(show_moderations));
    this.setState({ show_moderations: show_moderations });
  }

  handleFaqRulesClick() {
    jQuery('#faq-rules-modal').modal('show');
  }

  handleLoginClick() {
    const local_storage = store.getState().local_storage;
    if (!local_storage.ifs_cert_created) {
      this.createIfsCertificate();
    } else {
      this.certSelect();
    }
  }

  showOverwriteAccountModal() {
    jQuery('#confirm-overwrite-modal').modal('show');
  }

  handleOverwriteAccountClick() {
    this.createIfsCertificate();
  }

  createIfsCertificate() {
    if (store.getState().local_storage.ifs_cert_created) {
      Page.cmd("wrapperNotification", ["info", "Are you sure? you already have an ifs.anonymous certificate, creating a new one will overwrite all your existing data!", 5000]);
    }
    const state = store.getState();
    const name = appHelpers.generateRandomString(13);
    const certname = "ifs.anonymous";
    const genkey = appHelpers.grk(state.config);
    const genid = bitcoin.ECPair.fromWIF(genkey);
    const cert = bitcoin.message.sign(genid, state.site_info.auth_address + "#web/" + name).toString("base64");
    Page.cmd("certAdd", [certname, "web", name, cert], function (res) {
      const local_storage = store.getState().local_storage;
      local_storage['ifs_cert_created'] = true;
      Page.cmd("wrapperSetLocalStorage", local_storage);
      this.certSelect();
    }.bind(this));
  }

  certSelect() {

    Page.cmd("certSelect", [['ifs.anonymous', 'zeroid.bit']]);
    Page.onRequest = function (cmd, message) {
      if (cmd == "setSiteInfo") {
        const auth_address = message.auth_address;
        const cert_user_id = message.cert_user_id;
        store.dispatch(changeCert(auth_address, cert_user_id));
      }
    }.bind(this);
  }

  render() {

    let createAccountButton, loginButton, myChannelButton, changeAccountButton;
    if (!this.props.user.user_id) {
      const ifsCertCreated = store.getState().local_storage.ifs_cert_created;
      if (ifsCertCreated) {
        createAccountButton = React.createElement(
          "a",
          { onClick: this.showOverwriteAccountModal, id: "create-cert-menu-item", className: "item user-menu-item" },
          "Create Account"
        );
      } else {
        createAccountButton = React.createElement(
          "a",
          { onClick: this.createIfsCertificate, id: "create-cert-menu-item", className: "item user-menu-item" },
          "Create Account"
        );
      }
      loginButton = React.createElement(
        "a",
        { onClick: this.certSelect, id: "login-menu-item", className: "item user-menu-item" },
        "Select Account"
      );
    } else {
      myChannelButton = React.createElement(
        "a",
        { href: "index.html?view:user+id:" + this.props.user.user_id, className: "item user-menu-item" },
        "My Channels"
      );
      changeAccountButton = React.createElement(
        "a",
        { onClick: this.certSelect, id: "login-menu-item", className: "item user-menu-item" },
        "Change Account"
      );
    }

    let menu;
    if (this.state.show_menu) {

      let moderationsStatus;
      if (this.state.show_moderations) {
        moderationsStatus = "ON";
      } else {
        moderationsStatus = "OFF";
      }

      menu = React.createElement(
        "div",
        { id: "user-menu", className: "ui inverted visible" },
        React.createElement("div", { className: "menu-arrow-up" }),
        React.createElement(
          "a",
          { id: "moderations-menu-item", className: "item user-menu-item" },
          "Moderation",
          React.createElement(
            "div",
            { className: "ui toggle checkbox user-menu-item" },
            React.createElement("input", {
              className: "user-menu-item",
              type: "checkbox",
              name: "distributeFiles",
              defaultChecked: this.state.show_moderations,
              onChange: this.handleModerationsToggle }),
            React.createElement("label", { className: "user-menu-item" })
          )
        ),
        React.createElement(
          "a",
          { onClick: this.handleFaqRulesClick, id: "faq-menu-item", className: "item user-menu-item" },
          "FAQ / Rules"
        ),
        createAccountButton,
        loginButton,
        myChannelButton,
        changeAccountButton
      );
    }

    let userAvatarDisplay, userAvatarCssClass;
    if (appHelpers.isEmpty(this.props.user)) {
      userAvatarDisplay = React.createElement("i", { id: "user-menu-toggle-icon", className: "user icon" });
    } else {
      userAvatarCssClass = "w-avatar";
      let username;
      if (this.props.user.user_name) {
        username = this.props.user.user_name;
      } else {
        username = this.props.user.user_id;
      }
      const initials = username.substring(0, 2);
      const bgColor = commentHelpers.randomRgba(username);
      userAvatarDisplay = React.createElement(
        "div",
        { id: "user-menu-toggle-icon", className: "user-avatar initials", style: { width: "28px", height: "28px" } },
        React.createElement(
          "span",
          { style: { background: bgColor } },
          initials
        )
      );
    }

    const faqModal = React.createElement(
      "div",
      { className: "ui basic mini modal", id: "faq-rules-modal" },
      React.createElement(
        "div",
        { className: "ui icon header" },
        React.createElement("i", { className: "info circle icon" }),
        "FAQ / Rules"
      ),
      React.createElement(
        "div",
        { className: "content" },
        React.createElement("img", { src: "assets/img/faq-banner.jpg" }),
        React.createElement(
          "div",
          null,
          "Here is a list of what is NOT accepted on this server:",
          React.createElement("br", null),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "NO CP/Porn"
            )
          ),
          "Visit our Blog: ",
          React.createElement(
            "a",
            { href: "/1Cd1SqtZUUpK8e8KUUqBttHzwPfbG1CU6y" },
            "1Cd1SqtZUUpK8e8KUUqBttHzwPfbG1CU6y"
          ),
          React.createElement("br", null),
          "Official Discussion here: ",
          React.createElement(
            "a",
            { href: "/1J1c7eML6uMwDU4uiKbKRxoqxGP6WMFMvb/index.html?v=channel+id=1DnmGgRaHo2puhutf6Dn4MjF4eXmqmdLZ1ch1" },
            "/1J1c7eML6uMwDU4uiKbKRxoqxGP6WMFMvb/index.html?v=channel+id=1DnmGgRaHo2puhutf6Dn4MjF4eXmqmdLZ1ch1"
          )
        )
      )
    );

    const overwriteAccountModal = React.createElement(
      "div",
      { className: "ui basic mini modal confirm-overwrite-modal ", id: "confirm-overwrite-modal" },
      React.createElement(
        "div",
        { className: "ui icon header" },
        React.createElement("i", { className: "user icon" }),
        "Are You Sure?"
      ),
      React.createElement(
        "div",
        { className: "content" },
        React.createElement(
          "p",
          null,
          "you already have an ifs.anonymous account!",
          React.createElement("br", null),
          "if you create a new one, all of your user's information will be unaccesable! that includes files, channels, comments & votes"
        )
      ),
      React.createElement(
        "div",
        { className: "actions" },
        React.createElement(
          "div",
          { className: "ui red basic cancel inverted button" },
          React.createElement("i", { className: "remove icon" }),
          "Cancel"
        ),
        React.createElement(
          "div",
          { className: "ui green ok inverted button", onClick: this.handleOverwriteAccountClick },
          React.createElement("i", { className: "checkmark icon" }),
          "Yes"
        )
      )
    );

    return React.createElement(
      "div",
      { id: "user-menu-container", className: "ui icon top right pointing dropdown button" },
      React.createElement(
        "a",
        { id: "user-menu-toggle-button", onClick: this.toggleDropdownMenu, className: "item " + userAvatarCssClass },
        userAvatarDisplay
      ),
      menu,
      faqModal,
      overwriteAccountModal
    );
  }
}

const mapStateToNavBarUserMenuProps = state => {
  moderations = state.moderations;
  user = state.user;
  return {
    moderations,
    user
  };
};

const mapDispatchToNavBarUserMenuProps = dispatch => {
  return {
    dispatch
  };
};

const NavBarUserMenuWrapper = ReactRedux.connect(mapStateToNavBarUserMenuProps, mapDispatchToNavBarUserMenuProps)(NavBarUserMenu);
class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 'main'
    };

    this.getUserChannels = this.getUserChannels.bind(this);
    this.setChannel = this.setChannel.bind(this);
    this.onGetChannelFiles = this.onGetChannelFiles.bind(this);
    this.countChannelItems = this.countChannelItems.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.genereateSortOptions = this.genereateSortOptions.bind(this);
    this.getChannelFiles = this.getChannelFiles.bind(this);

    this.handleChannelItemClick = this.handleChannelItemClick.bind(this);
    this.handleChannelDashboardPaginationClick = this.handleChannelDashboardPaginationClick.bind(this);
    this.handleSortOptionClick = this.handleSortOptionClick.bind(this);
    this.handleSortItemsByPeersClick = this.handleSortItemsByPeersClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleResetSection = this.handleResetSection.bind(this);
    this.handleNewChannelClick = this.handleNewChannelClick.bind(this);
    this.handleEditChannelClick = this.handleEditChannelClick.bind(this);
    this.handleRepublishChannelClick = this.handleRepublishChannelClick.bind(this);
    this.handleEditItemClick = this.handleEditItemClick.bind(this);
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
    this.handleFinishUploading = this.handleFinishUploading.bind(this);
    this.handleUpdateChannel = this.handleUpdateChannel.bind(this);

    this.updateChannel = this.updateChannel.bind(this);
    this.finishUpdatingChannel = this.finishUpdatingChannel.bind(this);
    this.showNewChannelSection = this.showNewChannelSection.bind(this);
    this.handleCreateChannel = this.handleCreateChannel.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.finishCreatingChannel = this.finishCreatingChannel.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.finishDeleteFile = this.finishDeleteFile.bind(this);
    this.handleUpdateItemClick = this.handleUpdateItemClick.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.finishUpdatingItem = this.finishUpdatingItem.bind(this);
  }

  componentDidMount() {
    this.getUserChannels();
  }

  getUserChannels(channel) {
    this.setState({ loading: true }, function () {
      const query = "SELECT * FROM channel WHERE channel_address LIKE '%" + this.props.user.user_auth_address + "' ORDER BY date_added DESC";
      Page.cmd("dbQuery", [query], function (channels) {
        if (channels.length > 0) {
          this.setState({ channels: channels }, function () {
            this.setChannel(channel);
          });
        } else {
          this.setState({ loading: false });
        }
      }.bind(this));
    });
  }

  setChannel(channel) {
    if (!channel) {
      if (this.props.route.id && this.props.route.id.split('_')[1] === this.props.user.user_auth_address) {
        this.state.channels.forEach(function (ch, index) {
          if (this.props.route.id === ch.channel_address && ch.channel_address.split('_')[1] === this.props.user.user_auth_address) {
            channel = ch;
          }
        }.bind(this));
      } else if (this.props.localStorage && this.props.localStorage.channel_id && this.props.localStorage.channel_id.split('_')[1] === this.props.user.user_auth_address) {
        this.state.channels.forEach(function (ch, index) {
          if (this.props.localStorage.channel_id === ch.channel_address) {
            channel = ch;
          }
        }.bind(this));
      } else {
        channel = this.state.channels[0];
      }
    }

    let page;
    if (store.getState().route.page) page = store.getState().route.page;else page = 1;

    let pagination = {
      current_page: page,
      items_per_page: 10
    };

    this.setState({
      channel: channel,
      section: 'main',
      pagination: pagination,
      current_page: page,
      items_per_page: 10,
      loading: true,
      items: []
    }, function () {

      Page.local_storage["channel_id"] = this.state.channel.channel_address;
      Page.cmd("wrapperSetLocalStorage", Page.local_storage);

      const inner_path = "merged-" + this.props.config.merger_name + "/" + this.state.channel.cluster_id + "/data/users/" + this.state.channel.channel_address.split('_')[1] + "/content.json";
      Page.cmd("fileGet", { inner_path: inner_path, required: false }, function (data) {
        const contentJson = JSON.parse(data);
        if (contentJson) {
          contentJson.optional = ".*(.avi|.bin|.pdf|.epub|.gif|.jpeg|.jpg|.mp3|.mp4|.nes|.ogg|.pdf|.png|.sna|.wav|.webm|.zip)";
          var json_raw = unescape(encodeURIComponent(JSON.stringify(contentJson, void 0, '\t')));
          Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
            this.onGetChannelFiles();
          }.bind(this));
        } else {
          this.onGetChannelFiles();
        }
      }.bind(this));
    });
  }

  onGetChannelFiles() {
    const query = "SELECT SUM(file_size) FROM item WHERE channel='" + this.state.channel.channel_address + "'";
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ total_file_size: res[0]["SUM(file_size)"] }, function () {
        this.countChannelItems();
      });
    }.bind(this));
  }

  countChannelItems() {
    const showModerations = false;
    const query = itemHelpers.countTotalItems({}, this.props.moderations, this.state.channel);
    Page.cmd("dbQuery", [query], function (item_count) {
      this.renderPagination(item_count[0]['count(*)']);
    }.bind(this));
  }

  renderPagination(item_count) {
    const pagination = itemHelpers.renderPagination(this.props.config, this.state, item_count, this.props.route.view);
    pagination.items_per_page = this.state.items_per_page;
    this.setState({
      pagination: pagination,
      total_item_count: item_count
    }, function () {
      this.genereateSortOptions();
    });
  }

  genereateSortOptions() {
    const sort_options = itemHelpers.genereateChannelItemsSortOptions();
    let sort_option;
    if (!this.state.sortBy) sort_option = sort_options[0];else sort_option = this.state.sortBy;
    this.setState({ sort_options: sort_options, sortBy: sort_option }, function () {
      this.getChannelFiles();
    });
  }

  getChannelFiles() {
    const query = itemHelpers.getChannelItemsQuery(this.state);
    Page.cmd("dbQuery", [query], function (res) {
      this.setState({ items: res, loading: false });
    }.bind(this));
  }

  handleChannelDashboardPaginationClick(pageNumber) {
    this.setState({ current_page: pageNumber }, function () {
      this.onGetChannelFiles();
    });
  }

  handleSortOptionClick(sortOption) {
    this.setState({ sortBy: sortOption }, function () {
      this.onGetChannelFiles();
    });
  }

  handleSortItemsByPeersClick() {
    // console.log('sort by peers');
  }

  handleChannelItemClick(channel) {
    this.setChannel(channel);
  }

  handleUploadClick() {
    this.setState({ section: 'upload' });
  }

  handleResetSection() {
    this.setState({ section: 'main' });
  }

  handleNewChannelClick() {
    jQuery('#new-channel-modal').modal('show');
  }

  handleEditChannelClick() {
    this.setState({ section: 'edit-channel' });
  }

  handleEditItemClick(item) {
    this.setState({ section: 'edit-item', item_id: item.item_id });
  }

  handleFinishUploading(uploadedItems) {
    const items = this.state.items.concat(uploadedItems);
    this.setState({ loading: true, section: 'main' }, function () {
      this.getChannelFiles();
    });
  }

  handleUpdateChannel(attrs) {
    this.setState({ loading: true }, function () {
      this.updateChannel(attrs);
    });
  }

  updateChannel(attrs) {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.state.channel.cluster_id + "/data/users/" + this.state.channel.channel_address.split('_')[1] + "/data.json";
    Page.cmd("fileGet", { inner_path: inner_path, required: false }, function (data) {
      if (data) {
        data = JSON.parse(data);

        let channelIndex;
        data.channel.forEach(function (channel, index) {
          if (this.state.channel.channel_address === channel.channel_address) {
            channelIndex = index;
          }
        }.bind(this));

        if (data.channel[channelIndex].logo_file) {
          data.item.forEach(function (item, index) {
            if (item.file_name === data.channel[channelIndex].logo_file) {
              item.is_associated = false;
            } else if (item.file_name === attrs.logo_file) {
              item.is_associated = true;
            }
          });
        }

        data.channel[channelIndex].channel_name = attrs.channel_name;
        data.channel[channelIndex].channel_description = attrs.channel_description;
        data.channel[channelIndex].logo_file = attrs.logo_file;
        data.next_item_id += 1;
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
          Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
            this.finishUpdatingChannel(attrs);
          }.bind(this));
        }.bind(this));
      } else {
        // console.log('fix wrong cluster?');
      }
    }.bind(this));
  }

  finishUpdatingChannel(attrs) {
    const channel = this.state.channel;
    channel.channel_name = attrs.channel_name;
    channel.channel_description = attrs.channel_description;
    channel.logo_file = attrs.logo_file;
    this.getUserChannels(channel);
  }

  showNewChannelSection() {
    this.setState({ section: 'new-channel' });
  }

  handleCreateChannel(attrs) {
    this.setState({ loading: true }, function () {
      this.createChannel(attrs);
    });
  }

  createChannel(attrs) {
    if (!attrs.clusterId) attrs.clusterId = this.props.config.cluster.cluster_id;
    const inner_path = "merged-" + this.props.config.merger_name + "/" + attrs.clusterId + "/data/users/" + this.props.user.user_auth_address + "/data.json";
    Page.cmd("fileGet", { inner_path: inner_path, required: false }, function (data) {
      if (data) {
        data = JSON.parse(data);
        if (!data.channel) {
          data.channel = [];
          data.next_channel_id = 1;
        }
      } else {
        data = { "next_channel_id": 1, "channel": [] };
      }
      const channel = {
        channel_address: attrs.clusterId.slice(0, 3) + data.next_channel_id + '_' + this.props.user.user_auth_address,
        channel_name: attrs.channel_name,
        channel_description: attrs.channel_description,
        logo_file: attrs.logo_file,
        cluster_id: attrs.clusterId,
        date_added: +new Date()
      };
      data.channel.push(channel);
      data.next_channel_id += 1;
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
          this.finishCreatingChannel(channel);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  finishCreatingChannel(channel) {
    this.getUserChannels(channel);
  }

  handleDeleteItemClick(item) {
    this.setState({ loading: true }, function () {
      this.deleteItem(item);
    });
  }

  deleteItem(item) {
    console.log('-- delete item --');
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.state.channel.cluster_id + "/data/users/" + this.state.channel.channel_address.split('_')[1];
    console.log('inner path:' + inner_path);
    Page.cmd("fileGet", { inner_path: inner_path + "/data.json", required: false }, function (data) {
      console.log('file get data.json');
      console.log(data);
      if (data) {
        data = JSON.parse(data);
        // get item index
        let itemIndex;
        data.item.forEach(function (itm, index) {
          if (item.item_id === itm.item_id) {
            itemIndex = index;
          }
        });
        console.log('delete item index:' + itemIndex);
        // remove item from data.json
        data.item.splice(itemIndex, 1);
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        Page.cmd("fileWrite", [inner_path + "/data.json", btoa(json_raw)], function (res) {
          console.log('file Write:');
          console.log(res);
          console.log('-----');
          Page.cmd("sitePublish", { "inner_path": inner_path + "/data.json" }, function (res) {
            console.log('site publish:');
            console.log(res);
            console.log('-----');
            Page.cmd("fileDelete", [inner_path + "/" + item.file_name], function (res) {
              console.log('file Delete:');
              console.log(res);
              console.log('-----');
              this.finishDeleteFile();
            }.bind(this));
          }.bind(this));
        }.bind(this));
      } else {
        console.log('fix wrong cluster?');
      }
    }.bind(this));
  }

  finishDeleteFile() {
    this.getChannelFiles();
  }

  handleUpdateItemClick(item) {
    this.onUpdateItem(item);
  }

  onUpdateItem(item) {
    this.updateItem(item);
  }

  updateItem(item) {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.state.channel.cluster_id + "/data/users/" + this.state.channel.channel_address.split('_')[1] + "/data.json";
    Page.cmd("fileGet", { inner_path: inner_path, required: false }, function (data) {
      if (data) {

        data = JSON.parse(data);

        let itemIndex;
        data.item.forEach(function (itm, index) {
          if (item.item_id === itm.item_id) {
            itemIndex = index;
          }
        });

        let itemPosterIndex, newPosterIndex;
        if (data.item[itemIndex].poster_file !== item.poster_file) {
          data.item.forEach(function (itm, index) {
            if (itm.file_name === data.item[itemIndex].poster_file) {
              itm.is_associated = false;
            } else if (itm.file_name === item.poster_file) {
              itm.is_associated = true;
            }
          });
        }

        data.item[itemIndex] = item;
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
        Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function (res) {
          Page.cmd("sitePublish", { "inner_path": inner_path }, function (res) {
            this.finishUpdatingItem();
          }.bind(this));
        }.bind(this));
      } else {
        console.log('fix wrong cluster?');
      }
    }.bind(this));
  }

  finishUpdatingItem() {
    this.setState({ section: 'main', loading: true }, function () {
      this.getChannelFiles();
    });
  }

  handleRepublishChannelClick() {
    const inner_path = "merged-" + this.props.config.merger_name + "/" + this.state.channel.cluster_id + "/data/users/" + this.state.channel.channel_address.split('_')[1] + "/";

    Page.cmd("fileGet", { "inner_path": inner_path + 'content.json', "required": false }, function (contentJson) {
      contentJson = JSON.parse(contentJson);
      if (contentJson) {
        contentJson.optional = appHelpers.generateContentJsonOptionalList(this.props.config.file_types);
      }
      var json_raw = unescape(encodeURIComponent(JSON.stringify(contentJson, void 0, '\t')));
      Page.cmd("fileWrite", [inner_path + 'content.json', btoa(json_raw)], function (res) {
        Page.cmd("sitePublish", { "inner_path": inner_path + 'content.json' }, function (res) {
          Page.cmd("wrapperNotification", ["done", "Channel Republished!", 10000]);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  render() {
    if (this.props.user) {
      let userSectionContainer;
      if (!this.state.loading) {

        if (this.state.channels) {
          userSectionContainer = React.createElement(UserSectionContainer, {
            items: this.state.items,
            loading: this.props.loading,
            channel: this.state.channel,
            channels: this.state.channels,
            route: this.props.route,
            section: this.state.section,
            page: this.props.page,
            user: this.props.user,
            config: this.props.config,
            sites: this.props.sites,
            itemId: this.state.item_id,
            pagination: this.state.pagination,
            sortOptions: this.state.sort_options,
            sortBy: this.state.sortBy,
            totalFileSize: this.state.total_file_size,
            totalItemCount: this.state.total_item_count,
            onRepublishChannelClick: this.handleRepublishChannelClick,
            onUploadClick: this.handleUploadClick,
            onResetSection: this.handleResetSection,
            onEditChannelClick: this.handleEditChannelClick,
            onUpdateChannel: this.handleUpdateChannel,
            onDeleteItemClick: this.handleDeleteItemClick,
            onFinishUploading: this.handleFinishUploading,
            onCreateChannel: this.handleCreateChannel,
            onEditItemClick: this.handleEditItemClick,
            onUpdateItemClick: this.handleUpdateItemClick,
            onChannelDashboardPaginationClick: this.handleChannelDashboardPaginationClick,
            onSortOptionClick: this.handleSortOptionClick,
            onSortItemsByPeersClick: this.handleSortItemsByPeersClick,
            onNewChannelClick: this.handleNewChannelClick
          });
        } else {
          userSectionContainer = React.createElement(
            "div",
            { className: "ui segment" },
            "Add a Channel by clicking on the ",
            React.createElement(
              "a",
              { className: "alink", onClick: this.handleNewChannelClick },
              "+"
            ),
            "you dont have any channels yet,"
          );
        }
      } else {
        userSectionContainer = React.createElement(LoadingContainer, { msg: "Loading User Files" });
      }

      return React.createElement(
        "div",
        { id: "user-view", className: "viewport" },
        React.createElement(UserChannelList, {
          section: this.state.section,
          channel: this.state.channel,
          channels: this.state.channels,
          page: this.props.page,
          user: this.props.user,
          config: this.props.config,
          route: this.props.route,
          sites: this.props.sites,
          onSetChannel: this.setChannel,
          onNewChannelClick: this.handleNewChannelClick,
          onChannelItemClick: this.handleChannelItemClick,
          onCreateChannel: this.handleCreateChannel
        }),
        userSectionContainer
      );
    } else {
      return React.createElement(
        "p",
        null,
        "please login to view your account"
      );
    }
  }
}

class UserChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewChannelClick = this.handleNewChannelClick.bind(this);
    this.onCreateChannel = this.onCreateChannel.bind(this);
  }

  handleNewChannelClick() {
    jQuery('#new-channel-modal').modal('show');
  }

  onCreateChannel(attrs) {
    jQuery('#new-channel-modal').modal('hide');
    this.props.onCreateChannel(attrs);
  }

  render() {
    let userChannels;
    if (this.props.channels) {
      userChannels = this.props.channels.map((channel, i) => React.createElement(UserChannelListItem, {
        key: channel.channel_address,
        page: this.props.page,
        user: this.props.user,
        route: this.props.route,
        channel: channel,
        mChannel: this.props.channel,
        config: this.props.config,
        section: this.props.section,
        onChannelItemClick: this.props.onChannelItemClick
      }));
    }
    return React.createElement(
      "div",
      { id: "user-sidebar" },
      React.createElement(
        "div",
        { className: "ui menu vertical inverted", id: "user-channels-sidebar" },
        userChannels,
        React.createElement(
          "a",
          { className: this.props.section === "new-channel" ? "item active" : "item", onClick: this.handleNewChannelClick },
          React.createElement(
            "h2",
            { className: "ui icon header" },
            React.createElement("i", { className: "plus icon" })
          )
        ),
        React.createElement(
          "div",
          { className: "ui basic modal", id: "new-channel-modal" },
          React.createElement(
            "div",
            { className: "content segment white" },
            React.createElement(ChannelFormContainer, {
              sites: this.props.sites,
              isCreate: true,
              page: this.props.page,
              channels: this.props.channels,
              user: this.props.user,
              config: this.props.config,
              onCreateChannel: this.onCreateChannel
            })
          )
        )
      )
    );
  }
}

class UserChannelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChannelItemClick = this.handleChannelItemClick.bind(this);
  }

  handleChannelItemClick() {
    this.props.onChannelItemClick(this.props.channel);
  }

  render() {
    let channelImageElement;
    if (this.props.channel.logo_file) {
      const imagePath = "merged-" + this.props.config.merger_name + "/" + this.props.channel.cluster_id + "/data/users/" + this.props.channel.channel_address.split('_')[1] + "/" + this.props.channel.logo_file;
      channelImageElement = React.createElement("img", { className: "avatar", src: imagePath });
    } else {
      channelImageElement = React.createElement("img", { className: "avatar", src: "assets/img/x-avatar.png" });
    }
    return React.createElement(
      "a",
      { className: this.props.mChannel && this.props.channel.channel_address === this.props.mChannel.channel_address ? "item active" : "item",
        onClick: this.handleChannelItemClick },
      channelImageElement
    );
  }
}

class UserSectionContainer extends React.Component {
  render() {
    let userSection, channelHeader;
    if (this.props.channel) {

      channelHeader = React.createElement(ChannelHeader, {
        sites: this.props.sites,
        section: this.props.section,
        channel: this.props.channel,
        page: this.props.page,
        route: this.props.route,
        onUploadClick: this.props.onUploadClick,
        onResetSection: this.props.onResetSection,
        onEditChannelClick: this.props.onEditChannelClick,
        onRepublishChannelClick: this.props.onRepublishChannelClick
      });

      if (this.props.section === 'main') {
        userSection = React.createElement(UserMainSection, {
          items: this.props.items,
          loading: this.props.loading,
          channel: this.props.channel,
          page: this.props.page,
          config: this.props.config,
          sites: this.props.sites,
          user: this.props.user,
          pagination: this.props.pagination,
          sortOptions: this.props.sortOptions,
          sortBy: this.props.sortBy,
          totalFileSize: this.props.totalFileSize,
          totalItemCount: this.props.totalItemCount,
          onUploadClick: this.props.onUploadClick,
          onEditItemClick: this.props.onEditItemClick,
          onDeleteItemClick: this.props.onDeleteItemClick,
          onPaginationButtonClick: this.props.onChannelDashboardPaginationClick,
          onSortOptionClick: this.props.onSortOptionClick,
          onSortItemsByPeersClick: this.props.onSortItemsByPeersClick
        });
      } else if (this.props.section === 'upload') {
        userSection = React.createElement(UserUploadSection, {
          cItems: this.props.items,
          page: this.props.page,
          channel: this.props.channel,
          user: this.props.user,
          config: this.props.config,
          onFinishUploading: this.props.onFinishUploading
        });
      } else if (this.props.section === 'edit-channel') {
        userSection = React.createElement(UserChannelEditSection, {
          sites: this.props.sites,
          page: this.props.page,
          channel: this.props.channel,
          user: this.props.user,
          config: this.props.config,
          onUpdateChannel: this.props.onUpdateChannel
        });
      } else if (this.props.section === 'edit-item') {
        userSection = React.createElement(UserItemEditSection, {
          itemId: this.props.itemId,
          page: this.props.page,
          channel: this.props.channel,
          user: this.props.user,
          config: this.props.config,
          onUpdateItemClick: this.props.onUpdateItemClick
        });
      } else if (this.props.section === 'new-channel') {
        userSection = React.createElement(UserNewChannelSection, {
          sites: this.props.sites,
          page: this.props.page,
          channels: this.props.channels,
          user: this.props.user,
          config: this.props.config,
          onCreateChannel: this.props.onCreateChannel
        });
      }
    } else {
      userSection = React.createElement(LoadingContainer, { msg: "loading channel information" });
    }
    return React.createElement(
      "div",
      { id: "user-section-container" },
      channelHeader,
      React.createElement(UserViewNavBar, {
        section: this.props.section,
        onResetSection: this.props.onResetSection
      }),
      userSection
    );
  }
}

class UserViewNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    this.props.onResetSection();
  }

  render() {
    let navbar;
    if (this.props.section !== 'main' || 'new-channel') {
      navbar = React.createElement(
        "a",
        { className: "button ui primary", onClick: this.handleBackButtonClick },
        "back"
      );
    }
    return React.createElement("div", { id: "user-view-nav-bar" });
  }
}

class UserMainSection extends React.Component {
  render() {
    if (this.props.loading) {
      return React.createElement(LoadingContainer, { msg: "loading channel files" });
    } else {
      return React.createElement(
        "div",
        { id: "user-main-section", className: "user-section" },
        React.createElement(ChannelDashboard, {
          items: this.props.items,
          channel: this.props.channel,
          page: this.props.page,
          config: this.props.config,
          sites: this.props.sites,
          user: this.props.user,
          pagination: this.props.pagination,
          sortOptions: this.props.sortOptions,
          sortBy: this.props.sortBy,
          totalFileSize: this.props.totalFileSize,
          totalItemCount: this.props.totalItemCount,
          onUploadClick: this.props.onUploadClick,
          onEditItemClick: this.props.onEditItemClick,
          onDeleteItemClick: this.props.onDeleteItemClick,
          onPaginationButtonClick: this.props.onPaginationButtonClick,
          onSortOptionClick: this.props.onSortOptionClick,
          onSortItemsByPeersClick: this.props.onSortItemsByPeersClick
        })
      );
    }
  }
}

class UserChannelEditSection extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "user-channel-edit-section", className: "user-section" },
      React.createElement(ChannelFormContainer, {
        sites: this.props.sites,
        user: this.props.user,
        channel: this.props.channel,
        page: this.props.page,
        config: this.props.config,
        onUpdateChannel: this.props.onUpdateChannel
      })
    );
  }
}

class UserUploadSection extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "upload-section", className: "user-section" },
      React.createElement(FileUploader, {
        cItems: this.props.cItems,
        page: this.props.page,
        channel: this.props.channel,
        user: this.props.user,
        config: this.props.config,
        onFinishUploading: this.props.onFinishUploading
      })
    );
  }
}

class UserItemEditSection extends React.Component {
  render() {
    return React.createElement(
      "div",
      { id: "user-item-edit-section", className: "user-section" },
      React.createElement(ItemFormContainer, {
        itemId: this.props.itemId,
        page: this.props.page,
        channel: this.props.channel,
        user: this.props.user,
        config: this.props.config,
        onUpdateItemClick: this.props.onUpdateItemClick
      })
    );
  }
}

class UserNewChannelSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return React.createElement(
      "div",
      { id: "user-new-channel-section", className: "user-section" },
      React.createElement(ChannelFormContainer, {
        sites: this.props.sites,
        isCreate: true,
        page: this.props.page,
        channels: this.props.channels,
        user: this.props.user,
        config: this.props.config,
        onCreateChannel: this.props.onCreateChannel
      })
    );
  }
}
window.voteHelpers = function () {

  function renderDataOnItemVote(data, item, votes, vote_type, user_id) {
    // render data object
    if (data) {
      data = JSON.parse(data);
      if (!data.vote) {
        data.vote = [];
        next_vote_id = 1;
      }
    } else {
      data = { "next_vote_id": 1, "vote": [] };
    }
    // up / down vote
    if (vote_type === "up" || vote_type === "down") {
      let vote = {
        vote_id: item.item_id + '_v_' + data.next_vote_id,
        item_id: item.item_id,
        user_id: user_id,
        date_added: +new Date()
      };
      if (vote_type === "up") vote.vote = 1;else if (vote_type === "down") vote.vote = 0;
      data.next_vote_id += 1;
      data.vote.push(vote);
    }
    // change / delete vote
    else if (vote_type === "change" || vote_type === "delete") {
        // get vote from item votes array
        var voteId;
        var voteType;
        votes.forEach(function (vote, index) {
          if (vote.user_id === user_id) {
            voteId = vote.vote_id;
            voteType = vote.vote;
          }
        });
        // find vote index in data.json votes array
        var voteIndex;
        data.vote.forEach(function (vote, index) {
          if (vote.vote_id === voteId) {
            voteIndex = index;
            // if vote_type is change, change the vote Type of vote
            if (vote_type === "change") {
              if (vote.vote === 1) vote.vote = 0;else if (vote.vote === 0) vote.vote = 1;
            }
          }
        });
        // if vote_type is delete, remove vote from data.vote array
        if (vote_type === "delete") {
          data.vote.splice(voteIndex, 1);
        }
      }
    return data;
  }
  return {
    renderDataOnItemVote
  };
}();
