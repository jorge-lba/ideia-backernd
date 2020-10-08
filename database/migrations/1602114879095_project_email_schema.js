'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectEmailSchema extends Schema {
  up () {
    this.create('project_emails', (table) => {
      table.increments()
      table
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('email').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_emails')
  }
}

module.exports = ProjectEmailSchema
