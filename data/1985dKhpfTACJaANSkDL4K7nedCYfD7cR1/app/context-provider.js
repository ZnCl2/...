import React from 'react';
import ZeroNetReducer,{ZeroNetReducerInitialState} from './reducers/zeronet-reducer.js';
import AppReducer,{AppReducerInitialState} from './reducers/app-reducer.js';
import ViewReducer,{ViewReducerInitialState} from './reducers/view-reducer.js';

export const Context = React.createContext();
const Provider = Context.Provider;

const StoreContextProvider = (props) => {
  const [zeroNetState,zeroNetDispatch] = React.useReducer(ZeroNetReducer,ZeroNetReducerInitialState);
  const [appState, appDispatch] = React.useReducer(AppReducer,AppReducerInitialState);
  const [viewState, viewDispatch] = React.useReducer(ViewReducer,ViewReducerInitialState);

  return(
    <Provider {...props} value={{
      zeroNetState,zeroNetDispatch,
      appState,appDispatch,
      viewState,viewDispatch
    }}/>
  )
}

export default StoreContextProvider;
