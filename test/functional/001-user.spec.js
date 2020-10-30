const { test, trait, timeout } = use('Test/Suite')('User')
const UserTest = require('../utils/createUser.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Firebase = use('Firebase/Admin')

trait('Test/ApiClient')
timeout(32000)

let dataUser
let tokenUser
let uidUser

const removeDataUser = data => {
  data.name = data.displayName
  data.uidAuth = data.uid

  delete data.password
  delete data.displayName
  delete data.emailVerified
  delete data.disabled
  delete data.uidAuth
  delete data.uid

  data.userTag = null
  data.profileImage = null

  return data
}

test('Deve criar um usuário', async ({ assert, client }) => {
  const { $attributes: userPayload } = await Factory
    .model('App/Models/User')
    .make()

  const { userAuth, userToken } = await UserTest()

  dataUser = removeDataUser({
    displayName: userAuth.displayName,
    uid: userAuth.uid,
    ...userPayload
  })

  tokenUser = userToken

  uidUser = userAuth.uid

  const response = await client.post('/user')
    .send(dataUser)
    .header('token', tokenUser)
    .end()

  response.assertStatus(200)
})

test('Deve pegar todos os usuários cadastrados', async ({ assert, client }) => {
  const response = await client.get('/user')
    .header('token', tokenUser)
    .end()

  const user = { ...dataUser }

  user.socialNetworks = []

  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: [user]
  })
})

test('Deve atualizar o nome do usuário', async ({ assert, client }) => {
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
