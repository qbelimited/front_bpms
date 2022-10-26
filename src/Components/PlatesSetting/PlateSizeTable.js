import * as React from 'react';
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

const columns = [
  { id: 'sn', label: 'S/N', minWidth: 30 },
  { id: 'mode', label: 'Plate size', minWidth: 100 },
  {
    id: 'quan',
    label: 'Width',
    minWidth: 100,
    align: 'right',
    
  },
  {
    id: 'name',
    label: 'Height',
    minWidth: 170,
    align: 'center',
  
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

function createData(sn, mode, quan, name) {
  
  return { sn, mode, quan, name};
}

const rows = [
  createData('01', 'Received', 50, 'XYZ Limited'),
  createData('02', 'Received', 50, 'XYZ Limited'),
  createData('03', 'Received', 50, 'XYZ Limited'),
  createData('04', 'Received', 50, 'XYZ Limited'),
  createData('05', 'Received', 50, 'XYZ Limited'),
  createData('06', 'Received', 50, 'XYZ Limited'),
  createData('07', 'Received', 50, 'XYZ Limited'),
  createData('08', 'Received', 50, 'XYZ Limited'),
  createData('09', 'Received', 50, 'XYZ Limited'),
  createData('10', 'Received', 50, 'XYZ Limited'),
  createData('11', 'Received', 50, 'XYZ Limited'),
  createData('12', 'Received', 50, 'XYZ Limited'),
];

function PlateSizeTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
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
                <TableCell align="left">{row.mode}</TableCell>
                <TableCell align="center">{row.quan}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
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

export default PlateSizeTable