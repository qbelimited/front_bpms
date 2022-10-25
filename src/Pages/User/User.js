import React from 'react'
import UserForm from '../../Components/User/UserForm'
import Car from '../../images/car.png'
import UserIcon from '../../images/useri.png'
import Notice from '../../images/notice.png'
function UserPage() {
  return (
    <div>
         <div>
            <h1 className=' font-bold text-start '>Page profile</h1>
            <p className=' text-gray-400 text-start'>User profile page - Please edit to fit proper descriprion of the page</p>

        </div>
        <div className=' mt-5 relative'>
        <img src={Car} alt='Car' className=' h-56 w-full'/> 
            <img src={UserIcon} alt='UserImage' className=' md:absolute  md:-bottom-4 md:left-24' />
            <div className=' grid md:grid-cols-5 '>
                <div></div>
                <div className=' col-span-3 mt-2'>
                    <h4>Nakia Panther  - <span className=' text-gray-300'>Manufacturer</span></h4>
                    <h4>User type: System administrator</h4>
                </div>
            </div>
        </div>
        <UserForm />

        <div className='mt-4'>
            <img src={Notice} alt='Notice' className=' inline-block'/>
           <h1 className='  pl-4 inline-block'>If you have any issues concerning your details, please contact BPMS super admin on 022444249</h1>
        </div>
    </div>
  )
}

export default UserPage