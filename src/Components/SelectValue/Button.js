import React from 'react'

function Button({name, onClick}) {
  return (
    <>
     <button 
      className=' bg-purple-700 px-4 py-4 border-none rounded-md text-white'
      onClick={onClick}
     >{name}</button>   
    </>
  )
}

export default Button