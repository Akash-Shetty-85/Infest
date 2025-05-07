// routes/events.js or wherever you handle event routes

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware.js');
const { createEvent, getEvents, deleteEvent, getEvent } = require('../controllers/event.controller.js')

// Create new event
router.post('/', authenticate, createEvent);

// router.

router.delete('/:id', authenticate, deleteEvent)

router.get('/', getEvents)
router.get('/:id',getEvent)

router.get('/user/events', authenticate, getEvents)

module.exports = router;
