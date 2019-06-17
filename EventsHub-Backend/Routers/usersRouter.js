const express = require('express');
const mongo = require('mongodb')

const userRoute = express.Router({caseSensitive:false,strict:true});

let dbCol;
userRoute.all('*',(req,res,next) => {
    dbCol = req.db.collection('Users');
    return next();
});

//(/users)
userRoute.get('/', async (req,res) => {
    let result = await dbCol.find({}).toArray();
    res.status(200).json({status: 'OK', data : result});
});

userRoute.get('/profile', async (req,res,next) => {
    //req.users._id
    let result = await dbCol.findOne({_id : new mongo.ObjectID(req.params.userId)});
    res.status(200).json({status: 'OK', data : result });
});

userRoute.post('/',async (req,res) => {
    let result = await dbCol.insertOne(request.body);
    res.status(201).json({status: 'OK',data : result});
});

userRoute.patch('/:userId',async (req,res) => {
    let result = await dbCol.updateOne({_id : new mongo.ObjectID(req.params.userId)},
    {$set : request.body} );
    res.status(201).json({status: 'OK',data : result});
});

userRoute.delete('/:userId',async (req,res) =>{
    let result = dbCol.remove({_id : new mongo.ObjectID(req.params.userId)})
    res.status(202).json({status: 'OK', data: result});
});

module.exports =  userRoute ;