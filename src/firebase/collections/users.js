import FirestoreWrapper from '@/firebase/'

class FirestoreUsers extends FirestoreWrapper {
  constructor(options = {}) {
    super(options, options)
    this.collection = 'users'
  }
}

export default new FirestoreUsers()
