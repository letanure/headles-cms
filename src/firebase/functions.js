import { firebase } from './firebase'
require('firebase/functions')

firebase.functions()

export const createUser = firebase.functions().httpsCallable('createUser')

export const deleteUser = firebase.functions().httpsCallable('deleteUser')

export const updateUser = firebase.functions().httpsCallable('updateUser')

export const getPageCollection = firebase
  .functions()
  .httpsCallable('getPageCollection')
