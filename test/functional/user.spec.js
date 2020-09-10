const { test, trait } = use('Test/Suite')('User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

trait('Test/ApiClient')

test('must create user', async ({ assert, client }) => {
  const {$attributes:payload} = await Factory
    .model('App/Models/User')
    .make()

  const response = await client.post('/user')
    .send( payload )
    .end()

  console.log(response)
  
  response.assertStatus(200)
  assert.exists(response.body.token)
})
