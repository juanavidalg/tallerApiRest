const mongoose = require('mongoose');
const PlateSchema = mongoose.Schema({
    restaurant: {
        type: String,
        required: true
    },    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },    
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Plate', PlateSchema);