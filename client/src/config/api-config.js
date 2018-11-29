let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'tenable-challenge.herokuapp.com') {
  backendHost = 'https://tenable-challenge.herokuapp.com';
} else {
  backendHost = 'http://localhost:3001';
}

export const ApiConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  root: `${backendHost}/api/${apiVersion}`
}
