import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SelectButton from '../SelectValue/SelectButton'
import GetServices from '../../Services/get-services';
const columns = [
    { id: 'sn', label: 'S/N', minWidth: 170 },
    { id: 'plateco', label: 'Plate colour', minWidth: 170 },
    {
      id: 'small',
      label: 'Small',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'med',
      label: 'Medium',
      minWidth: 170,
      align: 'right',
    
    },
    {
      id: 'big',
      label: 'Big',
      minWidth: 170,
      align: 'right',
     
    },
    
  ];
  
  function createData(sn, plateco, small, med, big) {
    
    return { sn,plateco, small, med, big  };
  }
  
  const rows = [
    createData('01', 'Red', 20, 30, 20),
    createData('02', 'Red', 20, 30, 20),
    createData('03', 'Red', 20, 30, 20),
    createData('04', 'Red', 20, 30, 20),
    createData('05', 'Red', 20, 30, 20),
    createData('06', 'Red', 20, 30, 20),
    createData('07', 'White', 20, 30, 20),
    createData('08', 'Red', 20, 30, 20),
    createData('09', 'Green', 20, 30, 20),
    createData('10', 'Red', 20, 30, 20),
    createData('11', 'Red', 20, 30, 20),
    createData('12', 'Yellow', 20, 30, 20),
    createData('13', 'Red', 20, 30, 20),
    createData('14', 'Red', 20, 30, 20),
    createData('15', 'Red', 20, 30, 20),
    createData('16', 'Red', 20, 30, 20),
  ];

function TableStorage() {
    const [page, setPage] = useState(0);
    const [warehouses, setWareHouses] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const bool =true;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() =>{
          GetServices.getAllWarehouse().then(
            (response) => {
              setWareHouses(response.data['all warehouses']);
              console.log(response.data['all warehouses'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setWareHouses(_content);
            }
          )
    }, [])
   
    return (
      <Paper className=' w-full overflow-hidden bg-gray-300'>
            <div className='ml-2 mt-3 mb-6 grid md:grid-cols-2'>
              <SelectButton 
                items={warehouses.map(warehouse =>{
                  return warehouse.name
                })}
                bool={bool}
              />
            </div>
        <TableContainer className=' bg-gray-100' sx={{ maxHeight: 440 }}>
          <Table   stickyHeader aria-label="sticky table">
            <TableHead  className=' bg-gray-100'>
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
                key={row.sn}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sn}
                </TableCell>
                <TableCell align="left">{row.plateco}</TableCell>
                <TableCell align="right">{row.small}</TableCell>
                <TableCell align="right">{row.med}</TableCell>
                <TableCell align="right">{row.big}</TableCell>
                
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
    );
}

export default TableStorage