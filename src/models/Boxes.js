const mongoose = require('mongoose');

const Boxes = new mongoose.Schema({
    title: [{ type: mongoose.Schema.Types.ObjectId, ref: "Box" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Boxes", Boxes);