import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import { verifyCredentials } from './config/redux-token-auth-config'

verifyCredentials(store);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
 ), document.getElementById('root'));
