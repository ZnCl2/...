export const ZeroNetReducerInitialState = {
  site_info:null,
  server_info:null,
  user_feed:null,
  ready:false
}

function ZeroNetReducer(state,action){
  switch(action.type){
    case 'SET_SITE_INFO':{
      return {... state,site_info:action.site_info}
    }
    case 'SET_SERVER_INFO':{
      return {... state,server_info:action.server_info}
    }
    case 'SET_FEED':{
      return {... state,user_feed:action.user_feed}
    }
    case 'SET_READY':{
      return {... state,ready:true}
    }
    default:{
      return state;
    }
  }
}

export default ZeroNetReducer;
