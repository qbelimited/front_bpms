import React, {useState} from 'react'
import Back from '../../Components/Back'
import CompanyCreateModal from '../../Components/CompanyManagement/CompanyCreateModal'
import CompanyManageTable from '../../Components/CompanyManagement/CompanyManageTable'
import AddsButtion from '../../Components/SelectValue/AddButtion'

function CompanyManagement() {
    const [open, setOpen] = useState(false)
    const handleOpen = (() => setOpen(true));
    const handleClose = (() => setOpen(false));
  return (
    <div>
    <CompanyCreateModal
        open={open}
        handleClose={handleClose}
    />
    <Back />
        <div className=' mb-4'>
            <h1 className=' font-bold text-start '>Company management</h1>
            <p className=' text-gray-400 text-start'>Company management page - Please edit to fit proper descriprion of the page</p>

        </div>
        <div className=' mt-8 '>
                <AddsButtion
                    name='Add new company'
                    onClick={handleOpen}
                 />
            </div>
        <div className=' mt-8 grid md:grid-cols-5 gap-4'>
            <div className=' md:col-span-5'>
                <CompanyManageTable />
            </div>
            
        </div>
    </div>
  )
}

export default CompanyManagement