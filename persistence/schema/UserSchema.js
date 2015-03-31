var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    _id: Schema.ObjectId,
    code: String,
    token: String,
    email: String,
    tokenRetrieved: Date,
    retrievalStatus: Boolean
});

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;