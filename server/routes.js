import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import User from "./model/User.js"
import Advertisement from "./model/Advertisement.js";
import bcrypt from "bcrypt";
import JwtService from './JwtService.js';

const router = express.Router();
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/api/users', (request, response) => {
    User.find().then(users => {
        response.json(users);
    })
})

router.get('/api/users/:id', (request, response) => {
    User.findById(request.params.id).then(user => {
        response.json(user);
    })
})

router.get('/api/usernames/:username', (request, response) => {
    User.findOne({ username: request.params.username }).then(user => {
        response.json(user);
    })
})

router.get('/api/advertisements', (request, response) => {
    Advertisement.find().then(advertisements => {
        response.json(advertisements.filter(advertisement => advertisement.deleted === undefined));
    })
})

router.get('/api/advertisements/:id', (request, response) => {
    Advertisement.findById(request.params.id).then(advertisement => {
        response.json(advertisement);
    })
})

router.post('/api/users', async (request, response) => {
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

router.post('/api/advertisements',  (request, response) => {
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

router.post('/api/login', async (request, response) => {
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

router.delete('/api/advertisements/:id', async(request, response) => {
    await Advertisement.findByIdAndUpdate(request.params.id, { deleted: new Date() });
})

router.put('/api/advertisements/:id', async (request, response) => {
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

export default router;