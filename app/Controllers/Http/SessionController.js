'use strict'

class SessionController {
  async store ({ request, auth }) {
    const { email, uidAuth } = request.only([
      'email',
      'uidAuth'
    ])

    const { token } = await auth.attempt(email, uidAuth)

    return { token }
  }
}

module.exports = SessionController
