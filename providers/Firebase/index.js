class FirebaseService {
  constructor (config) {
    // Include our firebase-admin module
    // Find out more at: https://firebase.google.com/docs/admin/setup
    const FirebaseAdmin = require('firebase-admin')

    // Initialize our priviledged firebase admin application
    FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert(config),

      databaseURL: process.env.FIREBASE_PROJECT_URL
    })

    // Return our FirebaseAdmin object
    return FirebaseAdmin
  }
}
module.exports = FirebaseService
