const Event = require('../models/Event');
const mongoose = require('mongoose');

// Create new event
exports.createEvent = async (req, res) => {
    try {
        const {
            name,
            title,
            duration,
            date,
            organizedBy,
            description,
            location,
            capacity,
            tags,
        } = req.body;

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
            createdBy: req.user.userId,
        });

        await newEvent.save();

        // ✅ Update user's createdEvents array
        await User.findByIdAndUpdate(req.user.userId, {
            $push: { createdEvents: newEvent._id }
        });

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
};


// Get all events or user-created events (if authenticated)
exports.getEvents = async (req, res) => {
    try {
        if (req.user) {
            // Return only events created by the logged-in user
            const userEvents = await Event.find({ createdBy: req.user.userId });
            return res.status(200).json({ message: 'User events fetched', events: userEvents });
        }
        // Public: return all events
        const allEvents = await Event.find();
        // console.log(allEvents);
        res.status(200).json({ message: 'All events fetched',allEvents });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
};

// Get event by ID
exports.getEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: 'Invalid event ID' });

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete event (only creator or admin can delete — you can add more checks)
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: 'Invalid event ID' });

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // ✅ Check if user is owner or admin
        if (event.createdBy.toString() !== req.user.userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await event.remove();

        // ✅ Remove event from user's createdEvents
        await User.findByIdAndUpdate(event.createdBy, {
            $pull: { createdEvents: event._id }
        });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
};


// Admin-only: update event status (accept/reject)
exports.updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // expecting "accepted" or "rejected"

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: 'Invalid event ID' });

    if (!['accepted', 'rejected'].includes(status))
        return res.status(400).json({ message: 'Invalid status value' });

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.status = status;
        await event.save();

        res.status(200).json({ message: `Event ${status} successfully`, event });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status', error: error.message });
    }
};
