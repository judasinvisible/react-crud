const express = require('express');

const personRoutes = express.Router();

//let Person = require('./business.model');

const AWS = require('aws-sdk');
const config = require('./config');
const uuid = require('uuid');

AWS.config.update(config.aws_remote_congif);

const doClient = new AWS.DynamoDB.DocumentClient();

// personRoutes.route('/add').post(function(req,res){
//     let person = new Person(req.body);

//     console.log(req.body);
//     person.save().then(person => {
//         res.status(200).json({'person': 'person in added successfully'});
//     }).catch(err => {
//         res.status(400).send('unable to save to database')
//     });
// });

personRoutes.route('/').get(function(req,res) {
    const params={
        TableName: config.aws_table_name
    }

    doClient.scan(params,function(err, persons) {
        if(err) {
            console.log(err);
            res.send({
                success: false,
                message: err
            });

        }else {
            const {Items} = persons;
            res.send({
                success: true,
                data: Items
            });
        }
    });
});


personRoutes.route('/add').post(function(req,res){
    const Item = {...req.body};
    Item.id = uuid.v1();
    const params ={
        TableName:config.aws_table_name,
        Item:Item
    };

    doClient.put(params, function(err,data){
        if(err){
            res.send({
                success:false,
                message: 'err at add function'
            });
        }else {
            res.send({
                success: true,
                message:'Added person',
                person : data
            });
        }
    }
    
    );
})

// personRoutes.route('/').get(function (req, res) {
//     Person.find(function(err, persons){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(persons);
//         }
//     });
// });

 //Defined edit route
// personRoutes.route('/edit/:id').get((req,res)=>{
//     let id = req.params.id;
//     Person.findById(id,(err,person)=>{
//         res.json(person);
//     });
// });

personRoutes.route('/edit/:id').get((req,res)=>{
    let id = req.params.id;
    const params = {
        TableName: config.aws_table_name,
        Key: {
            'id':id,
        }
    }
    doClient.get(params,function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});



//defined update route
// personRoutes.route('/update/:id').post(function(req,res){
//     Person.findById(req.params.id,function(err,person){
//         if(!person){
//             res.status(404).send('data is not found');
//         }else{
//             console.log(person);
//             person.name  = req.body.name;
//             person.company = req.body.company;
//             person.age = req.body.age;

//             person.save().then(person=>{
//                 res.json('update complete');
//             }).catch(err=>{
//                 res.status(400).send('unable to update');
//             });
//         }
//     });
// });

personRoutes.route('/update/:id').post(function(req,res){
    const id = req.params.id;
    var params={
        TableName: config.aws_table_name,
        Key: {
            'id': id,
        },
        UpdateExpression: "set #name= :name, #company=:company, #age=:age",
        ExpressionAttributeNames: {
            "#name" : "name",
            "#company" : "company",
            "#age" : "age"
        },
        ExpressionAttributeValues: {
            ":name" : req.body.name,
            ":company" : req.body.company,
            ":age" : req.body.age
        }
    };

    doClient.update(params, function(err,data){
        if(err) {
            console.log(err);
        }else{
            console.log(data);
            res.json('update completed');
        }
    })
})

//defined delete | remove | DESTROU ROUTE
// personRoutes.route('/delete/:id').get(function(req,res){
//     Person.findByIdAndRemove({_id: req.params.id}, function(err,data){
//         if(err) res.json(err);
//         else res.json('Succesfully removed');
//     });
// });

personRoutes.route('/delete/:id').get(function(req,res){
    var params ={
        TableName : config.aws_table_name,
        Key:{
            'id': req.params.id,
        }
    }
    doClient.delete(params,function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json('Deleted');
            res.redirect('/index');
        }
    })
})

module.exports = personRoutes;