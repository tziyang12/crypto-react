import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import useMediaQuery from '@mui/material/useMediaQuery';


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

function CoinTable({ data, rowsPerPageOptions }) {

    
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const indexOfLastItem = (page + 1) * rowsPerPage;
  const indexOfFirstItem = page * rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                // Hide columns on smaller screens using isMobile variable
                (isMobile && (column.id !== 'rank' && column.id !== 'icon' && column.id !== 'name' && column.id !== 'symbol' && column.id !== 'price' && column.id !== 'priceChange1d')) ? null :
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
                    // Hide columns on smaller screens using isMobile variable
                    (isMobile && (column.id !== 'rank' && column.id !== 'icon' && column.id !== 'name' && column.id !== 'symbol' && column.id !== 'price' && column.id !== 'priceChange1d')) ? null :
                  <TableCell 
                    key={column.id} 
                    align={column.align} 
                    style={
                        column.id === 'priceChange1d' 
                        ? row[column.id] >= 0 
                        ? { color: 'green' } 
                        : { color: 'red' }
                        : {} // Empty object for other cells
                    }>
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
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CoinTable;