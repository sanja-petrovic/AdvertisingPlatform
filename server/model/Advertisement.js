import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    price: Number,
    category: String,
    user: mongoose.Schema.ObjectId,
    city: String,
    date: Date,
    deleted: Date
})

const Advertisement = mongoose.model('Advertisement', advertisementSchema)

export default Advertisement;