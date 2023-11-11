// exchangeRatesData.js

let exchangeRatesData = {
    data: {},
};
const apikey = "fca_live_bvayG1a9oqSIgB5qdTe4xJf81jtBm7hld4EZX8Yb";
const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apikey}`;

const fetchExchangeRates = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        exchangeRatesData = { data: data.data };
        console.log(exchangeRatesData);
    } catch (error) {
        console.error(error);
    }
};
export { exchangeRatesData, fetchExchangeRates };
