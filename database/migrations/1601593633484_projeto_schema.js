'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjetoSchema extends Schema {
  up () {
    this.create('projetos', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('cnpj').unique()
      table.string('typeOrganization').notNullable()
      table.string('description').notNullable()
      table.string('urlLogo')
      table.string('urlImage')
      table.string('urlSite')
      table.string('urlDonate')
      table.string('email').unique().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projetos')
  }
}

module.exports = ProjetoSchema
