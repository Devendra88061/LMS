import express from 'express';
const mongoose = require ('mongoose');
require ("dotenv").config();
import {register} from './api/register';
import {login} from './api/login';

const app = express();
const port = 4000;
const MONGO_URL = "mongodb://0.0.0.0:27017/library_management_system";


app.use(express.json());
//start server
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

//connection with db
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
},(err : any)=>{
    if(err){
        console.log(`unable to connect with database":`,err);
    }
    else{
        console.log("\n*************MONGODB connected**************\n");
    }
})

//routes for api
//register routes
app.use('/auth',register);

//login route
app.use('/auth',login);

