const express = require('express');
const router = express.Router();
const Car = require('../models/car')
//Get a list of cars from the database
router.get('/cars', function(req, res, next){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const point = {
         type: "Point",
         coordinates: [lng, lat]
     };
         Car.aggregate(
             [{
                 '$geoNear': {
                 'near': point,
                 'spherical': true,
                 'distanceField': 'dist.calculated',
                 'maxDistance': 100000
                 }
             }], function(err, cars) { 
                 if(err){ 
                     console.log(err)
                 }
                 res.json(cars)
             }
         )
});

//Add a list of cars from the database
router.post('/cars', function(req, res, next){
    Car.create(req.body).then(function(car){
        res.send(car);
    }).catch(next);
});

//update a list of cars from the database
router.put('/cars/:id', function(req, res, next){
    Car.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Car.findOne({_id: req.params.id}).then(function(car){
            res.send(car);
        });
    });
});

//delete a list of cars from the database
router.delete('/cars/:id', function(req, res, next){
    Car.findByIdAndRemove({_id: req.params.id}).then(function(car){
        res.send(car);
        });
});

module.exports = router; 