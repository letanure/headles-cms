import Firebase from 'firebase/app'
import { firebase } from './firebase'
import 'firebase/auth'

export const auth = firebase.auth()

export const providerGoogle = new Firebase.auth.GoogleAuthProvider()
export const providerFacebook = new Firebase.auth.FacebookAuthProvider()
