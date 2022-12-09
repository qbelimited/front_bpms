import  React, {useState, useEffect} from 'react';
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
import getServices from '../../Services/get-services';

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
  
  

function ManagePlateTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[open, setOpen] = useState(false)
    const[ value, setValue] = useState('')
    const [plate, setPlate] = useState([])
      const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
    useEffect(() =>{
          getServices.getAllPlates().then(
            (response) => {
              
              setPlate(response.data['all number plates']);
             
              console.log(response.data['all number plates'])
              
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      
                setPlate(_content);
            }
          )
    }, [])

    const filteredPlate = plate.filter(
      person => {
        return (
          person
          .number_plate
          .toLowerCase()
          .includes(value.toLowerCase()) ||
          person
          .color
          .toLowerCase()
          .includes(value.toLowerCase())
        );
      }
    );
  

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
                onChange={setValue}
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
              {filteredPlate
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.number_plate}
                </TableCell>
                <TableCell align="right">{row.serial}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.dimension}</TableCell>
                <TableCell align="right"><span onClick={handleOpen} className=' cursor-pointer text-blue-600 '>More...</span></TableCell>
                
               
              </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredPlate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {filteredPlate.length === 0 && <p className=' text-center text-red-800'>No Data Found</p>}
      </Paper>
        </div>
        <div >
        <div >
        <Filter />     
        </div>
          
        </div>
      </div>
      </>
    );
}

export default ManagePlateTable