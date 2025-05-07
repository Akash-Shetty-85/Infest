const Event = require('../models/Event'); // assuming you have an Event model
// middleware to get logged-in user
const mongoose = require('mongoose');

exports.createEvent = async (req, res) => {
    try {
        const { name, duration, date, organizedBy, description, location, capacity, tags, title } = req.body;

        const newEvent = new Event({
            name,
            title,
            duration,
            date,
            organizedBy,
            description,
            location,
            capacity,
            tags,
            createdBy: req.user.id  // store the ID of the logged-in user
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create event' });
    }
}

exports.getEvents = async (req, res) => {
    try {
        const userId = req.user?._id;
        console.log(userId);
        // Fetch all events
        const allEvents = await Event.find();
        // console.log('allEvents:', allEvents);

        let userCreatedEvents = [];

        // If logged-in user exists, fetch events created by them
        if (userId) {
            userCreatedEvents = await Event.find({ createdBy: userId });
            res.status(200).json({
                message: 'Events fetched successfully',
                userCreatedEvents
            });
        }
        else {
            res.status(200).json({
                message: 'Events fetched successfully',
                allEvents,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
};
exports.getEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid event ID format' });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
};
