import axios from 'axios';

let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === 'tenable-challenge.herokuapp.com') {
  backendHost = 'https://tenable-challenge.herokuapp.com';
} else if (hostname === 'http://localhost:3000') {
  backendHost = 'http://localhost:3000';
} else {
  backendHost = 'http://localhost:3001';
}

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = `${backendHost}/api/${apiVersion}`;

axios.interceptors.request.use(function (config) {
  const accessToken = window.localStorage.getItem('access-token');
  const client = window.localStorage.getItem('client');
  const uid = window.localStorage.getItem('uid');
  config.headers[config.method] = {
    'access-token': accessToken,
    'client': client,
    'uid': uid
  }
  return config;
});

export const ApiConfig = {
  root: `${backendHost}/api/${apiVersion}`
}
