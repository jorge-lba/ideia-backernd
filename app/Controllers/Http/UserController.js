'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    const users = await User.all()

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
        'uidAuth',
        'englishLevel',
        'spanishLevel',
        'profileImage'
      ])

      await User.create(userData)

      return response.status(200).json({
        status: 200
      })
    } catch (error) {
      return { error }
    }
  }
}

module.exports = UserController
