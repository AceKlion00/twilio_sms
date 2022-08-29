const express = require('express');

const controller = require('../controllers/communications');

const router = express.Router();

router.post('/', controller.send);
router.post('/group', controller.sendToGroup);

module.exports = router;