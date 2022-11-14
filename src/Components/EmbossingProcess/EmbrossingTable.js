import  React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import getServices from '../../Services/get-services';


const columns = [
    { id: 'sn', label: 'Plate number', minWidth: 70 },
    { id: 'date', label: 'Plate text', minWidth: 70 },
    {
      id: 'serial',
      label: 'Plate Color',
      minWidth: 70,
      align: 'right',
      
    },
  
    {
      id: 'starttime',
      label: 'Start time',
      minWidth: 70,
      align: 'right',
     
    },
    
  ];
  
 
function EmbrossingTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [embosser, setEmbosser] = useState([])
    const [fetch, setFetch] = useState(false)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() =>{
        getServices.allEmbossing().then(
          (response) => {
              
            setEmbosser(response.data['embossed plates']);
            setFetch(true)
            console.log(response.data['embossed plates'])
            
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setEmbosser(_content);
          }
        )
    }, [])
    return (
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
              {embosser
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
                <TableCell align="left">{row.embosser_text}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                {/* <TableCell align="right">{row.starttime}</TableCell>
                <TableCell align="right">{row.eta}</TableCell> */}
                <TableCell align="right">{row.status === '1'?<span className=' bg-inpro-co text-inpro-text rounded-lg p-3'>Pending</span>: 
                <span className=' bg-suc-color text-suc-text  rounded-lg p-3'>Completed</span>
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
          count={embosser.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {embosser.length === 0 && <p className=' text-center text-red-900'> No Data Found</p>}
      </Paper>
    );
}

export default EmbrossingTable