import Firebase from 'firebase/app'
import { firebase } from './firebase'
import 'firebase/auth'

export const auth = firebase.auth()

export const providerFacebook = new Firebase.auth.FacebookAuthProvider()
export const providerGithub = new Firebase.auth.GithubAuthProvider()
export const providerGoogle = new Firebase.auth.GoogleAuthProvider()
export const providerTwitter = new Firebase.auth.TwitterAuthProvider()