import { useEffect, useState } from "react";
import axios from "axios";
import "./PortfolioTable.css"; 

export default function PortfolioTable({ refresh }) {
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios.get("http://127.0.0.1:8000/portfolio/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPortfolios(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load portfolio data.");
      });
  }, [refresh]);

  return (
  <>
   <div className="portfolio-container">
  <div className="portfolio-table">
    
      {error && <p style={{ color: "red" }}>{error}</p>}

      {portfolios.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Quantity</th>
              <th>Entry price ($)</th>
              <th>Profit/Loss ($)</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((p) => (
              <tr key={p.id}>
                <td>{p.coin_id}</td>
                <td>{p.quantitive}</td>
                <td>{p.entry_price}</td>
                <td
                  style={{ color: p.profit_loss >= 0 ? "green" : "red" }}
                >
                  {p.profit_loss}
                </td>
                <td>{p.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  </>
    
    
  );
}
