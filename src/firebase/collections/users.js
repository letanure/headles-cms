import FirestoreWrapper from '@/firebase/'

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
