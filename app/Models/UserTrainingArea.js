'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTrainingArea extends Model {
  trainingAreas () {
    return this.hasMany(
      'App/Models/TrainingArea',
      'id',
      'formationId'
    )
  }
}

module.exports = UserTrainingArea
