import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/back.png';
import axios from "axios";
import PortfolioTable from './PortfolioTable';

const Portfolio = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [profitLoss, setProfitLoss] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try{
        const response = await fetch("http://127.0.0.1:8000/cryptos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCryptos(data);

      } catch (error){
        console.error('Error to fetching cryptos:', error);
      } 
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
  if (selectedCrypto) {
    setQuantity(0);
    setEntryPrice(0);
    setProfitLoss(null); 
    const selected = cryptos.find(crypto =>
      crypto.name.toLowerCase() === selectedCrypto.toLowerCase()
    );
    // console.log('Selected Crypto:', selected);
    if (selected) {
      setCurrentPrice(selected.price_dollars);
    } else {
      console.error('Selected crypto not found!');
    }
  }
}, [selectedCrypto, cryptos]);

  const handleCalculateProfitLoss = () => {
    if (quantity > 0 && entryPrice > 0 && currentPrice > 0) {
      const totalInvestment = quantity * entryPrice;
      const currentValue = quantity * currentPrice;
      const profitOrLoss = currentValue - totalInvestment;
      setProfitLoss(profitOrLoss);
    }
  };
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const payload = {
      coin_id: selectedCrypto.toLowerCase(),
      quantitive: parseFloat(quantity),
      entry_price: parseFloat(entryPrice),
      profit_loss: profitLoss,
    };

    try {
      const res = await axios.post("http://localhost:8000/portfolio/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefreshTrigger(prev => prev + 1);

      console.log("Portfolio created:", res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }

  };


  return (<>
    <img onClick={goBack} className="go-back-button" src={back} alt="" />
    
    <div className="portfolio-container">
      <h1>User Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select cryptocurrency:</label>
          <select onChange={e => setSelectedCrypto(e.target.value)} value={selectedCrypto}>
            <option value="">Select cryptocurrency</option>
            {cryptos.map(crypto => (
              <option key={crypto.id} value={crypto.name}>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {selectedCrypto && (
          <>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                min="0"
              />
            </div>

            <div>
              <label>Entry price:</label>
              <input
                type="number"
                value={entryPrice}
                onChange={e => setEntryPrice(e.target.value)}
                min="0"
              />
            </div>

            <div>
              <p>Current price: ${currentPrice}</p>
            </div>

            <button type="submit" className='calculate-button' onClick={handleCalculateProfitLoss}>Calculate Profit/Loss</button>

            {profitLoss !== null && (
              <div className={`profit-loss ${profitLoss >= 0 ? 'positive' : 'negative'}`}>
                
                {profitLoss >= 0 ? (
                  <div>
                      {/* <h2>You're crushing it! 💥</h2> */}
                      <h2>Profit: ${profitLoss.toFixed(2)}</h2>
                  </div>
                  ) : (
                  <div>
                      {/* <h2>Oops! Looks like the market played a prank on you... 🃏 Better luck next time!</h2> */}
                      <h2>Loss: ${Math.abs(profitLoss).toFixed(2)}</h2>
                  </div>
              )
              }
      
              </div>
          )}
        </>
      )}
      </form>
    </div>
    {token && <PortfolioTable refresh={refreshTrigger} />}
    
    </>
  );
};

export default Portfolio;
