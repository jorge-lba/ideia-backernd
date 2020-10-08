'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialNetworkProjectSchema extends Schema {
  up () {
    this.create('social_network_projects', (table) => {
      table.increments()
      table
        .string('project_id')
        .notNullable()
        .references('uidAuth')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('provider').notNullable()
      table.string('url').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('social_network_projects')
  }
}

module.exports = SocialNetworkProjectSchema
