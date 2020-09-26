const loginFirebaseAuthentication = require('../utils/login.js')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Firebase = use('Firebase/Admin')

const payload = async () => {
  const { $attributes: user } = await Factory
    .model('App/Models/User')
    .make()

  return user
}

const userAuth = async (userPayload) => await Firebase
  .auth()
  .createUser(userPayload)

const loginFirebase = async ({ email, password }) =>
  await loginFirebaseAuthentication({ email, password })

const tokenFirebase = async (
  user = payload,
  createUser = userAuth,
  login = loginFirebase
) => {
  const userData = await user()
  const userAuth = await createUser(userData)
  const userToken = await login(userData)

  return { userData, userAuth, userToken }
}

module.exports = tokenFirebase
