var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    unique_id: { type: String },
    username: {type: String },
    password: { type: String }
});

// Export model.
module.exports = mongoose.model('User', UserSchema);