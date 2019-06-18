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
            await mongoose.connect(process.env.DB_CONNECTIONSTRING + '/EventsHub', { useNewUrlParser: true });
            const userModel = mongoose.model('Users', new mongoose.Schema({ email: String, name: String, phone: String, gender: String, password: String, address: { state: String, city: String, street: String, zipCode: String } }));
            const eventModel = mongoose.model('events', new mongoose.Schema({
                _id: mongoose.Types.ObjectId,
                title: String,
                description: String,
                startTime: Date,
                endTime: Date,
                isAllDay: Boolean,
                owner: {
                    _id: mongoose.Types.ObjectId,
                    email: String,
                    name: String,
                    phone: String
                },
                invaitedUsers: [{
                    _id: mongoose.Types.ObjectId,
                    email: String,
                    name: String
                }],
                comments: [{
                    _id: mongoose.Types.ObjectId,
                    name: String,
                    comment: String
                }]
            }));

            db = {};

            db.users = userModel;
            db.events=eventModel;
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