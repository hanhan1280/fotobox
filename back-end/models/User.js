
const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', User);