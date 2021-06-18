// first name, last name, email, username, password, deleted, role, phone number, shipping address
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }


})

var User = mongoose.model('user', userSchema);

module.exports = User
