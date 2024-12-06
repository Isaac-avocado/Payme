document.addEventListener('DOMContentLoaded', async function() {
    const creditCardsContainer = document.getElementById('credit-cards-container');
    const placeholder = document.getElementById('card-placeholder');

    async function fetchCards() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/cards/getCards', {
            headers: {
                'Authorization': token
            },
            credentials: 'include'
        });
        return await response.json();
    }

    // Función para formatear la fecha en MM/YY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Obtener el mes con dos dígitos
        const year = date.getUTCFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
        return `${month}/${year}`;
    }

    try {
        const cards = await fetchCards();
        if (cards.length > 0) {
            placeholder.style.display = 'none';
            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'credit-card';
                cardElement.innerHTML = `
                    <div class="card-icon">💳</div>
                    <div class="card-details">
                        <span class="card-number">**** **** **** ${card.number.slice(-4)}</span>
                        <p class="card-label">Expires: ${formatDate(card.expire_date)}</p>
                    </div>
                `;
                creditCardsContainer.appendChild(cardElement);
            });
        } else {
            placeholder.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const transactionsContainer = document.getElementById('transactions-container');
    const transactionsPlaceholder = document.getElementById('transactions-placeholder');

    // Asegurarse de que el contenedor de transacciones existe antes de acceder a sus propiedades
    if (transactionsContainer && transactionsPlaceholder) {
        const transactions = transactionsContainer.querySelectorAll('.transaction');

        let hasTransactions = false;
        transactions.forEach(transaction => {
            if (transaction.style.display !== 'none') {
                hasTransactions = true;
            }
        });

        if (!hasTransactions) {
            transactionsPlaceholder.style.display = 'flex';
        } else {
            transactionsPlaceholder.style.display = 'none';
        }
    } else {
        console.error('Elemento transactionsContainer o transactionsPlaceholder no encontrado');
    }
});
