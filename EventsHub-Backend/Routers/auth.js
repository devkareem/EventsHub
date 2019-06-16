const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res, next) => {
    if (!req.body.email | !req.body.password) return next(new Error('There is no email and password !!'));
    try {
        const user = await req.db.collection('Users').findOne({ email: req.body.email, password: req.body.password });
        if(!user) return next(new Error('User not found'));
        const token = jwt.sign({name:user.name,email:user.email,_id:user._id,phone:user.phone,gender:user.gender}, process.env.PRIVATE_KEY);
        res.status(201).send({data:token});
    } catch (error) {
        return next(error);
    }
});
module.exports = router;