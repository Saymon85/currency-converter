
const urlCurrency = 'http://www.apilayer.net/api/live?access_key=6105ba1cc5faf4a35ed3eb2f0d451faf&format=1';
const urlCountry = 'https://restcountries.eu/rest/v2/currency/';

/* const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(urlCurrency);
    const rates = response.data.quotes;
    console.log(response.data.quotes);
}

const getCountries = async (currencyCode) => {
    const response = await axios.get(`${urlCountry}${currencyCode}`);
    console.log(response.data[0].name);
}

*/

// Get list of countries and fill select element with it

async function getCountries(){
    const select = Array.from(document.querySelectorAll('.countries'));
    let countriesList = await fetch('https://restcountries.eu/rest/v2/all');
    countriesList = await countriesList.json();
    select.map((element) => {
        countriesList.map( country => {
            const option = document.createElement('option');
            option.textContent = `${country.name} - ${country.currencies[0].code}`;
            option.value = `${country.currencies[0].code}`;
            element.appendChild(option);
        })

        
    })

}

getCountries();
