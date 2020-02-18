const admin = require('firebase-admin')
const functions = require('firebase-functions')
const serviceAccount = require('./serviceAccountKey.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://headles-cms-vue.firebaseio.com',
  })
}

function findEmailInProvider(providers) {
  let email = null
  providers.forEach((providerData) => {
    if (providerData.email !== null && providerData.email !== '') {
      email = providerData.email
    }
  })
  return email
}

exports.onAuthCreateUser = functions.auth.user().onCreate((user) => {
  const email = user.email || findEmailInProvider(user.providerData)
  const userData = {
    email: email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    disabled: user.disabled,
    uid: user.uid,
    status: 'ACTIVE',
    created: admin.firestore.Timestamp.now(),
    deleted: null,
    providerData: user.providerData.map((providerData) => {
      return {
        providerId: providerData.providerId,
        uid: providerData.uid,
      }
    }),
  }
  if (userData.uid) {
    admin
      .firestore()
      .collection('users')
      .add(userData)
    return true
  } else {
    return false
  }
})

exports.onDeleteUser = functions.auth.user().onDelete((user) => {
  admin
    .firestore()
    .collection('users')
    .where('uid', '==', user.uid)
    .get()
    .then((snap) => {
      if (snap.docs[0]) {
        snap.docs[0].ref.update({
          status: 'DELETED',
          deleted: admin.firestore.Timestamp.now(),
        })
      }
      return true
    })
    .catch((err) => {
      console.log(err)
    })
})

exports.createUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('auth required')
  }

  const { email, name, password } = data
  return admin
    .auth()
    .createUser({
      email,
      displayName: name,
      password: password,
    })
    .then((userRecord) => {
      return { success: userRecord.uid }
    })
    .catch((error) => {
      return error
    })
})

exports.updateUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('auth required')
  }

  const { email, name, password, uid } = data
  let newDataUser = {
    email: email,
    displayName: name,
  }
  if (password) {
    newDataUser.password = password
  }

  return admin
    .auth()
    .updateUser(uid, newDataUser)
    .then((userRecord) => {
      return { success: userRecord.uid }
    })
    .catch((error) => {
      return error
    })
})

exports.deleteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('auth required')
  }

  const { uid } = data

  return admin
    .auth()
    .deleteUser(uid)
    .then((userRecord) => {
      return true
    })
    .catch((error) => {
      return error
    })
})

exports.onCreateUser = functions.firestore
  .document('users/{userId}')
  .onCreate((snapshot, context) => {
    return admin.firestore().runTransaction(async (transaction) => {
      // Get the metadata and incement the count.
      const metaRef = admin.firestore().doc('metadata/users')
      const metaData = (await transaction.get(metaRef)).data()
      const number = metaData.count + 1
      transaction.update(metaRef, {
        count: number,
      })

      // Update User
      const userRef = snapshot.ref

      transaction.set(
        userRef,
        {
          number,
        },
        { merge: true },
      )
    })
  })

exports.getPageCollection = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('auth required')
  }

  const { collection, orderBy, limit, offset } = data
  const requestMeta = admin
    .firestore()
    .doc(`metadata/${collection}`)
    .get()
  const docMeta = await requestMeta
  const dataMeta = docMeta.data()

  const request = admin
    .firestore()
    .collection(collection)
    .orderBy(orderBy)
    .where('status', '==', 'ACTIVE')
    .limit(limit)
    .offset(offset)
    .get()
  const dataRequest = await request
  const dataPromise = Promise.all(
    dataRequest.docs.map(async (user) => user.data()),
  )
  const dataPage = await dataPromise
  return {
    meta: dataMeta,
    page: dataPage,
  }
})
