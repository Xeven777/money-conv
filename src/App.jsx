import { useState } from "react";

const Home = () => {
  const [baseAmount, setBaseAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  const convertCurrency = () => {
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_bvayG1a9oqSIgB5qdTe4xJf81jtBm7hld4EZX8Yb&currencies=${targetCurrency}&base_currency=${baseCurrency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const exchangeRate = data.data[targetCurrency];
          if (exchangeRate !== undefined) {
            const convertedValue = (baseAmount * exchangeRate).toFixed(2);
            setConvertedAmount(convertedValue);
          } else {
            console.error(
              `Exchange rate for ${targetCurrency} not found in API response.`
            );
          }
        } else {
          console.error("Invalid API response format.");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="baseAmount">Base Amount:</label>
        <input
          type="number"
          id="baseAmount"
          name="baseAmount"
          value={baseAmount}
          onChange={(e) => setBaseAmount(e.target.value)}
        />
        <select
          name="baseCurrency"
          id="bcopt"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          {/* Add other currency options as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="convertedAmount">Converted Amount:</label>
        <input
          type="text"
          id="convertedAmount"
          name="convertedAmount"
          value={convertedAmount}
          readOnly
          disabled
        />
        <select
          name="targetCurrency"
          id="ccopt"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          {/* Add other currency options as needed */}
        </select>
      </div>

      <div>
        <button onClick={convertCurrency}>Convert</button>
      </div>
    </div>
  );
};

export default Home;
