const { test, trait } = use('Test/Suite')('Session')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

trait('Test/ApiClient')

test('The answer must be: unit testing', async ({ assert, client }) => {
    const {$attributes:payload} = await Factory
        .model('App/Models/User')
        .make()
       
    await User.create(payload)

    const response = await client.post('/sessions')
        .send( payload )
        .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})