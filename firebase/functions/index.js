const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({})
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

exports.registerNewUser = functions.auth.user().onCreate((user) => {
  const email = user.email || findEmailInProvider(user.providerData)
  const userData = {
    email: email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    disabled: user.disabled,
    uid: user.uid,
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