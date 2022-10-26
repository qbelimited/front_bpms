import React from 'react'
import AppContent from '../../Components/AppSetting/AppContent'
import Back from '../../Components/Back'

function AppSettings() {
  return (
    <div>
    <Back />
       <div className=' mb-4'>
            <h1 className=' font-bold text-start '>App settings</h1>
            <p className=' text-gray-400 text-start'>App settings page - Please edit to fit proper descriprion of the page</p>

        </div>
        <AppContent />
    </div>
  )
}

export default AppSettings