const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        }, // Hashed password
        isAdmin: {
            type: Boolean,
            default: false
        },
        createdEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        registeredEvents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    },
    {
        timestamps: true,        // ✅ Adds createdAt & updatedAt
        collection: 'users'      // ✅ Custom collection name
    }
);

module.exports = mongoose.model('User', userSchema);
