import FirestoreWrapper from '@/firebase/collections/firestoreWrapper'

class FirestoreContentTypes extends FirestoreWrapper {
  constructor(options = {}) {
    super(options, options)
    this.collection = 'contentTypes'
  }
}

export default new FirestoreContentTypes()
