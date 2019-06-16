const mongoose = require('mongoose');
require('dotenv').config();
const usersSchema = require('../Schemas/usersSchema');
const eventsSchema=require('../Schemas/eventsSchema')
let db;
module.exports = async function (req, res, next) {
    if (!db) {
        try {
            await mongoose.connect("mongodb+srv://mongosa:MWATeam@cluster0-oavtb.mongodb.net/EventsHubest");
            db = {};
            db.users = mongoose.model('Users', usersSchema);
            db.events = mongoose.model('Events', eventsSchema);
            req.db = db;
            return next();
        } catch (error) {
            next(error);
        }
    } else {
        req.db = db;
        return next();
    }
}
