'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')
const SocialNetwork = use('App/Models/SocialNetwork')

const firebase = use('Firebase/Admin')

class UserController {
  async index ({ response }) {
    const users = await User.query().with('socialNetworks').fetch()
    return response.status(200).json({
      status: 200,
      data: users
    })
  }

  async create ({ request, response, auth }) {
    try {
      const userData = request.only([
        'name',
        'userTag',
        'email',
        'englishLevel',
        'spanishLevel',
        'profileImage'
      ])

      const idToken = request.header('token')

      const token = await firebase
        .auth()
        .verifyIdToken(idToken.toString())

      const uidAuth = token.uid

      const { socialNetworks: userSocialNetworks } = request
        .only([
          'socialNetworks'
        ])

      for (const socialNetwork of userSocialNetworks) {
        const { provider, url } = socialNetwork
        await SocialNetwork.create({
          uidUser: uidAuth,
          provider,
          url
        })
      }

      await User.create({ uidAuth, ...userData })

      return response.status(200).json({
        status: 200
      })
    } catch (error) {
      return { error }
    }
  }

  async update ({ request, response, auth }) {
    const { uid } = await firebase
      .auth()
      .verifyIdToken(request.header('token').toString())
    const userData = request.only([
      'name',
      'userTag',
      'email',
      'englishLevel',
      'spanishLevel',
      'profileImage'
    ])

    const user = await User.findBy('uidAuth', uid)
    await user.load('socialNetworks')
    user.merge(userData)
    await user.save()

    return response.status(200).json({
      status: 200,
      data: user
    })
  }
}

module.exports = UserController
