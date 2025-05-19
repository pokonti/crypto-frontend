import React from 'react'
import { useState, useEffect } from 'react';
import './Home.css'
import Menu from '../Menu/Menu';
import Table from '../Table/Table';
import ChatAssistant from '../ChatAssistant/ChatAssistant';


function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    const interval = setInterval(fetchCryptos, 300000);
    return () => clearInterval(interval);
  }, []);

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Menu searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <Table cryptos={filteredCryptos} />

      <ChatAssistant></ChatAssistant>
    </>
   
  );
}


export default Home