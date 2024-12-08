const express = require('express');
const connection = require('./dbConnect');
const verifyToken = require('./verifyToken');
const router = express.Router();

router.get('/getUserTransactions', verifyToken, (req, res) => {
    const userId = req.userId; // ID del usuario autenticado

    const query = `
        SELECT * FROM transactions 
        WHERE user_id = ?
        ORDER BY transaction_date DESC
    `;
    connection.execute(query, [userId, userId], (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return res.status(500).json({ message: 'Error fetching transactions' });
        }
        res.json(results);
    });
});

module.exports = router;
