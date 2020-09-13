const { test, trait, timeout } = use('Test/Suite')('User')
const loginFirebaseAuthentication = require('../utils/login.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Firebase = use('Firebase/Admin')

trait('Test/ApiClient')
timeout(8000)

let dataUser
let tokenUser

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
    name: displayName,
    email,
    uidAuth: uid
  }

  tokenUser = await loginFirebaseAuthentication({ ...dataUser, password: userPayload.password })

  dataUser.userTag = userPayload.userTag

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

  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: [{
      email: dataUser.email,
      name: dataUser.name,
      userTag: dataUser.userTag,
      englishLevel: null,
      profileImage: null,
      spanishLevel: null
    }]
  })

  await Firebase.auth().deleteUser(dataUser.uidAuth)
})

test('Update user name', async ({ assert, client }) => {
  const userUpdate = {
    ...dataUser,
    name: 'Ideia Test'
  }

  delete userUpdate.uidAuth

  const response = await client.put('/user')
    .header('token', tokenUser)
    .send(userUpdate)
    .end()

  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: {
      ...userUpdate,
      englishLevel: null,
      profileImage: null,
      spanishLevel: null
    }
  })
})
