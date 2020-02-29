export const ViewReducerInitialState = {
  loading:true,
  data:null
}

function ViewReducer(state,action){
  switch(action.type){
    case 'SET_SITES':{
      const d = {... state.data, sites:action.sites}
      return {... state,data:d}
    }
    default:{
      return state;
    }
  }
}

export default ViewReducer;
