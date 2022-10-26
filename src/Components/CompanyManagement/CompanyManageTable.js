import  React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { styled } from '@mui/material/styles';
import SearchButton from '../SelectValue/SearchButton'
import CompanyUpdateModal from './CompanyUpdateModal';
const columns = [
  { id: 'name', label: 'Company name', minWidth: 30 },
  { id: 'loc', label: 'Location', minWidth: 100 },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 100,
    align: 'right',
    
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center',
  
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 50,
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

function createData( name, loc, phone, email, action) {
  
  return { name, loc, phone, email, action};
}

const rows = [
  createData('ABC Limited', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limitedu', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limitedp', 'Received', 90, 'XYZ Limited'),
  createData('ABC iLimited', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limited0', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limited8', 'Received', 90, 'XYZ Limited'),
  createData('ABC Limited6', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limited-', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limitekd', 'Received', 90, 'XYZ Limited'),
  createData('ABC Limiteod', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limitjed', 'Received', 50, 'XYZ Limited'),
  createData('ABC Limitedn', 'Received', 50, 'XYZ Limited'),
];


function CompanyManageTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const handleOpen = (() => setOpen(true));
    const handleClose = (() => setOpen(false));
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
        <>
        <CompanyUpdateModal 
            open={open}
            handleClose={handleClose}
        />
        <div className='mb-10'>
            <SearchButton
                label='Search for a company'
             />
        </div>
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
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.loc}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="left">{row.phone === 90 ? <span className=' text-blue-600 cursor-pointer' onClick={handleOpen}>Update <RemoveCircleOutlineOutlinedIcon sx={{ color: 'red'}}/> </span> :
                <span className=' text-blue-600 cursor-pointer' onClick={handleOpen}>Update <AddCircleOutlineOutlinedIcon sx={{ color: 'green'}}/> </span>
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
      </>
    );
}

export default CompanyManageTable