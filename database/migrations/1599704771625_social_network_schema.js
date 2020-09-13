'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialNetworkSchema extends Schema {
  up () {
    this.create('socialNetworks', (table) => {
      table
        .string('userEmail')
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
    this.drop('socialNetworks')
  }
}

module.exports = SocialNetworkSchema
