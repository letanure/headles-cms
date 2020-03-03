import FirestoreWrapper from '@/firebase/collections/firestoreWrapper.js'

class FirestoreUsers extends FirestoreWrapper {
  constructor(options = {}) {
    super(options, options)
    this.collection = 'users'
  }

  async deleteItem(id) {
    return super.deleteItem(id, 'DELETING')
  }
}

export default new FirestoreUsers()
