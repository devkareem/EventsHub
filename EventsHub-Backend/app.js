//Configrations
const express=require('express');
const bodyParser=require('body-parser');

const app=express();
// Middlewares
const dbConnect=require('./Middlewares/dbConnect');

app.use(bodyParser.json());
app.use(dbConnect);

app.get('',(req,res)=>{
    console.log(req.db);
    res.status(200).send('done');
})

app.use((err,req,res,next)=>{
console.error(err);
res.status(500).send(err);
});

app.listen(8080,()=>console.log('app listen on 8080 port'));
