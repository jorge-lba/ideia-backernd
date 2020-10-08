'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizationTypeSchema extends Schema {
  up () {
    this.create('organization_types', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('organization_types')
  }
}

module.exports = OrganizationTypeSchema
