
const urlCurrency = 'http://data.fixer.io/api/latest?access_key=fb9c548f646108b674e3ed2114dd2062&format=1';
const urlCountry = 'https://restcountries.eu/rest/v2/currency/';

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
        });
    });
}

getCountries();

// Get base rate for Euro and calculate exchange rate

async function getExchangeRate() {
    const from = document.querySelector('#from').value;
    const to = document.querySelector('#to').value;
    const ratesResponse = await fetch(urlCurrency);
    const ratesData = await ratesResponse.json();

    return ratesData.rates[to] / ratesData.rates[from];
}


