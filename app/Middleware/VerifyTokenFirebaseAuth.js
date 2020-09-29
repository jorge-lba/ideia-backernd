'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const firebase = use('Firebase/Admin')

class VerifyTokenFirebaseAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    try {
      const idToken = request.header('token')

      if (idToken === undefined) return response.status(400).json({ message: 'Token is undefined' })

      const token = await firebase
        .auth()
        .verifyIdToken(idToken.toString())

      const date = parseInt(Date.now() / 1000)

      if (date > token.exp) return response.status(400).json({ message: 'Token expired' })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message
      })
    }

    await next()
  }
}

module.exports = VerifyTokenFirebaseAuth
