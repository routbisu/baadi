const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const appConfig         = require('../app-config');
const validator         = require('./validation-service');

// Get user mongoose model
const UserModel = require('../models/user');

const authenticationService = {    
    /**
     * Adds a new user to the databse
     * @param {user} userdetail - Details of the user 
     * @returns  Promise with sucess object or errors object
     */
    AddNewUser: function(user) {

        // Data validations
        if (user.EmailId) {
            if (!validator.IsValidEmail(user.EmailId)) {
                reject({ ErrorMessage: 'INVALID_EMAIL' });
                return;
            } 
        }

        let promise = new Promise((resolve, reject) => {
            user.IsActive = true;
            user.UserRole = 'RESIDENT';
            let newUser = new UserModel(user);

            // Save new user to database
            newUser.save(function(err) {
                if(err) reject(err);
                resolve(true);
            });
        });

        return promise;
    },

    /**
     * Authenticates a user and generates an access token
     * @param {user} userdetail - Details of the user : Email and Password
     * @return promise
     */
    AuthenticateUser: function(userDetails) {
        return new Promise((resolve, reject) => {
            
            UserModel.findOne({ EmailId: userDetails.EmailId }, 
                (err, user) => {
                    if (err) { 
                        reject(err);
                        return;
                    }
                    if (!user)  {
                        reject({ ErrorMessage: 'USER_NOT_FOUND' });
                        return;
                    }

                    // Compare password
                    user.comparePassword(userDetails.Password).then(isMatch => {
                        if(isMatch) {
                            // Create the access token
                            let JWTToken = jwt.sign(
                                { UserId: user._id, EmailId: user.EmailId, UserRole: user.UserRole }, 
                                appConfig.PASSPORT_SECRET, 
                                { expiresIn: appConfig.TOKEN_VALIDITY });
                            
                            resolve({ token: 'Bearer ' + JWTToken });
                        }
                    }, err => {
                        reject({ ErrorMessage: 'INCORRECT_PASSWORD' });
                    })
                }
            );
        });
    },

    RefreshToken: function() {}
}

module.exports = authenticationService;