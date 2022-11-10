import  React, {useState, useEffect} from 'react';
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
import getServices from '../../Services/get-services';
import ActivateColor from './ActivateColor';
import DeactivateColor from './DeactiveColor';

const columns = [
  { id: 'sn', label: 'S/N', minWidth: 30 },
  { id: 'color', label: 'Plate colour', align: 'right', minWidth: 60 },
  
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




function PlateColorTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [colors, setColors] = useState([])
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [id, setId] = useState('')
    
    const handleClose = (() => setOpen(false))
  
    const handleClose1 = (() => setOpen1(false))
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  useEffect(() =>{
      getServices.getAllColor().then(
        (response) => {
          setColors(response.data['platecolors']);
          console.log(response.data)
          
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setColors(_content);
        }
      )
  },[])

    return (
      <>
       <ActivateColor 
         open={open}
         handleClose={handleClose}
         id={id}
       />
       <DeactivateColor 
        open={open1}
        handleClose={handleClose1}
        id={id}
       />
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
              {colors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.color}
                </TableCell>
                <TableCell align="right"> <span className=' text-blue-600 cursor-pointer' >Update 
                </span>{row.status === '1' ?  <RemoveCircleOutlineOutlinedIcon onClick={ (() => {
                      setId(row.id)
                      setOpen1(true)
                    })}
                 sx={{ color: 'red'}}/>  :
                 <AddCircleOutlineOutlinedIcon onClick={ (() => {
                      setId(row.id)
                      setOpen(true)
                    })} sx={{ color: 'green'}}/> 
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
          count={colors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {colors.length === 0 && <p className=' text-center text-red-800'>No Data Found</p>}
      </Paper>
      </>
    );
}

export default PlateColorTable