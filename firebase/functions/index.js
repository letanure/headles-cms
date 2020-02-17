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

exports.onCreateUser = functions.auth.user().onCreate((user) => {
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
        })
      }
      return true
    })
    .catch((err) => {
      console.log(err)
    })
})

exports.createUser = functions.https.onCall((data, context) => {
  const { email, name, password } = data

  if (!context.auth) {
    throw new functions.https.HttpsError('auth required')
  }

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
