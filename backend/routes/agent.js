const express = require('express');
const router = express.Router();
const agentController = require('../agentController');

router.post('/', agentController.createAgent);

module.exports = router;
