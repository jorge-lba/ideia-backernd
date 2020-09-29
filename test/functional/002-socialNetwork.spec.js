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

test('Deve pegar as redes dos usuários', async ({ assert, client }) => {
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
})
