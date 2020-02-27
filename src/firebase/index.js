import { firestore, serverTimestamp } from '@/firebase/firestore'
import { getPageCollection } from '@/firebase/functions'

export default class FirestoreWrapper {
  constructor(options = {}) {
    this.collection = options.name
    this.orderBy = options.orderBy || 'created'
    this.perPage = options.perPage || 10
  }

  getDoc(id) {
    return firestore.doc(`${this.collection}/${id}`)
  }

  getCollection() {
    console.log('getCollection', this.collection)
    return firestore.collection(this.collection)
  }

  async addItem(data, status = 'ACTIVE') {
    return this.getCollection().add({
      status: status,
      created: serverTimestamp,
      ...data,
    })
  }

  async updateItem(id, data) {
    const docSnap = this.getDoc(id)
    return await docSnap.set(
      {
        updated: serverTimestamp,
        ...data,
      },
      { merge: true },
    )
  }

  async getItem(id) {
    const docSnap = await this.getDoc(id).get()
    const data = await docSnap.data()
    return {
      id: docSnap.id,
      ref: docSnap.ref,
      exists: docSnap.exists,
      data: data,
    }
  }

  async deleteItem(id, status = 'DELETED') {
    const docSnap = this.getDoc(id)
    return await docSnap.set(
      {
        deleted: serverTimestamp,
        status: status,
      },
      { merge: true },
    )
  }

  async getPage({ page = 1 }) {
    const req = await getPageCollection({
      collection: this.collection,
      orderBy: this.orderBy,
      limit: this.perPage,
      offset: (page - 1) * this.perPage,
    })
    return req.data
  }
}
