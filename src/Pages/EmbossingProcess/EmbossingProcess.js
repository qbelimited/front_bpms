import React,{useState} from 'react'
import EmbosingModal from '../../Components/EmbossingProcess/EmbosingModal'
import EmbrossingTable from '../../Components/EmbossingProcess/EmbrossingTable';
import AddsButtion from '../../Components/SelectValue/AddButtion'
import Back from '../../Components/Back'
function EmbossingProcess() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
    <EmbosingModal
        open={open}
        handleClose={handleClose}
    />
      <Back />
        <div className=' mb-4'>
            <h1 className=' font-bold text-start '>Embossing progress</h1>
            <p className=' text-gray-400 text-start'>Embossing progress page - Please edit to fit proper descriprion of the page</p>

        </div>
        <AddsButtion
            name='Start Embossing'
            onClick={handleOpen}
         />
         <div className=' mt-5'>
            <EmbrossingTable />
         </div>
    </div>
  )
}

export default EmbossingProcess