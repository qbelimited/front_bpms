import React, {useState} from 'react'
import Back from '../../Components/Back'
import EmbosserColorModel from '../../Components/PlatesSetting/EmbosserColorModel'
import PlateColorModal from '../../Components/PlatesSetting/PlateColorModal'
import PlateColorTable from '../../Components/PlatesSetting/PlateColorTable'
import PlateEmbosingColor from '../../Components/PlatesSetting/PlateEmbosingColor'
import PlateSizeModal from '../../Components/PlatesSetting/PlateSizeModal'
import PlateSizeTable from '../../Components/PlatesSetting/PlateSizeTable'
import AddsButtion from '../../Components/SelectValue/AddButtion'

function PlatesSettings() {
    const [open, setOpen] = useState({
        first: false,
        second: false,
        third: false,
    })
    const handleOpen1 = (() => setOpen({...open, first: true}))
    const handleOpen2 = (() => setOpen({...open, second: true}))
    const handleOpen3 = (() => setOpen({...open, third: true}))
    const handleClose1 = (() => setOpen({...open, first: false}))
    const handleClose2 = (() => setOpen({...open, second: false}))
    const handleClose3 = (() => setOpen({...open, third: false}))
  return (
    <div>
    <Back />
    <PlateColorModal 
        open={open.first}
        handleClose={handleClose1}
    />
    <PlateSizeModal 
        open={open.second}
        handleClose={handleClose2}
    />
    <EmbosserColorModel
        open={open.third}
        handleClose={handleClose3}
    />
        <div className=' mb-4'>
            <h1 className=' font-bold text-start '>Plates settings</h1>
            <p className=' text-gray-400 text-start'>Plate settings page - Please edit to fit proper descriprion of the page</p>

        </div>
        <div className=' mt-5 grid grid-cols-2 md:grid-cols-5 gap-3'>
            <AddsButtion 
                name='Add plate color'
                onClick={handleOpen1}
            />
            <AddsButtion 
                name='Add plate size'
                onClick={handleOpen2}
            />
             <AddsButtion 
                name='Add Embosser color'
                onClick={handleOpen3}
            />
        </div>

        <div className='mt-9 grid md:grid-cols-8 gap-4'> 
        <div className='col-span-1 md:col-span-2'>
        <PlateColorTable />
        </div>
        <div className='col-span-1 md:col-span-4'>
        <PlateSizeTable />
        </div>
        <div className='col-span-1 md:col-span-2'>
        <PlateEmbosingColor />
        </div>
        </div>
    </div>
  )
}

export default PlatesSettings