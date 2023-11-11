// App.jsx
import { useState, useEffect } from "react";
import { exchangeRatesData, fetchExchangeRates } from "./exchangeRatesData";

const Home = () => {
  const [baseAmount, setBaseAmount] = useState("0");
  const [convertedAmount, setConvertedAmount] = useState("0");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  const convertCurrency = () => {
    const exchangeRate = exchangeRatesData.data[targetCurrency];
    if (exchangeRate !== undefined) {
      const convertedValue = (baseAmount * exchangeRate).toFixed(2);
      setConvertedAmount(convertedValue);
    } else {
      console.error(`Exchange rate for ${targetCurrency} not found in data.`);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

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
          {Object.keys(exchangeRatesData.data).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
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
          {Object.keys(exchangeRatesData.data).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={convertCurrency}>Convert</button>
      </div>
    </div>
  );
};

export default Home;
