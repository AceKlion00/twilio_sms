const express = require('express');

const controller = require('../controllers/users');

const router = express.Router();


router.get('/', controller.list);
router.delete('/delete', controller.delete);
router.post('/add', controller.add);
router.post('/changepass', controller.changePass);
router.post('/login', controller.login);
router.post('/check', controller.check);

module.exports = router;