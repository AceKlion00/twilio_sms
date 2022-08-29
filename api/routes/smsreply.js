const express = require('express');

const controller = require('../controllers/smsreply');

const router = express.Router();

router.post('/confirm', controller.confirm);
router.post('/cancel', controller.cancel);

module.exports = router;