import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
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

function UpdateSizeModel({open, handleClose, id, descri, dimen, codes,}) {
    const bool = true
    const [description, setDescription] = useState('')
    const [dimension, setDimension] = useState('')
    const [code, setCode] = useState('')
    const[loading, setLoading] = useState(false)
    const[ids, setId] = useState('')
     
    useEffect(() =>{
         setId(id)  
         setDescription(descri) 
         setDimension(dimen)
         setCode(codes)

    }, [id, descri, codes, dimen])

    const handleSubmit = (e) =>{
 
     e.preventDefault()
     setLoading(true)
     postService.updatePlateSize(description, code, dimension,ids).then(
       (response) => {
         
         swal("Updated Successfully.")
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
           swal("Error Occured.")
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
                   <h1 className=' text-gray-400'>Add new plate size</h1>
                  <div onClick={handleClose}>
                  <HighlightOffOutlinedIcon />
                  </div> 
               </div>
             </Typography>
             <form onSubmit={handleSubmit}>
             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
               <div className=' mb-2'>
                  
                   <TextBox 
                      label='Description'
                      type='text'
                      bool={bool}
                      value={description}
                      onChange={setDescription}
                   />
               </div>
              
               <div className=' mt-3 grid grid-cols-2 gap-4'>
                   <div className=' '>
                   <TextBox 
                      label='Dimention'
                      type='text'
                      bool={bool}
                      value={dimension}
                      onChange= {setDimension}
                   />
                   </div>
                   <div className=' '>
                   <TextBox 
                      label='Code'
                      type='text'
                      bool={bool}
                      value={code}
                      onChange={setCode}
                   />
                   </div>
                   </div>
   
             </Typography>
             <div className=' mt-3'>
             <Button 
               name={loading ? 'loading':'Add plate size'}
              
             />
             </div>
             </form>
           </Box>
         </Modal>
       </div>
  )
}

export default UpdateSizeModel