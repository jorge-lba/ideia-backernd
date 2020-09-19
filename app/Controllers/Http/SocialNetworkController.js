'use strict'

const SocialNetwork = use('App/Model/SocialNetwork')

class SocialNetworkController {
  async index () {
    const socialNetworks = await SocialNetwork.all()

    return socialNetworks
  }
}

module.exports = SocialNetworkController
