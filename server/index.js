import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes.js";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`);
    mongoose.connect(process.env.MONGODB_URI)
        .then(result => {
            console.log('connected to MongoDB')
        })
        .catch((error) => {
            console.log('error connecting to MongoDB:', error.message)
        });
});

app.use(router);