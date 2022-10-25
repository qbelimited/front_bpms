import React, {useState} from 'react'
import SelectButton from '../SelectValue/SelectButton';
import {
    ResponsiveContainer,
    BarChart,
     Bar,
    XAxis,
    YAxis,
    
    Tooltip,
    CartesianGrid,
  } from "recharts";
function PlateSizeChart() {
    const [monthh, setMonthh] = useState('');

        const month = ["Oct"," Nov", 'Dec']
    const handleChange = (event) => {
        setMonthh(event.target.value);
    };
    const data = [{name: 'small', users: 200},{name: 'Big', users: 320},{name: 'Large', users: 720}];
  return (
    <div  className=' mt-4 bg-chart-co p-4 border rounded-md border-gray-200'>
        <div className='flex justify-between'>
        <div className=' flex flex-col justify-center'>
            <h1>Plates produced by month </h1>
            </div>
          <SelectButton
            value={monthh}
            onChange={handleChange}
            items={month}
          />
        </div>
        <ResponsiveContainer width="100%" height={200}>
        <BarChart width={600} height={200} data={data}>
            <XAxis dataKey="name" 
            axisLine={false}
            tickLine={false}
            
            stroke="#9747FF" />
            <YAxis 
                
                 
            />
            <Tooltip />
            <CartesianGrid opacity={0.1}    />
            <Bar dataKey="users" fill="#9747FF" barSize={30} />
        </BarChart>
        </ResponsiveContainer>

    </div>
  )
}

export default PlateSizeChart