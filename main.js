require('dotenv').config()
const express=require('express');
const connectDB=require('./db/connect');
const errorHandler=require('./middleware/express-Error');
const notFound=require('./middleware/notFound');
const authRouter=require('./routes/auth');
const jobRouter=require('./routes/jobs');
const authenticate=require('./middleware/authenticate');
const hemlet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const rateLimiter=require('express-rate-limit');
const app=express();

const PORT=process.env.PORT||3000; 

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,}))

app.use(express.json());
app.use(hemlet());
app.use(cors());
app.use(xss());

app.get('/',(req,res)=>{
    res.send('Jobs Api')
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticate,jobRouter); 

app.use(notFound);
app.use(errorHandler);
 


const start=async()=>{
    try {
        await connectDB(process.env.MONGO_UI);
        app.listen(PORT,()=>{
            console.log(`Listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();