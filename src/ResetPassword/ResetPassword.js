import React from 'react'
import PasswordVali from '../Components/ResetPassword/PasswordVali'
import Topsec from '../Components/Topsec'

function ResetPassword() {
  return (
    <div className='p-2'>
        <Topsec 
            subTitle='Reset password'
        />
        <PasswordVali />
    </div>
  )
}

export default ResetPassword