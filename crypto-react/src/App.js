import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  useEffect(() => {
    // Fetch data from API every 5 seconds
    const fetchData = async () => {
      try {
        const response = await axios.get('https://openapiv1.coinstats.app/coins?limit=100', {
          headers: {
            'X-API-KEY': 'MWIVYFTgOhSz6MU7Gh+sqmeQQBSTyiOOAshZW0Vkufc='
          }
        });
        setCurrency(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currency
    .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()) || // Filter by val.name
    val.symbol.toLowerCase().includes(search.toLowerCase()) // Filter by val.symbol
  )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h2>Coin Tracker</h2>
      <div className="search-container">
        <input className="search-input" type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((val) => {
            return <tr key={val.id}>
              <td className="rank">{val.rank}</td>
              <td className="logo">
                <a href={val.websiteUrl}>
                  <img src={val.icon} alt=""/>
                </a>
                <p>{val.name}</p>
              </td>
              <td className="symbol">{val.symbol}</td>
              <td>${val.price.toFixed(2)}</td>
              <td>${val.marketCap}</td>
              <td>{val.volume.toFixed(0)}</td>
            </tr>
            })
          }
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(currency.length / itemsPerPage) }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
