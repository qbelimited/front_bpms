import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import {useSelector}  from "react-redux";

import SelectPlate from '../EmbossingProcess/selectPlate';
import SelectCompany from './SelectCompany';
import postService from '../../Services/post-services';
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

function MakeDelivery({open, handleClose}) {
    const bool = true
    const {  user } = useSelector((state) => state.auth);
    const[company, setCompany] = useState('')
    const [plate, setPlate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [loading, setLoading] = useState(false)
    const [cost, setCost] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
            setLoading(true)
        postService.makeDelivery(plate,user.user.id,company, quantity,cost).then(
            (response) => {
                console.log(response.data)
                swal("Delivery made Successfully")
                  .then((value) => {
                    window.location.reload()
                  });
                setLoading(false)
              },
              (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                  return  swal('Delivery failed')
                  .then((value) => {
                    window.location.reload()
                  });
                 
              }
        )
    }
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
                  <h1 className=' text-gray-400'>Make Delivery</h1>
                 <div onClick={handleClose}>
                 <HighlightOffOutlinedIcon />
                 </div> 
              </div>
            </Typography>
            <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className=' mb-2'>
                  <label className=' block mb-1'>Select from available plates</label>
                  <SelectPlate
                      bool={true}
                      value={plate}
                      onChange={setPlate}
                  />
              </div>
              <div className=' mb-2'>
                  <label className=' block mb-1'>Select a Company</label>
                  <div className=' w-full'>
                  <SelectCompany
                   bool={bool}
                   value={company}
                   onChange={setCompany}
                  />
                  </div>
                  
              </div>
             
                  <div className=' mb-2'>
                      <TextBox 
                          label='Quantity'
                          type='text'
                          bool={bool}
                          onChange={setQuantity}
                          value={quantity}
                      />
                  </div>
                  <div className=' mb-2'>
                      <TextBox 
                          label='Cost'
                          type='text'
                          bool={bool}
                          onChange={setCost}
                          value={cost}
                      />
                  </div>
            </Typography>
            <div className=' mt-3'>
            <Button 
              name={loading? 'Loading':'Make Delivery'}
             
            />
            </div>
            </form>
          </Box>
        </Modal>
      </div>
    )
}

export default MakeDelivery