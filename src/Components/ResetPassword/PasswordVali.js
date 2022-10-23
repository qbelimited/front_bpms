
import React, {useState} from 'react'
import LoginModal from '../Modal'
import { useNavigate } from 'react-router-dom';
import Button from '../SelectValue/Button'
import TextBox from '../SelectValue/TextBox'

function PasswordVali() {
        const [modal, setModal] = useState(false)
        const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
            setModal(true)
    }
  
    const handleNextPage = () =>{
            navigate('/resetpassword')
    }
  return (
    <>
    <LoginModal 
        open={modal}
       
        header='Reset password'
        body='We have sent a password reset code to your
            email address please provide the code and
            your new password on the next screen'   
        name='Okay'
        color=' text-gray-400'
        onClick={handleNextPage}
    />
    <form onSubmit={handleSubmit}>
        <div className=' md:pl-6 mt-8 grid md:grid-cols-5 gap-4'>
        <div className=' col-span-2 '>
            <TextBox 
                label='Email address'
                type='email'
            />
         </div>
         <div className=' flex flex-col justify-end'>

           <Button 
            name='Reset password'
          
           />
         </div>
        </div>
    </form>
    <h5 className=' text-gray-400 mt-6 md:pl-6 hover:text-purple-600'>Please make sure you are providing your BPMS Email address</h5>
    </>
  )
}

export default PasswordVali