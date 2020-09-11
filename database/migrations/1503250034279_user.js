'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('user_tag', 30).notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('uid_auth').notNullable().unique()
      table.string('english_level')
      table.string('spanish_level')
      table.string('profile_image')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
