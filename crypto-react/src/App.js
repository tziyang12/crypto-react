import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Components/Header'; // Import the Header component
import CoinTable from './Components/CoinTable'; // Import the Table component
import FAQ from './Components/FAQ'; // Import the FAQ component
import { Container, TextField, Typography } from '@mui/material';
import Footer from './Components/Footer';
import Feedback from './Components/Feedback';
import Home from './Components/Home';

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
      <Container>
        <Header />
      </Container>
      <Home/>
      <Container id="ranking" style={{paddingTop: 40, paddingBottom: 40}}>
        <Typography variant="h1" 
          style={{ textAlign: 'center', 
          color: 'white', 
          fontSize: '3vw',
          fontWeight: 'bold', 
          paddingBottom: '20px'
        }}>
          Top 100 Cryptocurrencies
        </Typography>
        <div className="search-container">
            <TextField
              sx={{
                "& fieldset": { border: 'none' }, 
                '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" } 
              }}
              className={`search-input`}
              label="Search Crypto Name/Symbol..."
              variant="outlined"
              onChange={handleSearchChange}
            />
        </div>
      </Container>
      <Container>
        <CoinTable data={filteredData} rowsPerPageOptions={[10, 25, 100]} />
      </Container>
      <Feedback/>
      <FAQ/>
      <Footer/>
    </div>
  );
}

export default App;