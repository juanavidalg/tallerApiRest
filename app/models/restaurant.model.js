const mongoose = require('mongoose');
const RestaurantSchema = mongoose.Schema({
    code: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);