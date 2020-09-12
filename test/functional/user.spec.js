const { test, trait, timeout } = use('Test/Suite')('User')
const loginFirebaseAuthentication = require('../utils/login.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Firebase = use('Firebase/Admin')

trait('Test/ApiClient')
timeout(8000)

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

  const user = {
    name: displayName,
    email,
    uidAuth: uid
  }

  const idToken = await loginFirebaseAuthentication({ ...user, password: userPayload.password })

  user.userTag = userPayload.userTag

  const response = await client.post('/user')
    .send(user)
    .header('token', idToken)
    .end()

  await Firebase.auth().deleteUser(user.uidAuth)

  response.assertStatus(200)
  assert.exists(response.body.token)
})
