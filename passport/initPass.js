var login = require('./login');
var signup = require('./signup');
var update = require('./update')
var User = require('../models/user');

module.exports = function(passport){

	// Serialize and Desiralize for persitent login
    passport.serializeUser(function(user, done) {
        //console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            //console.log('deserializing user:',user);
            done(err, user);
        });
    });
    // strategies for login and signup
    login(passport);
    signup(passport);
    update(passport)

}