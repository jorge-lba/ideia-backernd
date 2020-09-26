'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

const { test } = use('Test/Suite')('Project')

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

test('make sure 2 + 2 is 4', async ({ assert }) => {
  try {
    fristUserData()
  } catch (error) {
    console.log(error)
  }
})
