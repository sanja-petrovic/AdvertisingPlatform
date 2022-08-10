import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./model/User.js"
import Advertisement from "./model/Advertisement.js";
import bcrypt from "bcrypt"
import cors from "cors"
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/api/users', (request, response) => {
    User.find().then(users => {
        response.json(users);
    })
})

app.get('/api/users/:id', (request, response) => {
    User.findById(request.params.id).then(user => {
        response.json(user);
    })
})

app.get('/api/advertisements', (request, response) => {
    Advertisement.find().then(advertisements => {
        response.json(advertisements);
    })
})

app.get('/api/advertisements/:id', (request, response) => {
    Advertisement.findById(request.params.id).then(advertisement => {
        response.json(advertisement);
    })
})

app.post('/api/users', async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username });
        if (user) {
            return response.status(409).send("User already registered.");
        }
        const salt = await bcrypt.genSalt(10);

        user = new User({
            username: request.body.username,
            password: request.body.password,
            registrationDate: new Date(),
            phone: request.body.phone
        });
        user.password = await bcrypt.hash(user.password, salt);
        user.save().then(newUser => {
            response.json(newUser)
        })
    } catch (err) {
        console.log(err);
        response.status(500).send("Error occurred...");
    }
});

app.post('/api/advertisements',  (request, response) => {
    try {
        const advertisement = new Advertisement({
            title: request.body.title,
            description: request.body.description,
            url: request.body.url,
            price: request.body.price,
            category: request.body.category,
            user: request.body.user,
            city: request.body.city,
            date: new Date()
        });

        advertisement.save().then(newAd => {
            response.json(newAd)
        })
    } catch (err) {
        console.log(err);
        response.status(500).send("Error occurred...");
    }
});

app.post('/api/login', async (request, response) => {
    const user = await User.findOne({ username: request.body.username });
    if (user) {
        const passwordValid = await bcrypt.compare(request.body.password, user.password);
        if(passwordValid) {
            response.status(200).json({ message: 'Successfully logged in'});
        }
        if(passwordValid) {
            response.status(200).json({ message: 'Successfully logged in'});
        } else {
            response.status(403).json({ error: "Incorrect credentials" });
        }
    } else {
        response.status(403).json({ error: "Incorrect credentials" });
    }
})