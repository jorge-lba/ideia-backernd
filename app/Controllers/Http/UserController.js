'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')
const SocialNetwork = use('App/Models/SocialNetwork')
const UserLanguage = use('App/Models/UserLanguage')
const UserSkill = use('App/Models/UserSkill')

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
      const skills = userData.skills

      delete userData.socialNetworks
      delete userData.languages
      delete userData.skills

      const user = await User.findBy('uidAuth', uid)

      user.merge(userData)

      if (socialNetworks) {
        await findOrCreateItemDatabase(SocialNetwork)(uid)('uidUser')('provider')(socialNetworks)
        await user.load('socialNetworks')
      }

      if (languages) {
        await findOrCreateItemDatabase(UserLanguage)(user.id)('userId')('language')(languages)
        await user.load('languages')
      }

      if (skills) {
        await findOrCreateItemDatabase(UserSkill)(user.id)('userId')('skill')(skills)
        await user.load('skills')
      }

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
