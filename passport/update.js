var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    //https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
    //update strategy
    passport.use('update', new LocalStrategy({
        // we can use the whole request as callback
        passReqToCallback : true
    },
    function(req, username, password, done) {
        updateUser = function(){
            // find user from mongo
            User.findOne({ '_id' :  req.user._id }, function(err, user) {
                // if error use done to return error
                if (err){
                    console.log('Error updating: '+err);
                    return done(err);
                }
                // user already in mongo
                if (user) {
                    console.log('FOUND: '+req.user._id);

                    //validate new password if changed
                    if(req.param('newPassword').length !== 0) {
                        if (password === req.user.password) {
                            password = createHash(req.param('newPassword'));
                        }
                    }
                    // update local user info
                    user.password = createHash(password)
                    user.username = username;
                    user.email = req.param('email');
                    user.firstName = req.param('firstName');
                    user.lastName = req.param('lastName');

                    user.save(function(err) {
                        if (err){
                            console.log('Error Saving user: '+err);  
                            throw err;  
                        }
                        console.log('Update succesful');    
                        return done(null, user, req.flash('updatemsg', 'User info updated'));
                    });
                } 
            });
        };

        //we delay the execution of findOrCreateUser to the next tick in the event loop
        process.nextTick(updateUser);
    })
    );

    // hash password
    var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
