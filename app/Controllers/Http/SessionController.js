'use strict'

class SessionController {
    async store({ request, auth }){
        const { email, uid_auth } = request.only([
            'email',
            'uid_auth'
        ])

        const { token } = await auth.attempt(email, uid_auth)

        return { token }
    }
}

module.exports = SessionController
