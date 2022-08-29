const express = require('express');

const controller = require('../controllers/lists');

const router = express.Router();


router.get('/', controller.list);
router.delete('/delete', controller.delete);
router.post('/add', controller.add);
router.post('/getbyid', controller.getById);
router.post('/update', controller.update);
router.post('/view', controller.listContacts);
router.delete('/remove', controller.removeFromList);
router.post('/addtolist', controller.addToList);


module.exports = router;