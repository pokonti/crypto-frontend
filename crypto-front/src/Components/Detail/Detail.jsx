import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
  } from "recharts";
import './Detail.css';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/back.png';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

function Detail() {
    let { coin_id } = useParams();
    const [chartData, setChartData] = useState([]);
    const [coin, setCoin] = useState([]);
  
    const [isChartLoading, setChartLoading] = useState(true);
    const [isCoinLoading, setCoinLoading] = useState(true);

    const [chartError, setChartError] = useState(null);
    const [coinError, setCoinError] = useState(null);
    
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };

    useEffect(() => {
      const fetchData = async () => {
        setChartLoading(true);
        setChartError(null);
        try {
          const response = await fetch(`https://crypto-backend-production-2a02.up.railway.app/chart/${coin_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
  
          const formattedData = data.prices.map(([timestamp, price]) => ({
            timestamp,
            price,
            time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));
  
          setChartData(formattedData);
        } catch (error) {
          console.error("Error fetching crypto chart data:", error);
          setChartError("Failed to load chart data. Please try again later.");
        } finally {
          setChartLoading(false);
        }
      };
  
      if (coin_id) {
        fetchData(); 
      }
    }, [coin_id]);

    const currentPrice = chartData.length > 0 
    ? chartData[chartData.length - 1].price.toFixed(2)
    : 0;


  useEffect(() => {
    const fetchCoin = async () => {
      setCoinLoading(true);
      setCoinError(null);

      try {
        const response = await fetch(`https://crypto-backend-production-2a02.up.railway.app/${coin_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCoin(data);
      } catch (error){
        console.error("Error fetching crypto data:", error);
        setCoinError("Failed to load coin data. Please try again later.");
      } finally {
        setCoinLoading(false);
        
      }
    };

    if (coin_id) {
      fetchData(); 
    }

  }, [coin_id]);

  return (
    <>
    <img onClick={goBack} className="go-back-button" src={back} alt="" />
    <div className="detail-container">
    {isCoinLoading ? (<>
        <div className="loading-container">
          <p>Loading coin data...</p>
          <div className="crypto-spinner">
            <FaBitcoin className="spinner-icon" />
            <FaEthereum className="spinner-icon" />
          </div>
        </div>
        
        
        </>
      ) : coinError ? (
        <div className="error-container">
          {coinError}
        </div> )
        :
        (
          <div className="coin-details">
            <h1>Description</h1>
            <p className="description">{coin.description}</p>
            {coin.whitepaper && coin.whitepaper !== "" ? (
            <div className="whitepaper">
              <a href={coin.whitepaper} target="_blank" rel="noopener noreferrer">
                <button>View Whitepaper</button>
              </a>
            </div>
          ) : null}
          <div className="price-changes">
            <h1>Changes</h1>
            <div className="price-change">
              <span>24h:</span>
              <span className={`price-change ${coin.price_change_percentage_24h>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>7d:</span>
              <span className={`price-change ${coin.price_change_percentage_7d>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_7d.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>14d:</span>
              <span className={`price-change ${coin.price_change_percentage_14d>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_14d.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>30d:</span>
              <span className={`price-change ${coin.price_change_percentage_30d>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_30d.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>60d:</span>
              <span className={`price-change ${coin.price_change_percentage_60d>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_60d.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>200d:</span>
              <span className={`price-change ${coin.price_change_percentage_200d>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_200d.toFixed(2)}%</span>
            </div>
            <div className="price-change">
              <span>1 Year:</span>
              <span className={`price-change ${coin.price_change_percentage_1y>0 ? 'price-up' : 'price-down'}`}>{coin.price_change_percentage_1y.toFixed(2)}%</span>
            </div>
          </div>
          </div>
        )
        }
    </div>
    <div className="detail-container">
      {isChartLoading ? (
        <div className="loading-container">
          <p>Loading chart data...</p>
          <div className="crypto-spinner">
            <FaBitcoin className="spinner-icon" />
            <FaEthereum className="spinner-icon" />
          </div>
        </div>
      ) : chartError ? (
        <div className="error-container">
          {chartError}
        </div>
      ) : (
        <>
          <div className="crypto-header">
            <h1 className="crypto-title">{coin_id}</h1>
            <div className="price-container">
              <span className="current-price">${currentPrice}</span>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
              </linearGradient>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name={`${coin_id} price`}
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="update-timestamp">
            Last updated: {chartData.length > 0 ? new Date(chartData[chartData.length - 1].timestamp).toLocaleString() : ''}
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default Detail