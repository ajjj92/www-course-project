var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String },
    password: { type: String },
    email: {type: String},

});

// Export model.
module.exports = mongoose.model('User', UserSchema);