import React from 'react'
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
function Back() {
    const navigate = useNavigate();
  return (
    <div className=' mb-3 cursor-pointer' onClick={() => navigate(-1)}>
        <KeyboardBackspaceOutlinedIcon/>
    </div>
  )
}

export default Back