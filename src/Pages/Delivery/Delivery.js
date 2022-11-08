import React, {useState} from 'react'
import Back from '../../Components/Back'
import DeliveryTable from '../../Components/Delivery/DeliveryTable'
import MakeDelivery from '../../Components/Delivery/MakeDelivery'
import AddsButtion from '../../Components/SelectValue/AddButtion'
import Button from '../../Components/SelectValue/Button'

function Delivery() {
  const [open, setOpen] = useState(false)
  const handleOpen = (() => setOpen(true))
  const handleClose = (() => setOpen(false))
  return (
    <div>
    <MakeDelivery 
        open={open}
        handleClose={handleClose}
    />
    <Back />
      <div>
            <h1 className=' font-bold text-start '>Delivery</h1>
            <p className=' text-gray-400 text-start'>Delivery information page - Please edit to fit proper descriprion of the page</p>
        </div>
        <div className=' mt-3 mb-3'>
          <AddsButtion 
            name='Make delivery'
            onClick={handleOpen}
          />
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