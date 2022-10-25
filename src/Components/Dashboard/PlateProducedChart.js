import React, {useState} from 'react'
import SelectButton from '../SelectValue/SelectButton';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
function PlateProducedChart() {
    const [yearr, setyearr] = useState('');

        const year = [2022, 2023, 2024]
    const handleChange = (event) => {
        setyearr(event.target.value);
    };
    const data = [
        {
          name: 'Jan',
          uv: 4000,
          
        },
        {
          name: 'Feb',
          uv: 3000,
          
        },
        {
          name: 'Mar',
          uv: 200,
         
        },
        {
          name: 'Apr',
          uv: 2780,
          
        },
        {
          name: 'May',
          uv: 1890,
         
        },
        {
          name: 'Jun',
          uv: 0,
          
        },
        {
          name: 'Jul',
          uv: 1490,
          
        },
        {
            name: 'Aug',
            uv: 2490,
            
          },
          {
            name: 'Sep',
            uv: 420,
            
          },
          {
            name: 'Oct',
            uv: 490,
           
          },
          {
            name: 'Nov',
            uv: 340,
           
          },
          {
            name: 'Dec',
            uv: 0,
            
          },
      ];
  return (
    <div className=' mt-4 bg-chart-co p-4 border rounded-md border-gray-200'>
        <div className='flex justify-between'>
        <div className=' flex flex-col justify-center'>
            <h1>Plates produced by month </h1>
            </div>
          <SelectButton 
            value={yearr}
            onChange={handleChange}
            items={year}
          />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            
          />
            <YAxis 
                axisLine={false}
                tickLine={false}
            />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#9747FF" fill="#BF8FFD" />
          </LineChart>
        </ResponsiveContainer>

    </div>
  )
}

export default PlateProducedChart