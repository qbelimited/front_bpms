import  React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { styled } from '@mui/material/styles';
import GetServices from '../../Services/get-services';
import UpdateDeliveryStatus from './UpdateDeliveryStatus';

const columns = [
  { id: 'sn', label: 'S/N', minWidth: 30 },
  { id: 'mode', label: 'Plate number', minWidth: 170 },
  {
    id: 'quan',
    label: 'Quantity',
    minWidth: 70,
    align: 'center',
    
  },
  {
    id: 'name',
    label: 'Company name',
    minWidth: 170,
    align: 'center',
  
  },
  {
    id: 'time',
    label: 'Timestamp',
    minWidth: 170,
    align: 'center',
   
  },
  {
    id: 'sentby',
    label: 'Sent by',
    minWidth: 150,
    align: 'right',
   
  },
  {
    id: 'cost',
    label: 'Cost',
    minWidth: 70,
    align: 'right',
   
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
   
  },
  {
    id: 'inv',
    label: 'Invoice',
    minWidth: 70,
    align: 'right',
   
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'white',
      color: 'rgba(50, 64, 84, 0.5)',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));




export default function DeliveryTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[deliveries, setDeliveries] = useState([]);
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const handleClose = (() => setOpen(false))

    useEffect(() =>{
      GetServices.getAllDeliveries().then(
        (response) => {
          setDeliveries(response.data['all deliveries']);
          console.log(response.data)
          
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setDeliveries(_content);
        }
      )
    }, [])
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <>
      <UpdateDeliveryStatus
        id={id}
        open={open}
        handleClose={handleClose}
       />

      <Paper className=' w-full overflow-x-auto overflow-hidden'>
        <TableContainer className=' bg-gray-50' sx={{ maxHeight: 440 }}>
          <Table   stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className=' bg-gray-100'
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                      <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.number_plate}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="right">{row.sent_by}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
               
                <TableCell align="right">{row.delivered === '1'?<span className=' bg-suc-color text-suc-text rounded-lg p-3'>Delivered</span>: 
                <span onClick={(()=>{
                  setOpen(true)
                  setId(row.id)
                })} className=' bg-inpro-co text-inpro-text rounded-lg p-3'>Pending</span>
                }</TableCell>
                <TableCell align="right"><InsertDriveFileOutlinedIcon sx={{color: 'blue'}}/><span className=' text-blue-700'>{row.invoice}</span></TableCell>
              </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={deliveries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {deliveries.length === 0 && <p className=' text-center text-red-800'>No Data Found</p>}
      </Paper>
      </>
    );
}
