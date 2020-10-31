'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')
const SocialNetwork = use('App/Models/SocialNetwork')

const firebase = use('Firebase/Admin')

class UserController {
  async index ({ response }) {
    const users = await User.query()
      .with('socialNetworks')
      .with('trainingAreas')
      .fetch()
    return response.status(200).json({
      status: 200,
      data: users
    })
  }

  async create ({ request, response, auth }) {
    try {
      const userData = request.only([
        'name',
        // 'userTag',
        'email'
        // 'englishLevel',
        // 'spanishLevel',
        // 'profileImage'
      ])

      const idToken = request.header('token')

      const token = await firebase
        .auth()
        .verifyIdToken(idToken.toString())

      const uidAuth = token.uid
      await User.create({ uidAuth, ...userData })

      return response.status(200).json({
        status: 200
      })
    } catch (error) {
      return { error }
    }
  }

  async update ({ request, response, auth }) {
    try {
      const { uid } = await firebase
        .auth()
        .verifyIdToken(request.header('token').toString())
      const userData = request.only([
        'name',
        'userTag',
        'email',
        'phone',
        'state',
        'uf',
        'englishLevel',
        'spanishLevel',
        'profileImage',
        'socialNetworks'
      ])

      const socialNetworks = userData.socialNetworks

      delete userData.socialNetworks

      const user = await User.findBy('uidAuth', uid)

      for (const socialNetwork of socialNetworks) {
        const network = await SocialNetwork.findOrCreate(
          { uidUser: uid, provider: socialNetwork.provider },
          { uidUser: uid, ...socialNetwork }
        )

        network.merge(socialNetwork)
        await network.save()
      }

      user.merge(userData)

      await user.load('socialNetworks')
      await user.save()

      return response.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        status: 500,
        error
      })
    }
  }
}

module.exports = UserController
