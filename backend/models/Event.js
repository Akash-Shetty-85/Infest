// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
    organizedBy: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
