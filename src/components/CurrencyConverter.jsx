import React, { useEffect, useState } from 'react';
import './CurrencyConverter.css';


function CurrencyConverter({ url }) {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showResult, setShowResult] = useState(false); 

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleConvert = () => {
    fetchRate();
    setShowResult(true); 
  };

  const sendRequest = async (endpoint) => {
    try {
      setError('');
      const response = await fetch(endpoint);
      if (!response.ok) {
        setError('Enter Amount to convert.');
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setError('Try again later');
    }
  };

  const fetchCurrencies = async () => {
    const data = await sendRequest(`${url}/currencies`);
    console.log('fetchCurrencies=', data);
    setCurrencies(Object.keys(data));
  };

  const fetchRate = async () => {
    if (!amount) {
      setConvertedAmount(0);
      setError(' Please input amount');
      return;
    }
    setError(''); 
    const data = await sendRequest(
      `${url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    if (data && data.rates && data.rates[toCurrency]) {
      setConvertedAmount(data.rates[toCurrency].toFixed(2));
    } else {
      setError('Error .');
      setConvertedAmount(0);
    }
    console.log('fetchRate=', data);
  };

  return (
    <div className='currency-converter'>
      <div className="converter-content">
        <h2> Currency Converter </h2>
        {error && <h2 className='error'>{error}</h2>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <br></br>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="currency-pair">
            <div>
              <label>From:</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                required
              >
                {currencies.map((currency) => (
                  <option value={currency} key={`from_${currency}`}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>To:</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                required
              >
                {currencies.map((currency) => (
                  <option value={currency} key={`to_${currency}`}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" onClick={handleConvert}>Convert</button>
        </form>
        {showResult && ( 
          <h2>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
