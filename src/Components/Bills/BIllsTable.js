import  React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import GetServices from '../../Services/get-services';
const columns = [
  { id: 'sn', label: 'S/N', minWidth: 30 },
  { id: 'timestamp', label: 'Time stamp', minWidth: 170 },
  {
    id: 'bill',
    label: 'Bill(invoice number)',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'company',
    label: 'Company',
    minWidth: 170,
    align: 'center',
  
  },
  {
    id: 'sent',
    label: 'Sent by',
    minWidth: 120,
    align: 'center',
   
  },
  {
    id: 'received',
    label: 'Received by',
    minWidth: 100,
    align: 'right',
   
  },
  {
    id: 'status',
    label: 'Status',
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'white',
      color: 'rgba(50, 64, 84, 0.5)',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function createData(sn, timestamp, bill, company, sent, received, status,action ) {
  
  return { sn,timestamp, bill, company, sent, received, status,action };
}

const rows = [
  createData('01', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
  createData('02', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
  createData('03', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
  createData('04', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Pending.'),
  createData('05', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
  createData('06', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
  createData('07', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Pending.'),
  createData('08', '22/10/2022 - 15:25', '2837-1635-2653', 'XYZ Limited', 'Goliath', 'James', 'Received', 'Confirmed.'),
];

function BIllsTable() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [bill, setBill] = useState([]);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() =>{
        GetServices.getAllBill().then(
          (response) => {
            setBill(response.data['All Bills']);
            console.log(response.data)
            
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setBill(_content);
          }
        )
    }, [])
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                <TableCell align="left">{row.timestamp}</TableCell>
                <TableCell align="center">{row.bill}</TableCell>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="right">{row.sent}</TableCell>
                <TableCell align="right">{row.received}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                
                <TableCell align="right">{row.action === 'Confirmed.'?<span className=' bg-suc-color text-suc-text rounded-lg p-3'>{row.action}</span>: 
                <span className=' bg-inpro-co text-inpro-text rounded-lg p-3'>{row.action}</span>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default BIllsTable