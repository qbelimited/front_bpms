
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from './SelectValue/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open,handleClose,header, body, color, name, onClick }) {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} className=' shadow-lg rounded-md'>
          <Typography id="modal-modal-title" className={color} variant="h6" component="h2">
         {header}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         {body}
          </Typography>
          <div className=' mt-3'>
          <Button 
            name={name}
            onClick={onClick}
          />
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
