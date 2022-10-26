import React from 'react'
import Back from '../../Components/Back'
import DeliveryTable from '../../Components/Delivery/DeliveryTable'

function Delivery() {
  return (
    <div>
    <Back />
      <div>
            <h1 className=' font-bold text-start '>Delivery</h1>
            <p className=' text-gray-400 text-start'>Delivery information page - Please edit to fit proper descriprion of the page</p>
        </div>
        <div className=' mt-10 grid md:grid-cols-5'>
        <div className=' col-span-4'>
        <DeliveryTable />
        </div>
         
        </div>
    </div>
  )
}

export default Delivery