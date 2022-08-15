import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes.js";
import seedDb from "./seed.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`);
    mongoose.connect(process.env.MONGODB_URI)
        .then(result => {
            console.log('connected to MongoDB');
        })
        .catch((error) => {
            console.log('error connecting to MongoDB:', error.message);
        });
});

//
// seedDb().then(() => console.log('Database seeded'));

app.use(router);