import React from 'react'
import PieChart from '../../Components/Dashboard/PlateColorChart'

import PlateProducedChart from '../../Components/Dashboard/PlateProducedChart'
import PlateSizeChart from '../../Components/Dashboard/PlateSizeChart'

import UserActivity from '../../Components/Dashboard/UserActivity'

function DashboardMain() {
  return (
    <div className=' w-fit md:w-full '>
        <div>
            <h1 className=' font-bold text-start '>Dashboard</h1>
            <p className=' text-gray-400 text-start'>Please edit to fit proper description of the page</p>
        </div>
        <PlateProducedChart />
        <div className=' mt-5 md:grid md:grid-cols-2 md:gap-4'>
        <PieChart />
        <PlateSizeChart />
            
        </div>
        <div className='  overflow-x-auto'>
        <UserActivity />
        </div>
      
    </div>
  )
}

export default DashboardMain