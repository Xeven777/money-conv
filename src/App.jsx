import { useState, useEffect } from "react";
import { exchangeRatesData, fetchExchangeRates } from "./exchangeRatesData";
import currencyCodes from "./currencyCodes";
import "./App.css";
import hero from "./hero.svg";

const Home = () => {
  const currentTime = new Date();
  const cDateTime = `${currentTime.getDate()}-${
    currentTime.getMonth() + 1
  }-${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  const [baseAmount, setBaseAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  const convertCurrency = () => {
    const exchangeRateTarget = exchangeRatesData.data[targetCurrency];
    const exchangeRateBase = exchangeRatesData.data[baseCurrency];
    if (exchangeRateBase !== undefined) {
      const convertedValue = (
        baseAmount *
        (exchangeRateTarget / exchangeRateBase)
      ).toFixed(3);
      setConvertedAmount(convertedValue);
    } else {
      console.error(`Exchange rate for ${targetCurrency} not found in data.`);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <img src={hero} alt="currency" />
        <div className="inputs">
          <div className="box">
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
          <div className="box">
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
        </div>
        <button onClick={convertCurrency}>Convert</button>
      </div>
      <footer>
        <p>
          © Created by{" "}
          <a href="https://bento.me/anish7" target="_blank" rel="noreferrer">
            Anish
          </a>
          . Data is last updated at {cDateTime}
        </p>
      </footer>
    </>
  );
};

export default Home;
