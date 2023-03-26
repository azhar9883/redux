import React from 'react';
import Main from './Components/Main';
import { Provider } from "react-redux"
import './Components/style.css'



import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./redux/rootReducer";
const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <>
      <Provider store={store}>
     <Main />
      </Provider>
      

    </>
  );
}

export default App;
