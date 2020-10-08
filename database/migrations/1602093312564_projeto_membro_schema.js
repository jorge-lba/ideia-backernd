'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjetoMembroSchema extends Schema {
  up () {
    this.create('projeto_membros', (table) => {
      table.increments()
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projetos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('coordinator')
      table.timestamps()
    })
  }

  down () {
    this.drop('projeto_membros')
  }
}

module.exports = ProjetoMembroSchema
