import React from 'react'
import Car from '../images/car.png'
function Topsec({subTitle}) {
  return (
    <div className=' relative'>
       <img src={Car} alt='Car' className=' h-96 w-full'/> 
       <h1 className=' absolute bottom-20 left-5 text-white text-3xl md:text-5xl'>Blank plate management system </h1>
       <p className=' absolute bottom-10 left-5 text-white'>{subTitle} </p>
    </div>
  )
}

export default Topsec