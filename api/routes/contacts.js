const express = require('express');

const controller = require('../controllers/contacts');

const router = express.Router();


router.get('/', controller.list);
router.delete('/delete', controller.delete);
router.post('/add', controller.add);
router.post('/getbyid', controller.getById);
router.post('/update', controller.update);
router.post('/search', controller.search);

module.exports = router;