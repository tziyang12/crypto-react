import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Header from './Components/Header'; // Import the Header component
import CoinTable from './Components/CoinTable'; // Import the Table component


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
      <CoinTable data={filteredData} rowsPerPageOptions={[10, 25, 100]} />
    </div>
  );
}

export default App;