var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const API_KEY = '4e4b5411d3806857677c1b2a'; // Replace with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function getExchangeRates(baseCurrency) {
    try {
        const response = await fetch(`${API_URL}${baseCurrency}`);
        const data = await response.json();
        if (data.result === 'success') {
            return data.conversion_rates;
        } else {
            console.error('Error fetching exchange rates:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

async function convertCurrency() {
    const amount1 = parseFloat(document.getElementById("amount1").value);
    const currency1 = document.getElementById("currency-list1").value;
    const currency2 = document.getElementById("currency-list2").value;

    if (isNaN(amount1) || !currency1 || !currency2) {
        document.getElementById("amount2").value = "";
        return;
    }

    const exchangeRates = await getExchangeRates(currency1);
    if (!exchangeRates) {
        document.getElementById("amount2").value = "Error";
        return;
    }

    const rate2 = exchangeRates[currency2];
    const convertedAmount = amount1 * rate2;

    document.getElementById("amount2").value = convertedAmount.toFixed(2);
}
