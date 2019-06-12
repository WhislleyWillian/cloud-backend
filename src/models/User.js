const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    boxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Box" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", User);