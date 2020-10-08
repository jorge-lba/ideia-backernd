'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionMemberSchema extends Schema {
  up () {
    this.create('action_members', (table) => {
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
      table
        .integer('action_id')
        .notNullable()
        .references('id')
        .inTable('actions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('coordinator')
      table.timestamps()
    })
  }

  down () {
    this.drop('action_members')
  }
}

module.exports = ActionMemberSchema
