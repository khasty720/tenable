import { generateAuthActions } from 'redux-token-auth'
import { ApiConfig } from './api-config';

const authUrl = `${ApiConfig.root}/auth`;

const config = {
  authUrl,
  userAttributes: {
    name: 'name',
    image: 'image',
    nickname: 'nickname',
    uid: 'uid',
    client: 'client',
    accessToken: 'access-token',

  },
  userRegistrationAttributes: {
    nickname: 'nickname',
    email: 'email',
    password: 'password',
    password_confirmation: 'password_confirmation'
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
