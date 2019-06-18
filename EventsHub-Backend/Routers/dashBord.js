const router = require('express').Router();


router.get('/', async (req, res, next) => {
    const userId=req.user._id;
    try {
        const events = await req.db.events.find({$or:[{'owner._id':userId},{'invaitedUsers._id':userId}]});
        res.status(201).send(events);
    } catch (error) {
        return next(error);
    }
});
module.exports = router;