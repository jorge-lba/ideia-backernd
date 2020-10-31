'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrainingAreaSchema extends Schema {
  up () {
    this.create('training_areas', (table) => {
      table.increments()
      table.string('area').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('training_areas')
  }
}

module.exports = TrainingAreaSchema
