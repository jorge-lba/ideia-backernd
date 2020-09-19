'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialNetwork extends Model {
  static get hidden () {
    return [
      'uidUser',
      'created_at',
      'updated_at',
      'id'
    ]
  }
}

module.exports = SocialNetwork
