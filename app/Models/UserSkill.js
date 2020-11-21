'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserSkill extends Model {
  static get hidden () {
    return [
      'userId',
      'created_at',
      'updated_at'
    ]
  }
}

module.exports = UserSkill
