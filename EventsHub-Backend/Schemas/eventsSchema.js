const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    isAllDay: Boolean,
    owner: {
        _id:mongoose.Types.ObjectId,
        email: String,
        name: String,
        phone: String
    },
    invaitedUsers: [{
        _id:mongoose.Types.ObjectId,
        email: String,
        name: String,
        status:String
    }],
    comments:[{
        _id:mongoose.Types.ObjectId,
        name: String,
        comment:String
    }]
});