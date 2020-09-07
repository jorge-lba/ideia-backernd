const { test, trait } = use('Test/Suite')('Session')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

trait('Test/ApiClient')

test('The answer must be: unit testing', async ({ assert, client }) => {
    const sessionPayload = {
        email: 'ideiatest@test.com',
        uid_auth: 'LfgRKhmc90wQKNUMEN9wgIDZDip0'
    }
    
    const user = await Factory
        .model('App/Models/User')
        .create( sessionPayload )
        
    const response = await client.post('/sessions')
        .send( sessionPayload )
        .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})