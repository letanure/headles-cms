import { firebaseApp } from './firebase'
import 'firebase/storage'

export const storage = firebaseApp.storage()
