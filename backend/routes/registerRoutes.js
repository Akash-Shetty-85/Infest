const express = require('express');
const { eventRegisterUser } = require('../controllers/registerController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/:id/register', authenticate, eventRegisterUser);

module.exports = router;