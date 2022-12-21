const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        defaul: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: "notes" });

module.exports = mongoose.model("Note", noteSchema);