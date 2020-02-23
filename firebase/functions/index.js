const admin = require('firebase-admin')
const functions = require('firebase-functions')
const serviceAccount = require('./serviceAccountKey.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://headles-cms-vue.firebaseio.com',
  })
}

async function softDeteleUser(user) {
  const requestUser = admin
    .firestore()
    .collection('users')
    .where('uid', '==', user.uid)
    .get()
  const querySnapshotUser = await requestUser
  const querySnapshotUserDoc = querySnapshotUser.docs[0]
  if (querySnapshotUserDoc) {
    querySnapshotUserDoc.ref.update({
      status: 'DELETED',
      deleted: admin.firestore.Timestamp.now(),
    })
  }
}

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

async function createUserOnFirebaseAuth({ email, name, password }) {
  const UserRecord = await admin.auth().createUser({
    email: email,
    emailVerified: false,
    displayName: name,
    password: password,
  })
  return UserRecord
}

async function deleteUserOnFirebaseAuth({ uid }) {
  const UserRecord = await admin.auth().deleteUser(uid)
  return UserRecord
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

function normalizeProviderData(providerData) {
  return providerData.map((provider) => {
    return {
      uid: provider.uid ? provider.uid : null,
      displayName: provider.displayName ? provider.displayName : null,
      email: provider.email ? provider.email : null,
      photoURL: provider.photoURL ? provider.photoURL : null,
      providerId: provider.providerId ? provider.providerId : null,
      phoneNumber: provider.phoneNumber ? provider.phoneNumber : null,
    }
  })
}

async function updateUserData(userRef, userRecord) {
  return userRef.set(
    {
      // metadata: userRecord.metadata,
      created: userRecord.created ? userRecord.created : null,
      customClaims: userRecord.customClaims ? userRecord.customClaims : null,
      deleted: null,
      disabled: userRecord.disabled,
      displayName: userRecord.displayName,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      phoneNumber: userRecord.phoneNumber ? userRecord.phoneNumber : null,
      photoURL: userRecord.photoURL ? userRecord.photoURL : null,
      providerData: normalizeProviderData(userRecord.providerData),
      status: 'ACTIVE',
      tenantId: userRecord.tenantId ? userRecord.tenantId : null,
      uid: userRecord.uid,
    },
    { merge: true },
  )
}

async function getUsersByEmail(email) {
  return await admin
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
}

async function registerUserOnAuthCreate(UserRecord) {
  const email = UserRecord.email || findEmailInProvider(UserRecord.providerData)
  const existentUsers = await getUsersByEmail(email)
  let userRef = null
  if (existentUsers.docs && existentUsers.docs[0]) {
    userRef = existentUsers.docs[0].ref
  } else {
    userRef = admin
      .firestore()
      .collection('users')
      .doc()
  }
  UserRecordData = {
    ...UserRecord,
    created: admin.firestore.Timestamp.now(),
  }
  const WriteResult = await updateUserData(userRef, UserRecordData)
  return WriteResult
}

async function updateMetaCount(collectionName, operation) {
  const metadataRef = await admin.firestore().doc(`metadata/${collectionName}`)
  const metadataDoc = await metadataRef.get()
  if (metadataDoc.data()) {
    const count = metadataDoc.data()
    let newTotal = count.total
    let newActive = count.active
    let newDeleted = count.deleted
    if (operation === 'CREATE') {
      newTotal += 1
      newActive += 1
    }
    if (operation === 'DELETE') {
      newActive -= 1
      newDeleted += 1
    }
    metadataRef.update(
      {
        active: newActive,
        deleted: newDeleted,
        total: newTotal,
      },
      { merge: true },
    )
  } else {
    metadataRef.set({
      active: 1,
      deleted: 0,
      total: 1,
    })
  }
}

exports.collectionGroupsCreate = functions.firestore
  .document('/groups/{groupId}')
  .onCreate(async (snapshotUser, context) => {
    return updateMetaCount('groups', 'CREATE')
  })

exports.collectionGroupsDelete = functions.firestore
  .document('/groups/{groupId}')
  .onWrite(async (change, context) => {
    const data = change.after.data()
    if (data.status && data.status === 'DELETED') {
      return updateMetaCount('groups', 'DELETE')
    }
    return true
  })

exports.collectionUserAdd = functions.firestore
  .document('/users/{userId}')
  .onCreate(async (snapshotUser, context) => {
    const { email, name, password } = snapshotUser.data()
    const UserRecord = await createUserOnFirebaseAuth({ email, name, password })
    updateMetaCount('users', 'CREATE')
    return UserRecord
  })

exports.collectionUserUpdate = functions.firestore
  .document('/users/{userId}')
  .onWrite(async (change, context) => {
    const userdata = change.after.data()
    if (userdata.status && userdata.status === 'DELETING') {
      deleteUserOnFirebaseAuth(change.after.data())
    }
    return true
  })

exports.onAuthCreateUser = functions.auth
  .user()
  .onCreate(async (UserRecord) => {
    return await registerUserOnAuthCreate(UserRecord)
  })

// delete on console firebase
exports.onDeleteUser = functions.auth.user().onDelete(async (user) => {
  softDeteleUser(user)
  updateMetaCount('users', 'DELETE')
  return true
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
  let dataMeta = {}
  if (docMeta.data()) {
    dataMeta = docMeta.data()
  }
  const request = admin
    .firestore()
    .collection(collection)
    .orderBy(orderBy)
    .where('status', 'in', ['ACTIVE', 'DELETING', 'NEW'])
    .limit(limit)
    .offset(offset)
    .get()
  const dataRequest = await request
  let dataPage = {}
  if (dataRequest.size) {
    const dataPromise = Promise.all(
      dataRequest.docs.map(async (user) => {
        return {
          id: user.id,
          ...user.data(),
        }
      }),
    )
    dataPage = await dataPromise
  }
  return {
    meta: dataMeta,
    page: dataPage,
  }
})
