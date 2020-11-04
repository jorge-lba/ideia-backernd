'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
// const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    // this.addHook('beforeSave', async (userInstance) => {
    //   if (userInstance.dirty.uidAuth) {
    //     userInstance.uidAuth = await Hash.make(userInstance.uidAuth)
    //   }
    // })
  }

  static get primaryKey () {
    return 'uidAuth'
  }

  static get hidden () {
    return [
      'uidAuth',
      'created_at',
      'updated_at'
    ]
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasOne('App/Models/Token')
  }

  socialNetworks () {
    return this.hasMany(
      'App/Models/SocialNetwork',
      'uidAuth',
      'uidUser'
    )
  }

  trainingAreas () {
    return this.hasMany(
      'App/Models/UserTrainingArea',
      'id',
      'userId'
    )
  }

  languages () {
    return this.hasMany(
      'App/Models/UserLanguage',
      'id',
      'userId'
    )
  }
}

module.exports = User
