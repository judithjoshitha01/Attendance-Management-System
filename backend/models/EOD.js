const mongoose = require('mongoose');

const eodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    workSubmission: { type: String }, // PDF ஃபைலின் பெயர்/பாத்
}, { timestamps: true });

module.exports = mongoose.model('EOD', eodSchema);