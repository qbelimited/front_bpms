import React from 'react'
import Button from '../../Components/SelectValue/Button'
import NotPage from '../../images/404.png'
import Emoji from '../../images/sad.png'
function PageNotFound() {
  return (
    <div className=' bg-error-code w-full h-screen relative'>
        <img src={NotPage} alt='404' className=' absolute m-auto left-0 top-1/3 right-0 -z-0 ' />
        <div className='grid h-full  p-5  text-start  place-items-center'>
           <div>
                <img src={Emoji} alt='Emoji' className=' mx-auto'/>
                <h1 className=' text-center font-bold'>Page not found</h1>
                <p className=' text-center mt-4 mb-4'>We are very sorry for the inconvenience. it looks like <br></br>
                    you’re trying to access a page that doesn’t exist. </p>
                    <div className=' flex justify-center'>
                    <Button 
                        name='Back to homepage'
                    />
                    </div>
                    
           </div> 
           
        </div>
        <div className=' absolute bottom-2 inset-x-0'>
            <p className=' text-center'>©️ 2022 - BPMS Powered by <span className=' text-purple-600'> Ten-io</span></p>
        </div>
    </div>
  )
}

export default PageNotFound