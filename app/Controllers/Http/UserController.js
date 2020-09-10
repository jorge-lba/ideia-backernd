'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model') */
const User = use('App/Models/User')

class UserController {
    async create ({request ,response, auth}){
       
        try {
            const userData = request.only([
                'name',
                'user_tag',
                'email',
                'uid_auth',
                'english_level',
                'spanish_level',
                'profile_image'
            ])
        
            const user = await User.create(userData)
        
            const { token } = await auth.attempt( 
                userData.email, 
                userData.uid_auth 
            )
    
            return {token}
        } catch (error) {
            return {error}
        }
        
    }
}

module.exports = UserController
