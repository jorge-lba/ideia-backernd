'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.get('/user', 'UserController.index')
Route.post('/user', 'UserController.create')
Route.put('/user', 'UserController.update')

Route.get('/socialNetwork', 'SocialNetworkController.index')
Route.post('/socialNetwork', 'SocialNetworkController.create')
Route.put('/socialNetwork', 'SocialNetworkController.update')

Route.get('/', () => {
  return {
    page: 'Home',
    message: 'Adonis'
  }
})
