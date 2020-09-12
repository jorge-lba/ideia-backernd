'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

class UserController {
  async create ({ request, response, auth }) {
    try {
      const userData = request.only([
        'name',
        'userTag',
        'email',
        'uidAuth',
        'englishLevel',
        'spanishLevel',
        'profileImage'
      ])

      await User.create(userData)

      const { token } = await auth.attempt(
        userData.email,
        userData.uidAuth
      )

      return { token }
    } catch (error) {
      return { error }
    }
  }
}

module.exports = UserController
