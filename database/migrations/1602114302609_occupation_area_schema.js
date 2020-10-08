'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OccupationAreaSchema extends Schema {
  up () {
    this.create('occupation_areas', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('occupation_areas')
  }
}

module.exports = OccupationAreaSchema
