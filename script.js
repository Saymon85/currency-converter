const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=6105ba1cc5faf4a35ed3eb2f0d451faf';

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(`${url}&format=1`);
    console.log(response);
}

getExchangeRate();