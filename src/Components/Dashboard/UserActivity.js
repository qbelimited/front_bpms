import React from 'react'
import SearchButton from '../SelectValue/SearchButton'
import MainTable from '../Table'

function UserActivity() {
  return (
    <div className=' mt-7 grid grid-cols-3'>
    <div className=' col-span-2'>
        <h1 className=''>User activity</h1>
        <div className=' mt-3 rounded-md grid grid-cols-2'>
            <SearchButton
            
            label='Search user...' />
        </div>
        <div className=' mt-5'>
        <MainTable />
        </div>
       
    </div>
</div>
  )
}

export default UserActivity