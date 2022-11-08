import React, {useState, useEffect} from 'react';
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
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import { styled } from '@mui/material/styles';
import SearchButton from '../SelectValue/SearchButton';
import AddsButton from '../SelectValue/AddButtion'
import UserUpdateModal from './UserUpdateModal';
import UserCreateModal from './UserCreateModal';
import getServices from '../../Services/get-services';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'white',
      color: 'rgba(50, 64, 84, 0.5)',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function createData(sn, mode, quan, name, time, sentby, invoice) {
  
  return { sn, mode, quan, name, time, sentby, invoice};
}

const rows = [
  createData('01', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('02', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('03', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshue'),
  createData('04', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('05', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('06', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('07', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshue'),
  createData('08', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshue'),
  createData('09', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('10', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('11', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
  createData('12', '**********'," 022444245", 'XYZ Limited', '22/10/2022 - 15:25', 'Joshua'),
];

function UserManagementTable() {
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] =useState(10);
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])
    const handleOpen = (() => setOpen(true))
    const handleClose = (() => setOpen(false))
    const [open1, setOpen1] = useState(false)
    const handleOpen1 = (() => setOpen1(true))
    const handleClose1 = (() => setOpen1(false))
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() =>{
       getServices.getAllUsers().then(
        (response) => {
          setUsers(response.data['users']['data']);
          console.log(response.data)
          
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setUsers(_content);
        }
       )
    },  [])
    return (
        <>
        <UserUpdateModal
            open={open}
            handleClose={handleClose}
        />
        <UserCreateModal 
            open={open1}
            handleClose={handleClose1}
        />
        <div className=' mb-9 grid grid-cols-5 gap-4'>
        <div className=' col-span-4'>
            <SearchButton 
                label='Search for a user'
            />

        </div>
        <AddsButton
            name='Add new User'
            onClick={handleOpen1}
        />
        </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className=' bg-gray-50' sx={{ maxHeight: 440 }}>
          <Table   stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
              <StyledTableCell>User name</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="right">Company name</StyledTableCell>
            <StyledTableCell align="center">User type</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fname} {row.mname}
                </TableCell>
                <TableCell align="left">{row.phone1}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.company_id}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.status === '1' ? <span onClick={handleOpen} className=' text-blue-600 cursor-pointer' >Update <RemoveCircleOutlineOutlinedIcon sx={{ color: 'red'}}/> </span> :
                <span onClick={handleOpen} className=' text-blue-600 cursor-pointer' >Update <AddCircleOutlineOutlinedIcon sx={{ color: 'green'}}/> </span>
                }</TableCell>              </TableRow>
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

export default UserManagementTable