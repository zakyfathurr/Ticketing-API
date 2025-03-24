const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/:nik', customerController.getCustomer);
router.delete('/:nik', customerController.deleteCustomer);
router.patch('/:nik', customerController.changeRoleCustomer);
module.exports = router;