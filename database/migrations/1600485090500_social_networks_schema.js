'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialNetworksSchema extends Schema {
  up () {
    this.create('social_networks', (table) => {
      table.increments()
      table
        .string('uidUser')
        .notNullable()
        .references('uidAuth')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('provider').notNullable()
      table.string('url').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('social_networks')
  }
}

module.exports = SocialNetworksSchema
