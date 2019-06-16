const mongoose=require('mongoose');

module.exports= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    email:String,
    name:String,
    phone:String,
    gender:String,
    address:{state:String,city:String,street:String,zipCode:String},
    password:String
});