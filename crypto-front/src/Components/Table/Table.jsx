import React from 'react'
import { useState, useEffect } from 'react';
import './Table.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Table({ cryptos }) {
    const [prices, setPrices] = useState({kzt: {},});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPrices = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await fetch("http://127.0.0.1:8000/crypto-prices?currency=kzt");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setPrices(data);
          } catch (error) {
            console.error("Error fetching crypto prices: ", error);
            setError("Failed to load the data. Please try again later.");
          } finally {
            setLoading(false); 
          }
        };
    
        fetchPrices();
        const interval = setInterval(fetchPrices, 300000);
        return () => clearInterval(interval);
      }, []);


  return (
    <>
    <div className="table-container">
   
    {loading ? <><div className="loading-container-table">
      <h3>One momento туда-сюда миллионер...</h3>
      </div>
      <Skeleton width={1000} height={30} style={{ backgroundColor: '#d8d8d8' }} />
      <Skeleton width={1000} height={30} style={{ backgroundColor: '#d8d8d8' }} />
      <Skeleton width={1000} height={30} style={{ backgroundColor: '#d8d8d8' }} />
      <Skeleton width={1000} height={30} style={{ backgroundColor: '#d8d8d8' }} />
      </> 
    : error ? (
        <div className="error-container-table">
          {error}
        </div>
      ) : 
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>USD</th>
            <th>EUR</th>
            <th>KZT</th>
            <th>Change 24h</th>
          </tr>
        </thead>
            <tbody>
            {cryptos.map((crypto) => (
                <tr key={crypto.id} onClick={() => window.location.href = `/crypto/${crypto.id}`}>
                    
                    <td>
                        <div className="crypto-info">
                            <img src={crypto.logo} alt={crypto.name} className="crypto-img" />
                            <strong>{crypto.name} ({crypto.symbol.toUpperCase()})</strong>
                        </div>
                    </td>
                <td>{crypto.price_dollars}</td>
                <td>{crypto.price_euros}</td>
                <td>{ prices[crypto.id]?.kzt}</td>
                <td style={{ color: crypto.change_24h > 0 ? 'green' : crypto.change_24h < 0 ? 'red' : 'gray'}}> {crypto.change_24h.toFixed(2)}%</td>
                </tr>
            ))}
            </tbody>
      </table>
    }
    </div>
   
    </>
  );
}


export default Table