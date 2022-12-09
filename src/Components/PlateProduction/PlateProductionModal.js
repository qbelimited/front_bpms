import React,{useState} from 'react'
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../SelectValue/Button'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextBox from '../SelectValue/TextBox';
import SelectColor from './SelectColor';
import SelectSize from './SelectSize';
import postService from '../../Services/post-services';
import Spinners from '../SelectValue/Spinner';
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
function PlateProductionModal({open, handleClose}) {
  const bool = true
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState('')
  const [dimension, setDimension] = useState('')
  const[serialNo, setSerialNo] = useState()
  const [quantity, setQuantity] = useState()
  const [batchCode, setBatchCode] = useState()

  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)

    postService.addProduction(color, dimension, quantity,batchCode, serialNo).then(
      (response) => {
        console.log(response.data)
        swal("Plate Production added Successfully")
          .then((value) => {
            window.location.reload()
          });
         
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          return  swal(_content)
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
                <h1 className=' text-gray-400'>Start manufacturing</h1>
               <div onClick={handleClose}>
               <HighlightOffOutlinedIcon />
               </div> 
            </div>
          </Typography>
          <form onSubmit={handleSubmit}> 
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className=' mb-2'>
                <label className=' block mb-1'>Select a colour</label>
                <SelectColor
                 bool={bool}
                 value={color}
                 onChange= {setColor}
                 />
            </div>
            <div>
                <label className=' block mb-1'>Select a size</label>
                <div className=' w-full'>
                <SelectSize
                    bool={true}
                    value={dimension}
                    onChange={setDimension}
                />
                </div>
                
            </div>
            <div className=' mt-3 grid grid-cols-3 gap-4'>
                <div className=' col-span-2 '>
                    <TextBox 
                        label='Enter last serial number'
                        type='text'
                        bool={bool}
                        value={serialNo}
                        onChange={setSerialNo}
                    />
                </div>
                <div>
                <TextBox 
                        label='Quantity'
                        type='text'
                        bool={bool}
                        value={quantity}
                        onChange={setQuantity}
                    />
                </div>
            </div>
            <div className=' mt-3'>
            <TextBox 
                        label='Batch Code'
                        type='text'
                        bool={bool}
                        value={batchCode}
                        onChange={setBatchCode}
                    />
            </div>

          </Typography>
          <div className=' mt-3'>
          <Button 
            name={loading ? <Spinners/> :'Start manufacturing'}
           
          />
          </div>
          </form>
          
        </Box>
      </Modal>
    </div>
  )
}

export default PlateProductionModal