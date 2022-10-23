import React from 'react'
import PasswordReset from '../../Components/ResetPassword/PasswordReset'
import Topsec from '../../Components/Topsec'

function ResetPasswordValidation() {
  return (
    <div className='p-2'>
        <Topsec 
            subTitle='Reset password'
        />
        <PasswordReset />
    </div>
  )
}

export default ResetPasswordValidation