const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB')
const personsRoute = require('./persons.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser:true}).then(
    ()=>{console.log('database is connected');},
    err=>{console.log('Can not connect to the database');}
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/persons', personsRoute);

app.listen(PORT, function(){
    console.log('Server is running on Port:', PORT);
})