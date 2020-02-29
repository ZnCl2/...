export const AppReducerInitialState = {
  loading:true,
  config:null,
  route:null
}

function AppReducer(state,action){
  switch(action.type){
    case 'SET_CONFIG':{
      return {... state, config:action.config}
    }
    case 'SET_ROUTE':{
      return {... state,route:action.route}
    }
    case 'FINISH_LOADING_SITE':{
      return {... state,loading:false}
    }
    case 'INIT_VIEW':{
      return {... state,view:action.view}
    }
    default:{
      return state;
    }
  }
}

export default AppReducer;
