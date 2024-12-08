document.addEventListener('DOMContentLoaded', async function() {
    const transactionsContainer = document.getElementById('transactions-container');
    const transactionsPlaceholder = document.getElementById('transactions-placeholder');

    async function fetchTransactions() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/transactions/getUserTransactions', {
            headers: {
                'Authorization': token
            },
            credentials: 'include'
        });
        return await response.json();
    }

    // Función para formatear la fecha
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
    }

    try {
        const transactions = await fetchTransactions();
        if (transactions.length > 0) {
            transactionsPlaceholder.style.display = 'none';
            transactions.forEach(transaction => {
                const transactionElement = document.createElement('div');
                transactionElement.className = 'transaction';
                transactionElement.innerHTML = `
                    <span class="transaction-icon">${transaction.sender_id === userId ? '➖' : '➕'}</span>
                    <div class="transaction-details">
                        <p class="small-label">${transaction.sender_id === userId ? 'To' : 'From'}</p>
                        <p class="large-label">${transaction.receiver_id === userId ? transaction.sender_name : transaction.receiver_name}</p>
                    </div>
                    <div class="status">
                        <div class="status-circle ${transaction.sender_id === userId ? 'red' : 'green'}"></div>
                        <span>${transaction.sender_id === userId ? 'Sent' : 'Received'}</span>
                    </div>
                    <div class="invoice-info">
                        <p class="large-label">#${transaction.id}</p>
                        <p class="small-label">Transaction ID</p>
                    </div>
                    <div class="amount-info">
                        <p class="large-label">$${transaction.amount.toFixed(2)}</p>
                        <p class="small-label">${formatDate(transaction.transaction_date)}</p>
                    </div>
                `;
                transactionsContainer.appendChild(transactionElement);
            });
        } else {
            transactionsPlaceholder.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
});
