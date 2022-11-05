import React from 'react'
import TextBox from '../SelectValue/TextBox'

function UserForm({phone, email, company}) {
    
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