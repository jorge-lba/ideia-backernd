'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionSchema extends Schema {
  up () {
    this.create('actions', (table) => {
      table.increments()
      table
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description')
      table.date('deadline')
      table.timestamps()
    })
  }

  down () {
    this.drop('actions')
  }
}

module.exports = ActionSchema
