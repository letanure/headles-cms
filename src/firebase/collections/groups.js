import FirestoreWrapper from '@/firebase/'

class FirestoreGroups extends FirestoreWrapper {
  constructor(options = {}) {
    super(options, options)
    this.collection = 'groups'
  }
}

export default new FirestoreGroups()
