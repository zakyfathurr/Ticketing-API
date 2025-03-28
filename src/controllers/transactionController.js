const transactionModel = require('../models/transaction');

const createTransaction = async (req, res) => {
  try {
    const { tickets, ...transactionData } = req.body;
    
    if (!tickets || tickets.length === 0) {
      return res.status(400).json({ Warning: 'Minimum 1 tiket diperlukan' });
    }

    const newTransaction = await transactionModel.createTransaction(
      transactionData,
      tickets
    );
    
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
    
    const tickets = await transactionModel.getTransactionTickets(req.params.id);
    res.status(200).json({ 
        message: "Transaksi ditemukan",
        data : [transaction, tickets] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updated = await transactionModel.updateTransactionStatus(
      req.params.id,
      req.body.status_transaksi
    );
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deleted = await transactionModel.deleteTransaction(req.params.id);
    res.status(200).json({ 
      message: "Transaksi dihapus",
      data : deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction
};