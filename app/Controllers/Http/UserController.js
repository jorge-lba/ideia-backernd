'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')
const SocialNetwork = use('App/Models/SocialNetwork')
const UserLanguage = use('App/Models/UserLanguage')

const firebase = use('Firebase/Admin')

class UserController {
  async index ({ response }) {
    const users = await User.query()
      .with('socialNetworks')
      .with('trainingAreas')
      .with('languages')
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
        'email'
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
        'socialNetworks',
        'languages',
        'skills'
      ])

      const socialNetworks = userData.socialNetworks
      const languages = userData.languages

      delete userData.socialNetworks
      delete userData.languages

      const user = await User.findBy('uidAuth', uid)

      await findOrCreateItemDatabase(SocialNetwork)(uid)('uidUser')('provider')(socialNetworks)
      await findOrCreateItemDatabase(UserLanguage)(user.id)('userId')('language')(languages)

      user.merge(userData)

      await user.load('socialNetworks')
      await user.load('languages')

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

const findOrCreateItemDatabase = (Table) =>
  (id) =>
    (idField) =>
      (findField) =>
        async (datas) => {
          for (const data of datas) {
            const table = await Table.findOrCreate(
              { [idField]: id, [findField]: data[findField] },
              { [idField]: id, ...data }
            )

            table.merge(data)
            await table.save()
          }
        }

module.exports = UserController
