const router = require('express').Router();
const mongo= require('mongodb');

// Retrive all events from database
router.get('/', async (req, res,next)=>{
    try{
await req.db.collection("Events").find({}).toArray(
    (err,data)=>{
        res.json(data);
        next(err);
    });
}
catch(err){
    return next(new Error(e.message));
}
    

}
)
// Retrieve event with the given id from database
router.get('/:eventId', async (req,res,next)=>{
    try{
        const id= new mongo.ObjectID(req.params.eventId);
    const result= await req.db.collection("Events").findOne({_id:id});
    res.json(result);
    }
    catch(e){
        return next(new Error(e.message));
    }

});

// Create event
router.post('/', async (req,res,next)=>{
    try{
    await req.db.collection("Events").insertOne(req.body, 
        (err, results) => {res.json(results);
        next(err);})
    }
    catch(e){
       return next(new Error(e.message));
    }
}
 );

// Update event with given id in the database
router.put('/:eventId', async (req, res, next)=>{
    try{
    const id= new mongo.ObjectID(req.params.eventId);
    const data=await req.db.collection("Events").updateOne({_id:id});
    res.json(data);
    }
    catch(e){
        return next(new Error(e.message));
    }
});

// Delete an event with the given id from database
router.delete('/:eventId', async (req,res,next)=>{
    try{
        const id= new mongo.ObjectID(req.params.eventId);
    const data=await req.db.collection("Events").remove({_id:id});
    res.json(data);
    }
    catch(e){
        return next(new Error(e.message));
    }
});

module.exports = router;