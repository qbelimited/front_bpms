import React from 'react'
import AboutComponenet from '../../Components/AboutBPMS/AboutComponenet'
import Back from '../../Components/Back'

function Aboutbpms() {
  return (
    <div>
    <Back />
      <div className=' mb-4'>
            <h1 className=' font-bold text-start '>About BPMS</h1>
            <p className=' text-gray-400 text-start'>About BPMS page - Please edit to fit proper descriprion of the page</p>

        </div>
        <AboutComponenet />
    </div>
  )
}

export default Aboutbpms