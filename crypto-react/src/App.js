import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Header from './Components/Header'; // Import the Header component
import CoinTable from './Components/CoinTable'; // Import the Table component

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 30, align: 'center' },
  { id: 'icon', label: 'Icon', minWidth: 40, align: 'center'},
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'symbol', label: 'Symbol', align: 'center', minWidth: 50 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'center', format: (value) => `$${value.toLocaleString("en-US")}` },
  { id: 'priceChange1d', label: 'Price Change', minWidth: 170, align: 'center', format: (value) => `${value.toFixed(2)}%` },
  { id: 'marketCap', label: 'Market Cap', minWidth: 170, align: 'center', format: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
  { id: 'volume', label: 'Volume (24h)', minWidth: 170, align: 'center', format: (value) => `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
];

function App() {
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
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

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = currency.filter((val) => 
  val.name.toLowerCase().includes(search.toLowerCase()) || 
  val.symbol.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <Header />
      <div className="search-container">
        <TextField
          className="search-input"
          label="Search..."
          variant="outlined"
          onChange={handleSearchChange}
        />
      </div>
      <CoinTable columns={columns} data={filteredData} rowsPerPageOptions={[10, 25, 100]} />
    </div>
  );
}

export default App;