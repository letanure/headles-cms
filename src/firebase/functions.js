import { firebase } from './firebase'
require('firebase/functions')

firebase.functions()

export const createUser = firebase.functions().httpsCallable('createUser')

export const getPageCollection = firebase
  .functions()
  .httpsCallable('getPageCollection')
