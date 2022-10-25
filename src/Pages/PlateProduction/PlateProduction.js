import React,{useState} from 'react'
import PlateProductionModal from '../../Components/PlateProduction/PlateProductionModal';
import PlateProTable from '../../Components/PlateProduction/PlateProTable';
import AddsButtion from '../../Components/SelectValue/AddButtion'

function PlateProduction() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
    <PlateProductionModal
        open={open}
        handleClose={handleClose}
    />
         <div>
            <h1 className=' font-bold text-start '>Production progress</h1>
            <p className=' text-gray-400 text-start'>Plate production page - Please edit to fit proper descriprion of the page</p>
        </div>
        <div className='mb-5 mt-3'>
       <AddsButtion 
        name='Start Manufacturing'
        onClick={handleOpen}
       />
        </div>
        <PlateProTable />
    </div>
  )
}

export default PlateProduction