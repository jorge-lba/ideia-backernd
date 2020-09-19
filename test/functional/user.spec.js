const { test, trait, timeout } = use('Test/Suite')('User')
const loginFirebaseAuthentication = require('../utils/login.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Firebase = use('Firebase/Admin')

trait('Test/ApiClient')
timeout(8000)

let dataUser
let tokenUser
let uidUser

test('must create user', async ({ assert, client }) => {
  const { $attributes: userPayload } = await Factory
    .model('App/Models/User')
    .make()

  const userAuth = await Firebase
    .auth()
    .createUser(userPayload)

  const {
    displayName,
    email,
    uid
  } = userAuth

  dataUser = {
    ...userPayload,
    name: displayName,
    email,
    uidAuth: uid
  }

  delete dataUser.password
  delete dataUser.displayName
  delete dataUser.emailVerified
  delete dataUser.disabled

  tokenUser = await loginFirebaseAuthentication({ ...dataUser, password: userPayload.password })

  uidUser = dataUser.uidAuth

  const response = await client.post('/user')
    .send(dataUser)
    .header('token', tokenUser)
    .end()

  response.assertStatus(200)
})

test('Get all users', async ({ assert, client }) => {
  const response = await client.get('/user')
    .header('token', tokenUser)
    .end()
  delete dataUser.uidAuth
  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: [dataUser]
  })
})

test('Update user name', async ({ assert, client }) => {
  const userUpdate = {
    ...dataUser,
    name: 'Ideia Test'
  }

  const response = await client.put('/user')
    .header('token', tokenUser)
    .send(userUpdate)
    .end()

  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: {
      ...userUpdate
    }
  })
  await Firebase.auth().deleteUser(uidUser)
})
