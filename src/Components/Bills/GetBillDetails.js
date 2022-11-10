import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import getServices from '../../Services/get-services';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


function GetBillDetails({id, open, handleClose}) {
    const [bill, setBill] = useState([])

    useEffect(() =>{

        getServices.getBillDetails(id).then(
            (response) => {
                console.log(response.data)
                setBill(response.data['Bill Details'])
               
              },
              (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                  return  setBill([])
                 
              }
        )
    }, [id])
   
  return (
    <div>
        
        <Modal
          open={open} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className=' shadow-lg rounded-md'>
            <Typography id="modal-modal-title" className='' variant="h6" component="h2">
              <div className=' flex justify-between'>
                  <h1 className=' text-gray-400'>Bill Details</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>

            <div className=' mt-4'>
               <div>
                {bill.map(i => {
                    return(
                        <div key={i.id}>
                            <h6 className=' mb-3'> <span className=' font-bold'>Plate Number: </span> {i.number_plate}</h6>
                            <h6 className=' mb-3'> <span className=' font-bold'>Sender: </span> {i.sent_by}</h6>
                            <h6 className=' mb-3'> <span className=' font-bold'>Companay Name: </span> {i.name}</h6>
                            <h6 className=' mb-3'> <span className=' font-bold'>Date: </span> {i.date}</h6>
                            <h6 className=' mb-3'> <span className=' font-bold'>Quantity: </span> {i.quantity}</h6>
                            <h6 className=' mb-3'> <span className=' font-bold'>Cost: </span> {i.cost}</h6>
                           
                        </div>
                    )
                })}
               </div>
               {bill.length === 0 && <p className=' text-red-800 text-center'>No Data Found</p>}
            </div>
           
            
          </Box>
        </Modal>
      </div>
  )
}

export default GetBillDetails