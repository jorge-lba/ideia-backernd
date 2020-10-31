'use strict'
const TrainingArea = use('App/Models/TrainingArea')

class TrainingAreaController {
  async create ({ request, response }) {
    try {
      const formation = request.only(['area'])

      await TrainingArea.create(formation)
      return response.status(200).json({
        status: 200,
        message: `Formação ${formation.area} foi adicionada com sucesso!`,
        data: {
          formation: formation.area
        }
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error
      })
    }
  }
}

module.exports = TrainingAreaController
