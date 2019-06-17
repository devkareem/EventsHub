const mongoose=require('mongoose');

require('dotenv').config();
let db;
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(process.env.DB_CONNECTIONSTRING,{useNewUrlParser:true});
// module.exports = async function (req, res, next) {
//     if (!db) {
//         try {
//             await client.connect();
//             db = client.db('EventsHub');
//             req.db = db;
//             return next();
//         }
//         catch (err) {
//             return next(err);
//         }
//     }
//     else {
//         req.db = db;
//         return next();
//     }
// }

module.exports = async function (req, res, next) {
    if (!db) {
        try {
            
            await mongoose.connect(process.env.DB_CONNECTIONSTRING+'/EventsHub',{useNewUrlParser:true});
            const userModel=mongoose.model('Users',new mongoose.Schema({email:String,name:String,phone:String,gender:String,password:String,address:{state:String,city:String,street:String,zipCode:String}}));
            db = {};
            db.users=userModel;
            req.db = db;
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
    else {
        req.db = db;
        return next();
    }
}