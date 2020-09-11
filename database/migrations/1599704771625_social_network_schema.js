'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialNetworkSchema extends Schema {
  up () {
    this.create('social_networks', (table) => {
      table.increments()
      table
        .string('user_email')
        .notNullable()
        .references('email')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('provider').notNullable()
      table.string('url').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('social_networks')
  }
}

module.exports = SocialNetworkSchema
