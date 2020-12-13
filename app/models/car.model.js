const mongoose = require('mongoose');
const CarSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    state: {
        type: String
    }
});

module.exports = mongoose.model('Car', CarSchema);