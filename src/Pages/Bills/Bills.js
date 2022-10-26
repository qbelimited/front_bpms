import React from 'react'
import BIllsTable from '../../Components/Bills/BIllsTable'


function Bills() {
  return (
    <div>
      <div>
            <h1 className=' font-bold text-start '>Bills</h1>
            <p className=' text-gray-400 text-start'>Bills management page - Please edit to fit proper descriprion of the page</p>
        </div>
        <div className=' mt-10'>
          <BIllsTable />
        </div>
    </div>
  )
}

export default Bills