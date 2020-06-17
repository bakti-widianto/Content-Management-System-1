var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        if (err)
            console.log(err);
        else {
            this.password = hash;
            // this.token = this.generateToken();
            next();
        }
    })
});


module.exports = mongoose.model('User', userSchema);