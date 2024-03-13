import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 30, align: 'center' },
  { id: 'icon', label: 'Icon', minWidth: 40, align: 'center'},
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'symbol', label: 'Symbol', align: 'center', minWidth: 50 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'center', format: (value) => `$${value.toLocaleString("en-US")}` },
  { id: 'priceChange1d', label: 'Price Change', minWidth: 170, align: 'center', format: (value) => `${value.toFixed(2)}%` },
  { id: 'marketCap', label: 'Market Cap', minWidth: 170, align: 'center', format: (value) => `$${value.toLocaleString()}` },
  { id: 'volume', label: 'Volume (24h)', minWidth: 170, align: 'center', format: (value) => `${value.toLocaleString()}` },
];

function App() {
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const indexOfLastItem = (page + 1) * rowsPerPage;
  const indexOfFirstItem = page * rowsPerPage;
  const currentItems = currency
    .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()) || val.symbol.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="App">
      <h2>Coin Tracker</h2>
      <div className="search-container">
        <TextField
          className="search-input"
          label="Search..."
          variant="outlined"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'icon' ? (
                        <img src={row[column.id]} alt="Icon" style={{ width: '40px', height: '40px' }} />
                      ) : (
                        column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={currency.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default App;