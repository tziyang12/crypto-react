import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef } from 'react';

//Use specific font for the table
const font = {
   fontFamily: 'Noto Sans',
}

const columns = [
    { id: 'rank', label: 'Rank', minWidth: 30, align: 'center' },
    { id: 'icon', label: 'Icon', minWidth: 40, align: 'center'},
    { id: 'name', label: 'Name', minWidth: 60, align: 'center' },
    { id: 'symbol', label: 'Symbol', align: 'center', minWidth: 30 },
    { id: 'price', label: 'Price', minWidth: 70, align: 'center', format: (value) => `$${value.toLocaleString("en-US")}` },
    { id: 'priceChange1d', label: '24H(%)', minWidth: 70, align: 'center', format: (value) => `${value.toFixed(2)}%` },
    { id: 'marketCap', label: 'Market Cap', minWidth: 170, align: 'center', format: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    { id: 'volume', label: 'Volume (24h)', minWidth: 170, align: 'center', format: (value) => `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
  ];

function CoinTable({ data, rowsPerPageOptions }) {

    const divRef = useRef(null);

  useEffect(() => {
    const tableHeadHeight = document.querySelector('.MuiTableHead-root')?.offsetHeight;
    if (tableHeadHeight) {
      divRef.current.style.height = `${tableHeadHeight}px`;
    }
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const isMobile = useMediaQuery('(max-width:700px)');

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
      <TableContainer component={Paper} style={{ position: 'relative' }}>
      <div
            ref={divRef}
            style={{
                position: 'absolute',
                background: 'linear-gradient(25deg, #2600fc, #ff00ea)',
                zIndex: 1,
                top: 0,
                left: 0,
                width: '100%',
            }}
        />
        <Table stickyHeader aria-label="sticky table"
            sx={{
                '& .MuiTableCell-sizeMedium': {
                padding: '16px 10px',
                },
            }}>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                    // Hide columns on smaller screens using isMobile variable
                    (isMobile && (column.id !== 'rank' && column.id !== 'name' && column.id !== 'symbol' && column.id !== 'price' && column.id !== 'priceChange1d')) ? null :
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color: 'white', backgroundColor: 'transparent', fontStyle: 'bold', ...font, position: 'relative', zIndex: 1 }}>
                        {column.label}
                    </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {currentItems.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={{backgroundColor: 'black'}}>
                    {columns.map((column) => (
                        // Hide columns on smaller screens using isMobile variable
                        (isMobile && (column.id !== 'rank' && column.id !== 'name' && column.id !== 'symbol' && column.id !== 'price' && column.id !== 'priceChange1d')) ? null :
                    <TableCell 
                        key={column.id} 
                        align={column.align} 
                        style={
                            column.id === 'priceChange1d' 
                            ? row[column.id] >= 0 
                            ? { color: 'green', ...font } 
                            : { color: 'red', ...font }
                            : { color: 'white', ...font } // Empty object for other cells
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
            style={{ color: 'white', backgroundColor: 'transparent' }}
        />
    </>
  );
}

export default CoinTable;