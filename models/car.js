const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

//Create the cars schema and models
const CarSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    model: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    //Add a geolocation
    geometry: GeoSchema    
});



const Car = mongoose.model('Car', CarSchema);

module.exports = Car;