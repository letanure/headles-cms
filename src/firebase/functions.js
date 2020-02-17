import { firebase } from './firebase'
require('firebase/functions')

firebase.functions()

export const createUser = firebase.functions().httpsCallable('createUser')
