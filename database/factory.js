'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    userTag: faker.last(),
    email: faker.email(),
    uidAuth: faker.string({ length: 16 }),
    emailVerified: false,
    password: faker.string({ length: 10 }),
    displayName: faker.name(),
    photoURL: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
    disabled: false
  }
})
