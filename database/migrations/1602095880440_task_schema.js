'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table
        .integer('action_id')
        .notNullable()
        .references('id')
        .inTable('actions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name')
      table.string('description')
      table.string('level')
      table.string('state')
      table.date('deadline')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
