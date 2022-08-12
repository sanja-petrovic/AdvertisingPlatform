import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./model/User.js"
import Advertisement from "./model/Advertisement.js";
import bcrypt from "bcrypt";
import JwtService from './JwtService.js';
import cors from "cors";
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

app.get('/api/usernames/:username', (request, response) => {
    User.findOne({ username: request.params.username }).then(user => {
        response.json(user);
    })
})

app.get('/api/advertisements', (request, response) => {
    Advertisement.find().then(advertisements => {
        response.json(advertisements.filter(advertisement => advertisement.deleted === undefined));
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
            response.statusMessage = "User already registered.";
            response.status(409);
            return response.send("User already registered.");
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
            const token = JwtService.generateAccessToken(user._id, user.username)
            response.cookie('token', token);

            response.json(token);
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
            user: mongoose.Types.ObjectId(request.body.user),
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
    console.log(request);
    const user = await User.findOne({ username: request.body.username });
    if (user) {
        const passwordValid = await bcrypt.compare(request.body.password, user.password);
        if(passwordValid) {
            const token = JwtService.generateAccessToken(user._id, user.username);
            console.log(token);
            response.cookie('token', token);
            response.json(token);
        } else {
            response.statusMessage = "Incorrect username and/or password";
            response.status(403).end();
        }
    } else {
        response.statusMessage = "Incorrect username and/or password";
        response.status(403).end();
    }
});

app.delete('/api/advertisements/:id', async(request, response) => {
    await Advertisement.findByIdAndUpdate(request.params.id, { deleted: new Date() });
})

app.put('/api/advertisements/:id', async (request, response) => {
    const advertisement = await Advertisement.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        description: request.body.description,
        url: request.body.url,
        price: request.body.price,
        category: request.body.category,
        city: request.body.city
    }, { new: true });
    response.json(advertisement);
})