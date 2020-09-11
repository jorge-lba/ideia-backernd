const { test, trait, timeout } = use('Test/Suite')('User')
const loginFirebaseAuthentication = require('../utils/login.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

trait('Test/ApiClient')
timeout(8000)

const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

test('must create user', async ({ assert, client }) => {

  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_PROJECT_URL
  });
  
  const {$attributes:userPayload} = await Factory
    .model('App/Models/User')
    .make()

  const userAuth = await admin
    .auth()
    .createUser( userPayload )

  const { 
    displayName,
    email,
    uid
  } = userAuth
  
  const user = {
    name: displayName,
    email,
    uid_auth: uid
  }

  const idToken = await loginFirebaseAuthentication({...user, password: userPayload.password})
 
  const decodedToken = await admin
  .auth()
  .verifyIdToken(idToken)
  
  console.log(decodedToken)

  

  user.user_tag = userPayload.user_tag

  const response = await client.post('/user')
    .send( user )
    .end()
  
  await admin.auth().deleteUser(user.uid_auth)
  
  response.assertStatus(200)
  assert.exists(response.body.token)

})
