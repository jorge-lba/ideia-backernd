'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectOrganizationTypeSchema extends Schema {
  up () {
    this.create('project_organization_types', (table) => {
      table.increments()
      table
        .integer('area_id')
        .notNullable()
        .references('id')
        .inTable('occupation_area')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('project_organization_types')
  }
}

module.exports = ProjectOrganizationTypeSchema
