const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEventStatus,
} = require('../controllers/event.controller');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEvent);

// Authenticated user routes
router.post('/', authenticate, createEvent);
router.delete('/:id', authenticate, deleteEvent);
router.get('/user/events', authenticate, getEvents);

// Admin-only route
router.patch('/admin/event/:id/status', authenticate, authorize('admin'), updateEventStatus);

module.exports = router;
