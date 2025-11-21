const express=require("express")
const app=express();
const cors = require('cors');
const connectToDatabase=require('./config/dbConfig')
const googleRouter=require('./routes/googleAuthRoute');
const userRouter=require('./routes/userRoute');
const profileRouter=require('./routes/profileRoute');
const authenticateUser=require('./middleware/authMiddleware');
const fetchMail=require('./utilities/fetchMail');

const scheduler=require('./scheduler/node-cron');

app.use(cors());
app.use(express.json());

connectToDatabase();
scheduler();


app.use('/api/users',userRouter)
app.use('/api/auth',googleRouter);
app.use('/api/profile',authenticateUser,profileRouter)


app.get('/',(req,res)=>{
    res.send("response from server");
})


const PORT=3000;
app.listen(PORT,()=>{
    console.log("server started");
})