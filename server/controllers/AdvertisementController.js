import Advertisement from "../model/Advertisement.js";
import { upload } from "../services/ImageService.js";
import mongoose from "mongoose";
function getAll(request, response) {
    Advertisement.find().then(advertisements => {
        response.json(advertisements.filter(advertisement => advertisement.deleted === undefined));
    });
}

function getById(request, response) {
    Advertisement.findById(request.params.id).then(advertisement => {
        response.json(advertisement);
    });
}

async function create(request, response) {
    try {
        const url = upload(request.body.url);
        const advertisement = new Advertisement({
            title: request.body.title,
            description: request.body.description,
            url: url,
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
}

async function remove(request, response) {
    await Advertisement.findByIdAndUpdate(request.params.id, { deleted: new Date() });
}

async function update(request, response) {
    const advertisement = await Advertisement.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        description: request.body.description,
        url: request.body.url,
        price: request.body.price,
        category: request.body.category,
        city: request.body.city
    }, { new: true });
    response.json(advertisement);
}

export default {
    getAll,
    getById,
    create,
    remove,
    update
}