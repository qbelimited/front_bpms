import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
function AddsButtion({onClick, name}) {
  return (
    
     <>
     <button 
      className=' bg-hero-pattern px-4 py-4 border-none rounded-md text-white'
      onClick={onClick}
     ><AddCircleOutlinedIcon /><span className=' pl-3'>{name}</span> </button>   
    </>
    
  )
}

export default AddsButtion