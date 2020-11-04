'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserLanguageSchema extends Schema {
  up () {
    this.create('user_languages', (table) => {
      table.increments()
      table
        .integer('userId')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('language')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_languages')
  }
}

module.exports = UserLanguageSchema
