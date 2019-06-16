//Configrations
const express=require('express');
const bodyParser=require('body-parser');
const auth=require('./Routers/auth');
const app=express();
// Middlewares
const dbConnect=require('./Middlewares/dbConnect');

app.use(bodyParser.json());
app.use(dbConnect);

app.use('/api/auth',auth);

app.use((err,req,res,next)=>{
console.error(err);
res.status(500).send({error:err.message});
});

app.listen(8080,()=>console.log('app listen on 8080 port'));
