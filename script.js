// Globals

const urlCurrency = 'http://data.fixer.io/api/latest?access_key=fb9c548f646108b674e3ed2114dd2062&format=1';
const urlCountry = 'https://restcountries.eu/rest/v2/all';
const btnCalculate = document.querySelector('.btnCalc button');
const btnSwitch = document.querySelector('.switch button');

// Get list of countries and fill select element with it

const getCountries = async () => {
    const select = Array.from(document.querySelectorAll('.countries'));
    let countriesList = await fetch(urlCountry);
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

// Get base rate for Euro and calculate exchange rate

const getExchangeRate = async () => {
    const fromCurrency = document.querySelector('#from').value;
    const toCurrency = document.querySelector('#to').value;
    const ratesResponse = await fetch(urlCurrency);
    const ratesData = await ratesResponse.json();
    const rate = (ratesData.rates[toCurrency] / ratesData.rates[fromCurrency]).toFixed(2);

    convertCurrency(rate, fromCurrency, toCurrency);
}

// Converting currency and updating DOM

const convertCurrency = async (rate, fromCurrency, toCurrency) => {
    const inputValue = document.querySelector('#value').value;
    const convertedValue = inputValue * rate;
    
    updateDOM(convertedValue, inputValue, fromCurrency, toCurrency);
}



const updateDOM = (data, inputValue, fromCurrency, toCurrency) => {
    const fromValue = document.querySelector('.inputValue');
    const convertedValue = document.querySelector('.convertedValue');
    fromValue.textContent = `${inputValue} ${fromCurrency} = `;
    convertedValue.textContent = `${data} ${toCurrency}`;

}

// Switch place of currencies ( to on place of from)

const switchPlace = () => {
    const fromCurrency = document.querySelector('#from');
    const toCurrency = document.querySelector('#to');

    const indexFrom = fromCurrency.selectedIndex;

    fromCurrency.selectedIndex = toCurrency.selectedIndex;
    toCurrency.selectedIndex = indexFrom;
}

// event listeners

window.onload = getCountries();
btnCalculate.addEventListener('click', getExchangeRate);
btnSwitch.addEventListener('click', switchPlace);
