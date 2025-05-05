// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // hashed
    isAdmin: { type: Boolean, default: false },
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, {

    collection: 'users'  // ✅ your custom collection name here
});

module.exports = mongoose.model('User', userSchema);
