import  React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GetServices from '../../Services/get-services';

const columns = [
  { id: 'sn', label: 'S/N', minWidth: 50,  },
  { id: 'date',  align: 'center', label: 'Date'},
  {
    id: 'batch',
    label: 'Batch No.',
    
    align: 'center',
    
  },
  {
    id: 'quan',
    label: 'Quantity',
    
    align: 'right',
  
  },
  {
    id: 'starttime',
    label: 'Serial starts',
    
    align: 'center',
   
  },
  {
    id: 'eta',
    label: 'Production week',
    
    align: 'center',
   
  },
  {
    id: 'sta',
    label: 'Production year',
    
    align: 'right',
   
  },
  {
    id: 'dim',
    label: 'Dimension',
    
    align: 'right',
   
  },
  {
    id: 'status',
    label: 'Status',
    
    align: 'center',
   
  },

];



export default function PlateProTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productions, setProductions] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() =>{
    GetServices.getAllProduction().then(
      (response) => {
        setProductions(response.data['all productions']);
        console.log(response.data)
        
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setProductions(_content);
      }
    )
  }, [])

  return (
    <div className=' table-res   overflow-x-auto  md:w-full  '>
    <Paper className='    overflow-x-auto '>
      <TableContainer className=' bg-gray-100 overflow-x-scroll min-w-max overflow-scroll' >
        <Table className=' table-auto w-full overflow-x-scroll min-w-max overflow-scroll'  stickyHeader aria-label="sticky table">
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
            {productions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                    <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.manufacture_date}</TableCell>
              <TableCell align="center">{row.batch_code}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">{row.serial_starts}</TableCell>
              <TableCell align="center">{row.production_week}</TableCell>
              <TableCell align="center">{row.production_year}</TableCell>
              <TableCell align="right">{row.dimension}</TableCell>

              <TableCell align="right">{row.status === '1' ?<span className=' bg-suc-color text-suc-text rounded-lg p-3'>Completed</span>:
              <span className='  bg-inpro-co text-inpro-text rounded-lg p-3'>Pending</span>
              }</TableCell>
             
            </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {productions.length === 0 && <p className=' text-center text-red-800'>No data found</p>}
    </Paper>
    </div>
  );
}
