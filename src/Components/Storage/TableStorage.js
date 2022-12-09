import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GetServices from '../../Services/get-services';
import WarehouseSelect from '../SelectValue/WarehouseSelect';
const columns = [
   
    { id: 'plateco', label: 'Plate Number', minWidth: 70 },
    {
      id: 'small',
      label: 'Plate colour',
      minWidth: 70,
      align: 'left',
      
    },
    {
      id: 'med',
      label: 'Plate size',
      minWidth: 70,
      align: 'left',
    
    },
    {
      id: 'big',
      label: 'Storage',
      minWidth: 70,
      align: 'left',
     
    },
    
  ];
  
  

function TableStorage() {
    const [page, setPage] = useState(0);
    const [warehouses, setWareHouses] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[warehouseId, setWarehouseId] = useState(1)
    const[fetch, setFetch] = useState(false)
    const bool =true;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() =>{
          GetServices.getAllStorage(warehouseId).then(
            (response) => {
              
              setWareHouses(response.data['all warehouse items']);
              setFetch(true)
              console.log(response.data['all warehouse items'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setWareHouses(_content);
            }
          )
    }, [warehouseId])
   
    return (
      <Paper className=' w-full mt-10 mx-auto overflow-hidden bg-gray-300'>
            <div className='ml-2 mt-3 mb-6 grid md:grid-cols-2'>
              <WarehouseSelect 
                value={warehouseId}
                onChange={setWarehouseId}
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
            {fetch && warehouses.length > 0 ? <>
              <TableBody>
              {warehouses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.number_plate}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell align="left">{row.number_plate}</TableCell>
                <TableCell align="left">{row.color}</TableCell>
                <TableCell align="left">{row.dimension}</TableCell>
                <TableCell align="enter">{row.storage === '1' ?<span className=' bg-suc-color text-suc-text rounded-lg p-3'>Stored</span>:
              <span className='  bg-inpro-co text-inpro-text rounded-lg p-3'>Pending</span>
              }</TableCell>
                
              </TableRow>
                  );
                })}
            </TableBody>
              </> : null}
            
          </Table>
        </TableContainer>
       
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={warehouses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {warehouses.length === 0 && <p className=' text-red-800 text-center'>No data found</p>}
      </Paper>
    );
}

export default TableStorage