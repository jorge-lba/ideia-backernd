'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSocialNetworkSchema extends Schema {
  up () {
    this.create('userSocialNetworks', (table) => {
      table
        .string('uidUser')
        .notNullable()
        .references('uidAuth')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .unique()
      table.string('provider').notNullable()
      table.string('url').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('userSocialNetworks')
  }
}

module.exports = UserSocialNetworkSchema
