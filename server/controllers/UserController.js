import User from "../model/User.js";
import bcrypt from "bcrypt";
import JwtService from "../services/JwtService.js";

function getAll(request, response)
{
    User.find().then(users => {
        response.json(users);
    })
}

function getById(request, response) {
    User.findById(request.params.id).then(user => {
        response.json(user);
    });
}

function getByUsername(request, response) {
    User.findOne({ username: request.params.username }).then(user => {
        response.json(user);
    })
}

async function create(request, response) {
    try {
        let user = await User.findOne({ username: request.body.username });
        if (user) {
            response.statusMessage = "Username is taken. Please try another.";
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
}

async function logIn(request, response) {
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
}


export default {
    getAll,
    getById,
    getByUsername,
    create,
    logIn
}