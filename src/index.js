const express = require('express');
const app = express();
require('dotenv').config();
const middlewareLogRequest = require('./middleware/log')
// Middleware
app.use(express.json());
app.use(middlewareLogRequest)
// Routes
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.get('/', (req, res) => {
    res.send('Welcome to Ticket API ,The Service is Running');
  });



app.use((req, res, next) => {
    res.status(404).json({
        message: 'Your method/endpoint is not supported',
        status: 404
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});