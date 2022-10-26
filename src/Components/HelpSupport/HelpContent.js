import React from 'react'
import SelectButton from '../SelectValue/SelectButton'
import Textarea from '../SelectValue/Textarea'
import TextBox from '../SelectValue/TextBox'
import Button from '../SelectValue/Button'
import Help from '../../images/help.png'
function HelpContent() {
    const bool = true
    const important = ['Important', "less Important"]
  return (
    <div className=' mt-10 grid md:grid-cols-5 gap-5'>
        <div className=' col-span-2'>
            <h1 className=' text-xl mb-4 p-2 text-start text-gray-400'>Experiencing problems using BPMS?
                Send a message</h1>

                <form>
                    <div className=' mb-3'>
                        <label className=' mb-2 block'>Priority</label>
                        <SelectButton 
                            bool={bool}
                            items={important}
                            
                        />

                    </div>
                    <div className=' mb-3'>
                        <TextBox 
                            bool={bool}
                            type='text'
                            label='Subject'
                        />
                    </div>
                    <div className=' mb-3'>
                        <Textarea 
                            label='Your message'
                            place='Start typing'
                        />
                    </div>
                    <Button 
                        name='Send message'
                    />
                </form>
        </div>
        <div className=' col-span-3 flex flex-col justify-center'>
            <div className=' flex justify-center'>
            <img src={Help} alt='Help' />
            </div>
            
        </div>
    </div>
  )
}

export default HelpContent