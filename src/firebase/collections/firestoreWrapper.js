import i18n from '@/plugins/i18n'
import { firestore, serverTimestamp } from '@/firebase/firestore'
import { getPageCollection } from '@/firebase/functions'
import { MessageBox } from 'element-ui'

function errorMessage(errorCode) {
  MessageBox.alert(
    i18n.tc(`general.messages.${errorCode}.message`),
    i18n.tc(`general.messages.${errorCode}.title`),
    {
      type: 'error',
    },
  )
}

export default class FirestoreWrapper {
  constructor(options = {}) {
    this.collection = options.name
    this.orderBy = options.orderBy || 'created'
    this.perPage = options.perPage || 10
  }

  getDoc(id) {
    try {
      return firestore.doc(`${this.collection}/${id}`)
    } catch (error) {
      errorMessage(error.code)
    }
  }

  getCollection() {
    try {
      return firestore.collection(this.collection)
    } catch (error) {
      errorMessage(error.code)
    }
  }

  async addItem(data, status = 'ACTIVE') {
    try {
      return this.getCollection().add({
        status: status,
        created: serverTimestamp,
        ...data,
      })
    } catch (error) {
      errorMessage(error.code)
    }
  }

  async updateItem(id, data) {
    try {
      const docSnap = this.getDoc(id)
      return await docSnap.set(
        {
          updated: serverTimestamp,
          ...data,
        },
        { merge: true },
      )
    } catch (error) {
      errorMessage(error.code)
    }
  }

  async getItem(id) {
    try {
      const docSnap = await this.getDoc(id).get()
      const data = await docSnap.data()
      return {
        id: docSnap.id,
        ref: docSnap.ref,
        exists: docSnap.exists,
        data: data,
      }
    } catch (error) {
      errorMessage(error.code)
    }
  }

  async deleteItem(id, status = 'DELETED') {
    try {
      const docSnap = this.getDoc(id)
      return await docSnap.set(
        {
          deleted: serverTimestamp,
          status: status,
        },
        { merge: true },
      )
    } catch (error) {
      errorMessage(error.code)
    }
  }

  async getPage({ page = 1 }) {
    try {
      const req = await getPageCollection({
        collection: this.collection,
        orderBy: this.orderBy,
        limit: this.perPage,
        offset: (page - 1) * this.perPage,
      })
      return req.data
    } catch (error) {
      errorMessage(error.code)
    }
  }
}
