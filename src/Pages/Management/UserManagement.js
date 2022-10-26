import React from 'react'
import Back from '../../Components/Back'
import UserManagementTable from '../../Components/UserManagement/UserManagementTable'

function UserManagement() {
  return (
    <div>
    <Back />
        <div className=' mb-4'>
            <h1 className=' font-bold text-start '>User management</h1>
            <p className=' text-gray-400 text-start'>User management page - Please edit to fit proper descriprion of the page</p>

        </div>
        <div className=' mt-10'>
            <UserManagementTable />
        </div>
    </div>
  )
}

export default UserManagement