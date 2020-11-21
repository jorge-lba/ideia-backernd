'use strict'
const Skill = use('App/Models/Skill')

class SkillController {
  async create ({ request, response }) {
    try {
      const { skill } = request.only(['skill'])

      await Skill.create({ skill })
      return response.status(200).json({
        status: 200,
        message: `Habilidade ${skill} foi adicionada com sucesso!`,
        data: {
          skill
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

module.exports = SkillController
