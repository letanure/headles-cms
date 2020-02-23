import Firebase from 'firebase/app'
import { firebaseApp } from './firebase'
import 'firebase/auth'

export const auth = firebaseApp.auth()

const providersConfig = [
  {
    name: 'facebook',
    obj: new Firebase.auth.FacebookAuthProvider(),
    scopes: ['email'],
  },
  {
    name: 'github',
    obj: new Firebase.auth.GithubAuthProvider(),
    scopes: ['user:email'],
  },
  {
    name: 'google',
    obj: new Firebase.auth.GoogleAuthProvider(),
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  },
  {
    name: 'twitter',
    obj: new Firebase.auth.TwitterAuthProvider(),
    scopes: [],
  },
]

const providersWithScope = {}
providersConfig.forEach((provider) => {
  provider.scopes.forEach((scope) => {
    provider.obj.addScope(scope)
  })
  providersWithScope[provider.name] = provider.obj
})

export const providers = providersWithScope
