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
let userUpdate

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

test('Deve atualizar o nome do usuário', async ({ assert, client }) => {
  userUpdate = {
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
})

test('Deve atualizar os idiomas do usuário', async ({ assert, client }) => {
  userUpdate.languages = [
    {
      id: 1,
      language: 'Ingles'
    },
    {
      id: 2,
      language: 'Espanhol'
    }
  ]

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
})

test('Deve atualizar as habilidades do usuário', async ({ assert, client }) => {
  userUpdate.skills = [
    {
      id: 1,
      skill: 'ADM'
    },
    {
      id: 2,
      skill: 'ENG'
    }
  ]

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

test('Deve adicionar 7 formações no banco de dados', async ({ assert, client }) => {
  const formations = [
    'Exatas/Engenharia',
    'Computação',
    'Administração',
    'Humanidades',
    'Jurídica',
    'Biológicas',
    'Ciências Médicas'
  ]

  for (const formation of formations) {
    const response = await client.post('/trainingAreas')
      .header('token', tokenUser)
      .send({ area: formation })
      .end()

    response.assertStatus(200)
    response.assertJSON({
      status: 200,
      message: `Formação ${formation} foi adicionada com sucesso!`,
      data: {
        formation
      }
    })
  }
})

test('Deve pegar todos os usuários cadastrados', async ({ assert, client }) => {
  const response = await client.get('/user')
    .header('token', tokenUser)
    .end()

  const user = {
    ...dataUser,
    languages: [
      {
        id: 1,
        language: 'Ingles'
      },
      {
        id: 2,
        language: 'Espanhol'
      }
    ]
  }
  user.name = 'Ideia Test'
  user.trainingAreas = []

  response.assertStatus(200)
  response.assertJSON({
    status: 200,
    data: [user]
  })
})
