const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Persons = new Schema({
    name: {
        type: String
    },
    company: {
        type: String
    },
    age:{
        type: Number
    }
},{
    collection:'person'
});


module.exports = mongoose.model('Persons', Persons);