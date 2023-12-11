require('dotenv').config()
const express=require('express');
var cors = require('cors') 
const connectDb=require('./db/connect')
const authRouter=require('./routes/auth');
const noteRoute=require('./routes/notes');
const expressError=require('./middleware/expressErros');
const notFound=require('./middleware/notFound')
const app=express();

const port=5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/notes',noteRoute);


app.use(notFound);
app.use(expressError);

const start=async()=>{
    try {
        await connectDb() 
        app.listen(port,()=>{
            console.log(`Listening on port ${port}`)
        })
    } catch (error) {
        
    }
}
  
start(); 