import React,{useState} from 'react'
import Back from '../../Components/Back'
import AddsButtion from '../../Components/SelectValue/AddButtion'
import StorageModal from '../../Components/Storage/StorageModal';
import TableStorage from '../../Components/Storage/TableStorage'

function Storage(){
  const [open, setOpen] = useState(false);
  const handleOpen = (() => setOpen(true))
  const handleClose = (() => setOpen(false))
  return (
    <div>
    <Back />
      <StorageModal 
        open={open}
        handleClose={handleClose}
      />
       <div className=' mb-4'>
            <h1 className=' font-bold text-start '>Storage</h1>
            <p className=' text-gray-400 text-start'>Storage page - Please edit to fit proper descriprion of the page</p>

        </div>
                <AddsButtion 
          name='Create warehouse'
          onClick={handleOpen}
        />
        <div className=' mt-5 overflow-x-auto grid md:grid-cols-3 gap-4'>
        <div className=' col-span-2'>
        <TableStorage />
        </div>
         
        </div>
    </div>
  )
}

export default Storage