'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VacanciesSchema extends Schema {
  up () {
    this.create('vacancies', (table) => {
      table.increments()
      table
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('skill_id')
        .notNullable()
        .references('id')
        .inTable('skills')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('busy').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vacancies')
  }
}

module.exports = VacanciesSchema
