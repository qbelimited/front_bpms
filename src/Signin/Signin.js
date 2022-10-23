import React from 'react'
import SigninForm from '../Components/signin-com/SigninForm'
import Topsec from '../Components/Topsec'

function Signin() {
  return (
    <div className=' p-2'>
            <Topsec 
                subTitle='Sign in'
            />
            <SigninForm />
    </div>
  )
}

export default Signin