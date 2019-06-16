const express = require('express');
const mongo = require('mongodb')

const userRoute = express.Router({caseSensitive:false,strict:true});

let dbCol;
userRoute.get('',(req,res,next) => {
    dbCol = req.db.collection('Users');
    //return next('route');
});

//(/users)
userRoute.get('/',(req,res) => {
    let result = await dbCol.find({}).toArray();
    res.status(200).json({status: 'OK', data : result});
});

userRoute.get('/:userId',(req,res,next) => {
    let result = await dbCol.findOne({_id : new mongo.ObjectID(req.params.userId)});
    res.status(200).json({status: 'OK', data : result });
});

userRoute.post('/',function(req,res){
    let result = await dbCol.insertOne(request.body);
    res.status(201).json({status: 'OK',data : result});
});

userRoute.patch('/:userId',function(req,res){
    let result = await dbCol.updateOne({_id : new mongo.ObjectID(req.params.userId)},
    {$set : request.body} );
    res.status(201).json({status: 'OK',data : result});
});

userRoute.delete('/:userId',function(req,res){
    let result = dbCol.remove({_id : new mongo.ObjectID(req.params.userId)})
    res.status(202).json({status: 'OK', data: result});
});

module.exports =  userRoute ;