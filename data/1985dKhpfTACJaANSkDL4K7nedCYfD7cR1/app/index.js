import React from 'react';
import ReactDOM from 'react-dom';
import StoreContextProvider,{Context} from './context-provider.js';
import {RouteHelper,DateHelper,SiteListByCategoryQuery} from './helpers.js';

function AppContainer(){
  return (
    <StoreContextProvider>
      <App/>
    </StoreContextProvider>
  );
}

function App(){

  /** Component **/

  // context
  const {
    zeroNetState,zeroNetDispatch,
    appState,appDispatch
  } = React.useContext(Context);

  // component did mount
  React.useEffect(() => {
    // siteInfo
    window.Page.cmd('siteInfo', {}, function(site_info) {
      zeroNetDispatch({type:'SET_SITE_INFO',site_info});
      // serverInfo
      window.Page.cmd('serverInfo', {},function(server_info){
        zeroNetDispatch({type:'SET_SERVER_INFO',server_info});
        // get user feed
        window.Page.cmd('feedListFollow',[],function(user_feed){
          zeroNetDispatch({type:'SET_USER_FEED',user_feed})
          // get config.json
          window.Page.cmd('fileGet',{'inner_path':'data/config.json'},function(res){
            appDispatch({type:'SET_CONFIG',config:JSON.parse(res)});
            // zeronet ready
            zeroNetDispatch({type:'SET_READY'});
          });
        });
      });
    });
  },[]);

  // on zeronet ready
  React.useEffect(() => {
    if (zeroNetState.ready){
      const route = RouteHelper(window.location.href,zeroNetState.site_info.address);
      appDispatch({type:'SET_ROUTE',route:route});
      appDispatch({type:'FINISH_LOADING_SITE'});
    }
  },[zeroNetState]);

  /** Render **/

  // app display
  let appDisplay = <div>loading</div>
  if (!appState.loading) appDisplay = <SitesView />

  return (
    <main id="main">
      {appDisplay}
    </main>
  )
}

function SitesView(){

  // context
  const {
    zeroNetState,
    viewState,viewDispatch
  } = React.useContext(Context);

  function filterCategory(category){
    // const query = "SELECT site.*, json.*, COUNT(site_star.site_uri) AS star, site_stat.*\nFROM site\nLEFT JOIN json USING (json_id)\nLEFT JOIN site_star ON (site_star.site_uri = json.directory || \"_\" || site.site_id)\nLEFT JOIN site_stat ON (site_stat.site_uri = json.directory || \"_\" || site.site_id)\n \nGROUP BY site.json_id, site_id";
    const query = SiteListByCategoryQuery(category);
    console.log(query);
    window.Page.cmd('dbQuery',[query],function(res){
      console.log(res);
      viewDispatch({type:'SET_SITES',sites:res});
    });
  }

  let sitesDisplay;
  if (viewState.data && viewState.data.sites){
    const siteList = viewState.data.sites.map((s,index) => {
      return (
        <SiteListItem key={index} site={s}/>
      );
    });
    sitesDisplay = (
      <ul>
        {siteList}
      </ul>
    )
  }

  return (
    <div id="sites-view">
      <div id="top-menu">
        <ul>
          <li><a onClick={() => filterCategory(1)}>Forums, Boards</a></li>
          <li><a onClick={() => filterCategory(2)}>Blogs</a></li>
          <li><a onClick={() => filterCategory(3)}>Services</a></li>
          <li><a onClick={() => filterCategory(4)}>Porn</a></li>
          <li><a onClick={() => filterCategory(5)}>Chat</a></li>
          <li><a onClick={() => filterCategory(6)}>Video, Image</a></li>
          <li><a onClick={() => filterCategory(7)}>News</a></li>
          <li><a onClick={() => filterCategory(8)}>Guides</a></li>
        </ul>
      </div>
      <div id="sites-container">
        {sitesDisplay}
      </div>
    </div>
  )
}

const SiteListItem = (props) => {
  const s = props.site;
  const siteAddedDate = DateHelper(s.date_added);
  console.log(s);
  return (
    <li>
      <a href={s.address}>{s.title}</a>   <i>{siteAddedDate}</i>
    </li>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppContainer />, rootElement);
