// App.jsx
import { useState, useEffect } from "react";
import { exchangeRatesData, fetchExchangeRates } from "./exchangeRatesData";
import currencyCodes from "./currencyCodes";

const Home = () => {
  const [baseAmount, setBaseAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  const convertCurrency = () => {
    const exchangeRateTarget = exchangeRatesData.data[targetCurrency]; //1usd=0.89 eur
    const exchangeRateBase = exchangeRatesData.data[baseCurrency]; //1usd =83inr
    //0.89 euro = 83 inr
    //1eur = 83/0.89
    //1inr = 0.89/83
    if (exchangeRateBase !== undefined) {
      const convertedValue = (
        baseAmount *
        (exchangeRateTarget / exchangeRateBase)
      ).toFixed(3); //70inr=(0.89/83)*70
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
          {Object.keys(currencyCodes).map((code) => (
            <option key={code} value={code}>
              {code} - {currencyCodes[code]}
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
        />
        <select
          name="targetCurrency"
          id="ccopt"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {Object.keys(currencyCodes).map((code) => (
            <option key={code} value={code}>
              {code} - {currencyCodes[code]}
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
