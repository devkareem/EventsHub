
require('dotenv').config();
let db;
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(process.env.DB_CONNECTIONSTRING,{useNewUrlParser:true});
module.exports = async function (req, res, next) {
    if (!db) {
        try {
            await client.connect();
            db = client.db('EventsHub');
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
