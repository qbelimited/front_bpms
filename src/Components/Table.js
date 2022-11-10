import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
const columns = [
  { id: 'name', label: 'Name', },
  { id: 'usertype', label: 'User type', },
  {
    id: 'login',
    label: 'Last login',
    
    align: 'right',
   
  },
  {
    id: 'activity',
    label: 'Activity',
    
    align: 'right',
   
  },
  {
    id: 'acti',
    label: 'Date',
    
    align: 'right',
   
  },
 
];



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, ),
    createData('Ice cream sandwich', 237, 9.0, 37, ),
    createData('Eclair', 262, 16.0, 24, ),
    createData('Cupcake', 305, 3.7, 67, ),
    createData('Gingerbread', 356, 16.0, 49, ),
    createData('Frozen yoghurt', 159, 6.0, 24, ),
    createData('Ice cream sandwich', 237, 9.0, 37, ),
    createData('Eclair', 262, 16.0, 24, ),
    createData('Cupcake', 305, 3.7, 67, ),
    createData('Gingerbread', 356, 16.0, 49, ),
    createData('Frozen yoghurt', 159, 6.0, 24, ),
    createData('Ice cream sandwich', 237, 9.0, 37, ),
    createData('Eclair', 262, 16.0, 24, ),
    createData('Cupcake', 305, 3.7, 67, ),
    createData('Gingerbread', 356, 16.0, 49, ),
  ];
export default function MainTable() {
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
    <div className=' w-full overflow-x-auto'>
    <Paper className=' w-full  '>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table className=' bg-gray-100' stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
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
    </div>
  );
}
