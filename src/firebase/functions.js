import { firebaseApp } from './firebase'
require('firebase/functions')

firebaseApp.functions()

if (process.env.VUE_APP_FIREBASE === 'emulator') {
  firebaseApp.functions().useFunctionsEmulator('http://localhost:5001')
}

export const updateUser = firebaseApp.functions().httpsCallable('updateUser')

export const getPageCollection = firebaseApp
  .functions()
  .httpsCallable('getPageCollection')
