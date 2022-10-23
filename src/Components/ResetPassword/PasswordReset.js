import React, {useState} from 'react'
import LoginModal from '../Modal'
import { useNavigate } from 'react-router-dom';
import Button from '../SelectValue/Button'
import PasswordField from '../SelectValue/PasswordField'
import TextBox from '../SelectValue/TextBox'

function PasswordReset() {
    const [modal, setModal] = useState(false)
    const [error, setError]  = useState(false)
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault()
        setModal(true)
        setError(false)
    }
    const handleClose = () =>{
        setModal(false)
    }
    const handleNextPage = () =>{
        navigate('/')
    }
  return (
    <>
    { error ? 
        <LoginModal 
        open={modal}
        handleClose={handleClose}
        header='Password reset Failed'
        color=' text-red-700'
        body= 'You have entered an invalid password reset code. Please check your email and try again.'
        name='Try again'
        onClick={handleClose}
    />
    :
    <LoginModal 
        open={modal}
        
        header='Password reset successful'
        color=' text-green-600'
        body= 'You have chaged your BPMS password. Click the button to login with your new credentials.'
        name='Back to login'
        onClick={handleNextPage}
    />
    }
   
        <form onSubmit={handleSubmit}>
            <div className=' md:pl-6 mt-8 grid md:grid-cols-5 gap-4'>
            <div className=' col-span-2 '>
                <TextBox 
                    label='Password reset code'
                    type='text'
                />
            </div>
            <div className=' col-span-2 '>
                <PasswordField 
                    label='New password'

                />
            </div>
            <div className=' flex flex-col justify-end md:mr-14'>
                <Button 
                    name='Save password'
                />
            </div>
            </div>
        </form>
        <h5 className=' text-gray-400 mt-6 md:pl-6 hover:text-purple-600'>I didnt get a code</h5>

    </>
  )
}

export default PasswordReset