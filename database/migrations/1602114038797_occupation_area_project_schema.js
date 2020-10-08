'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OccupationAreaProjectSchema extends Schema {
  up () {
    this.create('occupation_area_projects', (table) => {
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
    this.drop('occupation_area_projects')
  }
}

module.exports = OccupationAreaProjectSchema
