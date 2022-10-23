import React from 'react'
import { Link } from 'react-router-dom'
import LinkLogin from '../LinkLogin'
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
    <LinkLogin 
        path='/resetpasswordvali'
        title='I have forgotten my password'
    />
  
    </> 
  )
}

export default SigninForm