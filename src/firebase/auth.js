import Firebase from 'firebase/app'
import { firebase } from './firebase'
import 'firebase/auth'

export const auth = firebase.auth()

export const providers = {
  facebook: new Firebase.auth.FacebookAuthProvider(),
  github: new Firebase.auth.GithubAuthProvider(),
  google: new Firebase.auth.GoogleAuthProvider(),
  twitter: new Firebase.auth.TwitterAuthProvider(),
}