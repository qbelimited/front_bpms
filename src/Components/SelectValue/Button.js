import React from 'react'

function Button({name}) {
  return (
    <>
     <button className=' bg-purple-700 px-2 py-4 border-none rounded-md text-white'>{name}</button>   
    </>
  )
}

export default Button