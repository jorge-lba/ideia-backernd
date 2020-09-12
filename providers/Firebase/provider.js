'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class FirebaseProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Firebase/Admin', (app) => {
      // Obtain application configuration in config/
      const Config = require("../../serviceAccountKey.json")

      // Export our service
      return new (require('.'))(Config)
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = FirebaseProvider
