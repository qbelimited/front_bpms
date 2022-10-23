import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../SelectValue/Button'
import PasswordField from '../SelectValue/PasswordField'
import TextBox from '../SelectValue/TextBox'

function SigninForm() {
  return (
    <>
    <form>
    <div className='md:pl-6 mt-8 grid md:grid-cols-6 gap-3'>
        
        <div className=' col-span-2'>
        <TextBox 
                label='Email address'
                type='email'
               /> 
        </div>
        <div className=' col-span-2'>
       <PasswordField 
        label='Password'
       />
        </div>
            <div className=' flex flex-col justify-end'>
            <Button 
            name='Sign in'
           /> 
            </div>
              
    </div>
    </form>
    <Link to='/resetpasswordvali'>
    <h5 className=' text-gray-400 mt-6 md:pl-6 hover:text-purple-600'>I have forgotten my password</h5>
    </Link>
  
    </> 
  )
}

export default SigninForm