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
  { id: 'sn', label: 'S/N', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'batch',
    label: 'Batch No.',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'quan',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
  
  },
  {
    id: 'starttime',
    label: 'Start time',
    minWidth: 170,
    align: 'right',
   
  },
  {
    id: 'eta',
    label: 'ETA',
    minWidth: 170,
    align: 'right',
   
  },
  {
    id: 'sta',
    label: 'Status',
    minWidth: 170,
    align: 'right',
   
  },
];

function createData(sn, date, batch, quan, starttime, eta, sta) {
  
  return { sn, date, batch, quan,starttime,eta, sta };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 'IN', 1324171354, 'Completed'),
  createData('China', 'CN', 1403500365, 9596961, 'IN', 1324171354, 'Completed'),
  createData('Italy', 'IT', 60483973, 301340, 'IN', 1324171354, 'Completed'),
  createData('United States', 'US', 327167434, 9833520, 'IN', 1324171354, 'Completed'),
  createData('Canada', 'CA', 37602103, 9984670, 'IN', 1324171354, 'Completed'),
  createData('Australia', 'AU', 25475400, 7692024, 'IN', 1324171354, 'Completed'),
  createData('Germany', 'DE', 83019200, 357578, 'IN', 1324171354, 'Completed'),
  createData('Ireland', 'IE', 4857000, 70273, 'IN', 1324171354, 'Completed'),
  createData('United States', 'UqS', 327167434, 9833520, 'IN', 1324171354, 'Completed'),
  createData('Canada', 'CwA', 37602103, 9984670, 'IN', 1324171354, 'Completed'),
  createData('Australia', 'AdU', 25475400, 7692024, 'IN', 1324171354, 'Completed'),
  createData('Germany', 'DqE', 83019200, 357578, 'IN', 1324171354, 'Completed'),
  createData('Ireland', 'IeE', 4857000, 70273, 'IN', 1324171354, 'Completed'),
   createData('United States', 'UeS', 327167434, 9833520, 'IN', 1324171354, 'Completed'),
  createData('Canada', 'CqA', 37602103, 9984670, 'IN', 1324171354, 'Completed'),
  createData('Australia', 'AeU', 25475400, 7692024, 'IN', 1324171354, 'Completed'),
  createData('Germany', 'D2E', 83019200, 357578, 'IN', 1324171354, 'Completed'),
  createData('Ireland', 'IwE', 4857000, 70273, 'IN', 1324171354, 'Completed'),
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
        setProductions(response.data['production years']);
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
  })

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sn}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.batch}</TableCell>
              <TableCell align="right">{row.quan}</TableCell>
              <TableCell align="right">{row.starttime}</TableCell>
              <TableCell align="right">{row.eta}</TableCell>
              <TableCell align="right"><span className=' bg-suc-color text-suc-text rounded-lg p-3'>{row.sta}</span></TableCell>
             
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
