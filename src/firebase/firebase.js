import Firebase from 'firebase/app'
import credentials from './credentials'

export const firebase = Firebase.initializeApp(credentials)
