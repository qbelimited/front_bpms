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
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import UpdateEmbosserColor from './UpdateEmbosserColor';
import ActivateEmbosserColor from './ActivateEmbosserColor';
import DeactivateEmbosserColor from './DeactivateEmbosserColor';

const columns = [
    { id: 'sn', label: 'Plate colour',  },
    { id: 'color', label: 'Code', align: 'right', },
    { id: 'action', label: 'Action', align: 'right', },
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

    
function PlateEmbosingColor() {
    const [colors, setColors] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const handleClose = (() => setOpen(false))
    const handleClose2 = (() => setOpen2(false))
    const handleClose1 = (() => setOpen1(false))
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    useEffect(() =>{
        getServices.embossingCollors().then(
          (response) => {
            setColors(response.data['embosser colors']);
            console.log(response.data)
            
          },
          (error) => {
            
    
              
          }
        )
    },[])

  return (
    <div>
        <UpdateEmbosserColor
          open={open}
          handleClose={handleClose}
          id={id}
          name={name}
          code={code}
        />
        <ActivateEmbosserColor
          open={open1}
          handleClose={handleClose1}
          id={id}
        />
        <DeactivateEmbosserColor
          open={open2}
          handleClose={handleClose2}
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
                <TableCell align="right">
                  {row.code}
                </TableCell>
                <TableCell align="right"> <span className='  cursor-pointer' 
                 onClick={()=>{
                   setOpen(true)
                   setId(row.id)
                   setName(row.color)
                   setCode(row.code)
                 }}
                > <Tooltip title="Update"><EditIcon /></Tooltip>
                </span>{row.status === '1' ? <> <span
                 onClick={() =>{
                  setOpen2(true)
                  setId(row.id)
                 }}
                > 
                <RemoveCircleOutlineOutlinedIcon className='cursor-pointer' 
                 sx={{ color: 'red'}}/></span> </>  : <Tooltip className=' cursor-pointer' title="Activate">
                  <span 
                 onClick={() =>{
                  setOpen1(true)
                  setId(row.id)
                 }}
                 >
                  <AddCircleOutlineOutlinedIcon   sx={{ color: 'green'}}/> 
                 </span>
                 </Tooltip> 
                
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
    </div>
  )
}

export default PlateEmbosingColor