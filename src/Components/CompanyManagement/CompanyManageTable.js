import  React, {useState, useEffect, useMemo} from 'react';
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
import getServices from '../../Services/get-services';
import ActivateCompany from './ActivateCompany';
import DeactivateCompany from './DeactivateCompany';
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
    const[companies, setCompanies] = useState([])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false);
    const[name, setName] = useState('')
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const[ status, setStatus] = useState('')
    const [id, setId] = useState('')
    const handleOpen1 = () =>{
      setOpen1(true)
    }
    const handleClose1 = () =>{
      setOpen1(false)
    }
    const handleOpen2 = () =>{
      setOpen2(true)
    }
    const handleClose2 = () =>{
      setOpen2(false)
    }
    const handleClose = (() => setOpen(false));
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(()=>{
        getServices.getAllCompany().then(
          (response) => {
              
            setCompanies(response.data['companies']);
            
            console.log(response.data['companies'])
            
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setCompanies(_content);
          }
        )
    },[])
  
      const searchCompany = useMemo(() => {
        let comp = companies;

        if (search) {
            comp = comp.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.location.toLowerCase().includes(search.toLowerCase()) 
            );
        }

       
    }, [companies, search,]);
    return (
        <>
        <DeactivateCompany 
          open={open2}
          id={id}
          handleClose={handleClose2}
        />
        <ActivateCompany 
          open={open1}
          handleClose={handleClose1}
          id={id}
        />
        <CompanyUpdateModal 
            open={open}
            handleClose={handleClose}
            name={name}
            phone={phone}
            email={email}
            status={status}
            id={id}
            location={location}
        />
        <div className='mb-10'>
            <SearchButton
                label='Search for a company'
                value={search}
                onChange={setSearch}
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
              {companies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                      <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center"> <span className=' text-blue-600 cursor-pointer' onClick={ (() => {
                      setPhone(row.phone)
                      setLocation(row.location)
                      setEmail(row.email)
                      setStatus(row.status)
                      setId(row.id)
                      setName(row.name)
                      setOpen(true)
                    })}>Update</span>{row.status === '1' ?  <RemoveCircleOutlineOutlinedIcon onClick={ (() => {
                      setId(row.id)
                      setOpen2(true)
                    })} sx={{ color: 'red'}}/>  :
                      <AddCircleOutlineOutlinedIcon onClick={ (() => {
                      setId(row.id)
                      setOpen1(true)
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {companies.length === 0 && <p className=' text-center text-red-900'>No Data Found</p>}
      </Paper>
      </>
    );
}

export default CompanyManageTable


