'use strict'

const SocialNetwork = use('App/Models/SocialNetwork')
const firebase = use('Firebase/Admin')

class SocialNetworkController {
  async index ({ response }) {
    try {
      const socialNetworks = await SocialNetwork.all()
      return response.status(200).json({
        status: 200,
        data: socialNetworks
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error
      })
    }
  }

  async create ({ request, response }) {
    try {
      const data = request.only(['socialNetworks'])
      const idToken = request.header('token')

      const token = await firebase
        .auth()
        .verifyIdToken(idToken.toString())

      const uidAuth = token.uid

      for (const socialNetwork of data) {
        const { provider, url } = socialNetwork
        await SocialNetwork.create({
          uidUser: uidAuth,
          provider,
          url
        })
      }

      return response.status(200).json({
        status: 200,
        message: 'Redes adicionadas com sucesso!'
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error
      })
    }
  }
}

module.exports = SocialNetworkController
