var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    //signup strategy
	passport.use('signup', new LocalStrategy({
         // we can use the whole request as callback
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function(){
                // find user from mongo
                User.findOne({ 'username' :  username }, function(err, user) {
                    // if error use done to return error
                    if (err){
                        console.log('Error SignUp: '+err);
                        return done(err);
                    }
                    // user already in mongo
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that info
                        // make new user
                        var newUser = new User();

                        // set local user info
                        //create unique id using date and random numbers
                        newUser._id = Date.now().toString(36) + Math.random().toString(36).substr(2);
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save user to mongo
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error Saving user: '+err);  
                                throw err;  
                            }
                            console.log('Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };

            //we delay the execution of findOrCreateUser to the next tick in the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // hash password
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

 
}