const mongoose = require("mongoose");
const { Schema } = mongoose;
const Image = new Schema({
    url: { type: String },
    description: { type: String },
    cloudinaryId: {type: String, unique: true}
});
module.exports = mongoose.model("Image", Image);