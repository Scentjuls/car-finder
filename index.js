const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set Up Express App
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/carsfinder');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());

//Initializing the routes 
app.use('/api', require('./routes/api')); 

//error handling middleware
app.use(function(err, req, res, next){
res.status(422).send({error: err.message});
});

//Listen For Requests
app.listen(process.env.port || 5000, function(){
console.log("Listening on Port 5000");
});