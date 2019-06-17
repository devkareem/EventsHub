//Configrations
const express=require('express');
const bodyParser=require('body-parser');
const auth=require('./Routers/auth');
const router=require('./Routers/events');
const authMiddle=require('./Middlewares/auth');
var cors = require('cors')
const helmet=require('helmet');
const dbConnect=require('./Middlewares/dbConnect');

const app=express();
// Middlewares
app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
app.use(dbConnect);

// app.all("*",authMiddle);
app.use('/api/auth',auth);
app.use('/api/events',authMiddle,router);
app.use('/users',authMiddle,require('./Routers/usersRouter'));

app.use((err,req,res,next)=>{
console.error(err);
res.status(500).send({error:err.message});
});

app.listen(8080,()=>console.log('app listen on 8080 port'));
