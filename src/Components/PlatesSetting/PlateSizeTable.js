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
import getServices from '../../Services/get-services';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import UpdateSizeModel from './UpdateSizeTable';

import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ActivatePlate from './ActivatePlate';

import DeactivatePlate from './DeactivatePlate';
const columns = [
 
  { id: 'mode', label: 'Description',},
  {
    id: 'quan',
    label: 'Dimension',
    align: 'Center',
    
  },
  {
    id: 'quan',
    label: 'Code',
    align: 'right',
    
  },
  {
    id: 'act',
    label: 'Action',
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



function PlateSizeTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [size, setSize] = useState([])
    const [open, setOpen] = useState(false)
    const handleClose = (() => setOpen(false))
    const [id, setId] = useState('')
    const [dimension, setDimension] = useState('')
    const[ description, setDescription] = useState('')
    const[code, setCode] = useState('')
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const handleClose2 = (() => setOpen2(false))
    const handleClose1 = (() => setOpen1(false))

    useEffect(()=>{
        getServices.getAllPlateDimension().then(
          (response) => {
            setSize(response.data['platedimensions']);
            console.log(response.data)
            
          },
          (error) => {
            
          }
        )
    },[])
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <div>
      <UpdateSizeModel 
      open={open}
      handleClose={handleClose}
      id={id}
      descri={description}
      dimen={dimension}
      codes={code}
      />
      <ActivatePlate
      id={id}
      handleClose={handleClose1}
      open={open1}
       />
       <DeactivatePlate 
         id={id}
      handleClose={handleClose2}
      open={open2}
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
              {size
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                      <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {row.description}
                </TableCell>
                
                <TableCell align="left">{row.dimensions}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right"><span className=' cursor-pointer p-2' 
                    onClick={() =>{
                      setOpen(true)
                      setId(row.id)
                      setDescription(row.description)
                      setDimension(row.dimensions)
                      setCode(row.code)
                    }}
                > <Tooltip title="Update"><EditIcon> </EditIcon></Tooltip></span>  {row.status === '1' ? <span
                  onClick={ (() => {
                        setId(row.id)
                        setOpen2(true)
                      })}
                  >
                  
                  <RemoveCircleOutlineOutlinedIcon className='cursor-pointer' 
                 sx={{ color: 'red'}}/>
                </span>    : <Tooltip className=' cursor-pointer' title="Activate">
                 <span  onClick={ (() => {
                      setId(row.id)
                      setOpen(true)
                    })}>
                       <AddCircleOutlineOutlinedIcon sx={{ color: 'green'}}/>
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
          count={size.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {size.length === 0 && <p className=' text-center text-red-800'>No Data Found</p>}
      </Paper>
      </div>
    );
}

export default PlateSizeTable