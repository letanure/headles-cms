import firebase from 'firebase/app'
import { firebaseApp } from './firebase'
import 'firebase/firestore'

export const firestore = firebaseApp.firestore()

if (process.env.VUE_APP_FIREBASE === 'emulator') {
  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
  })
}

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
