const express = require('express');
const mongo = require('mongodb')

const userRoute = express.Router({caseSensitive:false,strict:true});

let dbCol;
userRoute.all('*',(req,res,next) => {
    dbCol = req.db.users;
    return next();
});

userRoute.get('/', async (req,res) => {
    let result = await dbCol.find({});
    res.status(200).json({status: 'OK', data : result});
});

userRoute.get('/:userId', async (req,res,next) => {
    //req.users._id
    let result = await dbCol.findById(new mongo.ObjectID(req.params.userId));
    res.status(200).json({status: 'OK', data : result });
});

userRoute.put('/:userId',async (req,res) => {
    let result = await dbCol.findOneAndUpdate({_id : new mongo.ObjectID(req.params.userId)},
    {$set : req.body}, {useFindAndModify : false} );
    res.status(201).json({status: 'OK',data : result});
});

userRoute.delete('/:userId',async (req,res) =>{
    let result = await dbCol.findOneAndDelete({_id : new mongo.ObjectID(req.params.userId)}, {useFindAndModify : false} )

    res.status(202).json({status: 'OK', data: result});
});

userRoute.put('/writecomment/:eventId',async (req,res) => {
    let result = await req.db.events.findOneAndUpdate({_id : new mongo.ObjectID(req.params.eventId)},
    {$push : { comments : req.body} }, {useFindAndModify : false} );
    res.status(201).json({status: 'OK',data : result});
});

module.exports =  userRoute ;