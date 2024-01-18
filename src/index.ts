import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoutes';
import fileUpload from 'express-fileupload';



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }))


app.use("/api", authRoute);



mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASEURL as string).then(() => {
    console.log("database connection established");
}).catch((error) => {
    console.log(error);
});


app.listen(3001, ()=>{
    console.log("server running on port 3001");
})
