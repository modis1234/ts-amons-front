import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import rootReducer from './modules';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk,
      // .withExtraArgument({
      //     history: customHistory,
      // }),
      // logger,
    ),
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/hdb2">
    <Provider store={store}>
      {/* <ScrollToTop /> */}
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
