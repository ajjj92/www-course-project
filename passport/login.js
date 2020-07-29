var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
 //https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
    //login strategy
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check from mongo if username 
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // use done to return in case of errors
                    if (err)
                        return done(err);
                    // if no username in Mongo 
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // if wrong password redirect back to login page
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // 
                    }
                    // if username and password ok, return succesfully
                    return done(null, user);
                }
            );

        })
    );

    //use bcrypt to validate password, returns true or false
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
