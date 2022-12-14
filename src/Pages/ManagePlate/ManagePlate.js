import React from 'react'
import ManagePlateTable from '../../Components/ManagePlate/ManagePlateTable'
import Back from '../../Components/Back'
function ManagePlate() {
  return (
    <div>
    <Back />
        <div>
            <h1 className=' font-bold text-start '>Manage plates</h1>
            <p className=' text-gray-400 text-start'>Summary of plates in BPMS Inventory - Please edit to fit proper descriprion of the page</p>
        </div>
        <ManagePlateTable />
    </div>
  )
}

export default ManagePlate