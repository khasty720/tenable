import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import { verifyCredentials } from './config/redux-token-auth-config'
import ScrollToTop from './components/router/ScrollToTop';

verifyCredentials(store);

ReactDOM.render((
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>
 ), document.getElementById('root'));
