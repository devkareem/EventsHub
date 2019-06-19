//Configrations
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./Routers/auth');
const router = require('./Routers/events');
const authMiddle = require('./Middlewares/auth');
var cors = require('cors')
const helmet = require('helmet');
const dbConnect = require('./Middlewares/dbConnect');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dashBord = require('./Routers/dashBord');
// 
const app = express();

app.use(cors());

// Middlewares
app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
app.use(dbConnect);


// app.all("*",authMiddle);
app.use('/api/auth', auth);
app.use('/api/events', authMiddle, router);
app.use('/api/dashbord', authMiddle, dashBord);

app.use('/users', authMiddle, require('./Routers/usersRouter'));

app.post('/register', async (req, res) => {
    let result = await req.db.users.create(req.body);
    console.log(result);
    const token = jwt.sign({ name: result.name, email: result.email, _id:result._id, phone: result.phone, gender: result.gender }, process.env.PRIVATE_KEY);
    res.status(201).json({ status: 'OK', data: result,token:token });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: err.message });
});

app.listen(8080, () => console.log('app listen on 8080 port'));
