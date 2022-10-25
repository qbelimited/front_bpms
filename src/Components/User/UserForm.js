import React,{useState} from 'react'
import TextBox from '../SelectValue/TextBox'

function UserForm() {
    const[phone, setPhone] = useState("022444245")
    const[email, setEmail] = useState('abc@gmail.com')
    const[company, setCompany] = useState('ABC Limited')
    const bool = true;
  return (
    <div className=' mt-12 mb-5 grid md:grid-cols-3 gap-4'>
        <TextBox 
            label='Phone'
            type='number'
            value={phone}
            bool={bool}
        />
         <TextBox 
            label='Email'
            type='email'
            value={email}
            bool={bool}
        />
         <TextBox 
            label='Company'
            type='text'
            value={company}
            bool={bool}
        />
    </div>
  )
}

export default UserForm