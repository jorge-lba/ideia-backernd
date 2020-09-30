'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

const { test, trait, timeout } = use('Test/Suite')('Project')

trait('Test/ApiClient')
timeout(32000)

const fristUserData = async () => {
  const user = await User.first()
  const userData = user.$attributes
  userData.socialNetworks = []

  const userSocialNetworks = await user.socialNetworks().fetch()
  userSocialNetworks.rows.forEach(socialNetwork => userData
    .socialNetworks.push(
      socialNetwork.$attributes
    )
  )

  return userData
}

test(
  'Deve pegar as redes dos usuários',
  async ({ assert, client }) => {
    try {
      const { socialNetworks, uidAuth } = await fristUserData()

      const response = await client.get('/socialNetwork')
        .header('token', global.UserTokenFirebaseAuth)
        .end()
      const userSocialNetworks = response.body.data
        .filter(socialNetwork => socialNetwork.uidUser === uidAuth)

      response.assertStatus(200)

      userSocialNetworks.forEach((socialNetwork, index) => {
        assert.equal(socialNetwork.provider, socialNetworks[index].provider)
        assert.equal(socialNetwork.url, socialNetworks[index].url)
      })
    } catch (error) {
      console.log(error)
    }
  }
)

test(
  'Deve adicionar uma nova rede social para o usuário',
  async ({ assert, client }) => {
    const newSocialNetwork = {
      provider: 'Instagram',
      url: 'http://instagran.com/user'
    }

    const response = await client.post('/socialNetwork')
      .send({ socialNetworks: [newSocialNetwork] })
      .header('token', global.UserTokenFirebaseAuth)
      .end()

    const { socialNetworks } = await fristUserData()

    response.assertStatus(200)
    response.assertJSON({
      status: 200,
      message: 'Redes adicionadas com sucesso!'
    })

    const [socialNetwork] = socialNetworks.filter(
      socialNetwork =>
        socialNetwork.provider === newSocialNetwork.provider
    )

    assert.equal(socialNetwork.provider, newSocialNetwork.provider)
    assert.equal(socialNetwork.url, newSocialNetwork.url)
  }
)

test(
  'Deve atualizar a url da rede social do usuário',
  async ({ assert, client }) => {
    const updateSocialNetwork = {
      provider: 'facebook',
      current: '',
      updateTo: 'http://www.testRede.com'
    }
    const user = await fristUserData()

    const [socialNetworkCurrent] = user
      .socialNetworks.filter(socialNetwork => socialNetwork.provider === 'facebook')

    updateSocialNetwork.current = socialNetworkCurrent.url

    const response = await client.update('/socialNetwork')
      .send(updateSocialNetwork)
      .header('token', global.UserTokenFirebaseAuth)
      .end()

    response.assertStatus(200)
    response.assertJSON({
      status: 200,
      message: 'Redes atualizada com sucesso!'
    })
    console.log(updateSocialNetwork)
  }
)
