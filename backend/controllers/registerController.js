const Event = require('../models/Event');
const User = require('../models/User'); // adjust path as necessary
const mongoose = require('mongoose');

exports.eventRegisterUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId || req.body.userId;

    console.log("User ID from JWT:", userId);
    console.log("Registering user:", userId, "for event:", id);

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (event.registeredUsers.includes(userId)) {
            return res.status(400).json({ message: 'Already registered' });
        }

        // ✅ Use atomic update instead of pushing + saving
        await Event.findByIdAndUpdate(
            id,
            { $addToSet: { registeredUsers: userId } }, // ensures no duplicates
            { new: true }
        );

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
