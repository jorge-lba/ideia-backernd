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
    
    const userPayload = {
        name:payload.name,
        user_tag: payload.user_tag,
        email:payload.email,
        uid_auth: payload.uid_auth
    }

    await User.create(userPayload)

    const response = await client.post('/sessions')
        .send( userPayload )
        .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})