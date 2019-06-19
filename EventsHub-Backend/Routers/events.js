const router = require('express').Router();
const mongo = require('mongodb');
let dbCol;
router.all('*', (req, res, next) => {
    dbCol = req.db.events;
    return next();
});

// Retrive all events from database

router.get('/users', async (req, res) => {
    let result = await req.db.users.find({}).select('_id name email');
    res.status(200).json({ status: 'OK', data: result });
});
router.get('/', async (req, res, next) => {
    const userId = req.user._id;
    try {
        let result = await dbCol.find({ 'owner._id': userId });
        res.status(200).json({ status: 'OK', data: result });
    }
    catch (err) {
        return next(new Error(err.message));
    }


}
)
// Retrieve event with the given id from database
router.get('/:eventId', async (req, res, next) => {
    req.user
    try {
        const id = new mongo.ObjectID(req.params.eventId);
        const result = await dbCol.findById({ _id: id });
        res.json(result);
    }
    catch (e) {
        return next(new Error(e.message));
    }

});
// Create event
router.post('/', async (req, res, next) => {
    try {

        const result = await dbCol.create(req.body);
        res.json(result);
    }
    catch (e) {
        return next(new Error(e.message));
    }
}
);

// Update event with given id in the database
router.put('/:eventId', async (req, res, next) => {
    try {
        const body = req.body;
        const id = new mongo.ObjectID(req.params.eventId);
        const data = await dbCol.where({ _id: id }).update({
            $set: {
                'title': body.title, 'description': body.description,
                'startTime': body.startTime, 'endTime': body.endTime, 'invaitedUsers': body.invaitedUsers
            }
        });
        res.json(data);
    }
    catch (e) {
        return next(new Error(e.message));
    }
});

// Delete an event with the given id from database
router.delete('/:eventId', async (req, res, next) => {
    try {
        const id = new mongo.ObjectID(req.params.eventId);
        const data = await dbCol.findOneAndDelete({ _id: id });
        res.json(data);
    }
    catch (e) {
        return next(new Error(e.message));
    }
});

module.exports = router;