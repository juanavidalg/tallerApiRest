const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    mail: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },   
    lastname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);