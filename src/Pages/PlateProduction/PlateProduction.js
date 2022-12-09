import React,{useState} from 'react'
import Back from '../../Components/Back';
import PlateProductionModal from '../../Components/PlateProduction/PlateProductionModal';
import PlateProTable from '../../Components/PlateProduction/PlateProTable';
import AddsButtion from '../../Components/SelectValue/AddButtion'

function PlateProduction() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div className=' '>
    <PlateProductionModal
        open={open}
        handleClose={handleClose}
    />
    <Back />
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
        <div className=' '>
        <PlateProTable />
        </div>
        
    </div>
  )
}

export default PlateProduction