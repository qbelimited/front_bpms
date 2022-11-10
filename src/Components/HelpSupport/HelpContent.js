import React, {useState} from 'react'
import Textarea from '../SelectValue/Textarea'
import TextBox from '../SelectValue/TextBox'
import Button from '../SelectValue/Button'
import swal from 'sweetalert';

import Help from '../../images/help.png'
import PrioritySelect from './PrioritySelect'
import postService from '../../Services/post-services'
function HelpContent() {
    const bool = true
   const [subject, setSubject] = useState('')
   const [message, setMessage] = useState('')
   const [priority, setPriority] = useState('')
    const [loading, setLoading] = useState(false)
   const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
     postService.sendHelp(priority, subject, message, ).then(
        (response) => {
            console.log(response.data)
            swal("Message Sent Successfully")
              .then((value) => {
                window.location.reload()
              });
            setLoading(false)
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
              return  swal('Message failed')
              .then((value) => {
                window.location.reload()
              });
             
          }
     )
   }

  return (
    <div className=' mt-10 grid md:grid-cols-5 gap-5'>
        <div className=' col-span-2'>
            <h1 className=' text-xl mb-4 p-2 text-start text-gray-400'>Experiencing problems using BPMS?
                Send a message</h1>

                <form onSubmit={handleSubmit}>
                    <div className=' mb-3'>
                        <label className=' mb-2 block'>Priority</label>
                        <PrioritySelect
                            bool={bool}
                            value={priority}
                            onChange={setPriority}
                        />

                    </div>
                    <div className=' mb-3'>
                        <TextBox 
                            bool={bool}
                            type='text'
                            label='Subject'
                            value={subject}
                            onChange={setSubject}
                        />
                    </div>
                    <div className=' mb-3'>
                        <Textarea 
                            label='Your message'
                            place='Start typing'
                            value={message}
                            onChange={setMessage}
                        />
                    </div>
                    <Button 
                        name={loading ? 'Sending' : 'Send message'}
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