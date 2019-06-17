//Configrations
const express=require('express');
const bodyParser=require('body-parser');
const auth=require('./Routers/auth');
const router=require('./Routers/events');
const authMiddle=require('./Middlewares/auth');
const app=express();
// Middlewares
const dbConnect=require('./Middlewares/dbConnect');
// 
//app.use(require('cors'));

app.use(bodyParser.json());
app.use(dbConnect);


//app.all("*",authMiddle);
//app.use('/api/auth',auth);
//app.use('/api/events',router);

//user Router
app.use('/users',require('./Routers/usersRouter'));

app.use((err,req,res,next)=>{
console.error(err);
res.status(500).send({error:err.message});
});

app.listen(8080,()=>console.log('app listen on 8080 port'));
