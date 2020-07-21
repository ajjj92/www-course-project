var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {type: String},
    username: {type: String },
    password: { type: String },
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String}
});

// Export model.
module.exports = mongoose.model('User', UserSchema);