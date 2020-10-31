'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTrainingAreaSchema extends Schema {
  up () {
    this.create('user_training_areas', (table) => {
      table.increments()
      table
        .string('userId')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('formationId')
        .notNullable()
        .references('id')
        .inTable('training_areas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_training_areas')
  }
}

module.exports = UserTrainingAreaSchema
