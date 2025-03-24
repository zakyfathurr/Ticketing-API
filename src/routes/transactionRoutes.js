const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create new transaction
router.post('/', transactionController.createTransaction);

// Get transaction details
router.get('/:id', transactionController.getTransaction);

// Update transaction status
router.patch('/:id', transactionController.updateTransaction);

module.exports = router;