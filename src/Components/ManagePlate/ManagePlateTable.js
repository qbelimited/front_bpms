import  React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchButton from '../SelectValue/SearchButton';
import ManagePlateModal from './ManagePlateModal';
import Filter from '../Filter';

const columns = [
    { id: 'plateno', label: 'Plate number', minWidth: 170 },
    
    {
      id: 'serial',
      label: 'Serial number',
      minWidth: 170,
      align: 'right',
      
    },
  
    {
      id: 'color',
      label: 'Color',
      minWidth: 170,
      align: 'right',
     
    },
    {
      id: 'size',
      label: 'Size',
      minWidth: 170,
      align: 'right',
     
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
     
    },
  ];
  
  function createData(plateno,  serial,  color, size, action) {
    
    return { plateno, serial, color,size, action };
  }
  
  const rows = [
    createData('ACC-233GHq', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GHe', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GHd', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GHf', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GHc', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GHx', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GwH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GfH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GvH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GbH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GjH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GkH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233GmH', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233G,H', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233G5H', '2837-1635-2653', 'Red', 'Small', 'More...'),
    createData('ACC-233G3H', '2837-1635-2653', 'Red', 'Small', 'More...'),
  ];

function ManagePlateTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[open, setOpen] = useState(false)
      const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
        <>
        <ManagePlateModal
            open={open}
            handleClose={handleClose}
        />
        <div className=' mt-5 grid grid-cols-4 gap-4'>

        <div className=' col-span-3'>
        <div className=' mb-10'>
            <SearchButton 
                label='Enter a plate or serial number'
            />
        </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className=' bg-gray-100' sx={{ maxHeight: 440 }}>
          <Table   stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className=' bg-gray-100'
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.plateno}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.plateno}
                </TableCell>
                <TableCell align="right">{row.serial}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right"><span onClick={handleOpen} className=' cursor-pointer text-blue-600 '>{row.action}</span></TableCell>
                
               
              </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        </div>
        <div>
           <Filter />     
        </div>
      </div>
      </>
    );
}

export default ManagePlateTable