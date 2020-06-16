var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    emails: { type: String, required: true },
    password: { type: String, required: true },
    token :{type: String}
});

module.exports = mongoose.model('User', userSchema);