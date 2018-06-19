const express = require('express');
const router = express.Router();

const EventType = require('../models').EventType;
const event_type_controller = require('../controllers/eventTypeController');

router.get('/', event_type_controller.event_type_list);

module.exports = router;