import React from 'react'
import Logo from '../../images/Logobpms.png'
import Facebook from '../../images/fb.png'
import LinkedIn from '../../images/link.png'
import IG from '../../images/ins.png'
function AboutComponenet() {
  return (
    <div className=' mt-12 p-6 flex justify-center bg-gray-100 border border-gray-200 rounded-md '>
    <div>
        <img src={Logo} alt='logo' className=' mx-auto' />
        <p className=' text-center text-gray-500  mb-6 mt-1'>Version 1.0.0.1</p>
        <h5 className=' text-center mb-4'>This app was made by Ten-io</h5>
        <div className=' mt-4'>
            <h6 className=' mb-3 text-center text-gray-400'>Connect with us:</h6>
            <div className=' flex justify-around'>
                <img src={LinkedIn} alt='LinkedIn' />
                <img src={Facebook} alt='FB' />
                <img src={IG} alt='IG' />
            </div>
        </div>
    </div>
    </div>
  )
}

export default AboutComponenet