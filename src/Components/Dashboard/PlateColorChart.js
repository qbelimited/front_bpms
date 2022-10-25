import { Doughnut } from "react-chartjs-2";
import React, {useState} from "react";
import Chart from "chart.js/auto";
import SelectButton from "../SelectValue/SelectButton";
export default function PieChart() {
    const [month, setMonth] = useState('');

        const mon = ['Oct', 'Nov', 'Dec']
    const handleChange = (event) => {
        setMonth(event.target.value);
    };
  const data = {
    labels: ["Yellow", "White", "Blue", "Red", "Green"],
    datasets: [
      {
        label: "Today plates",
        data: [35, 25, 22, 20, 18],
        backgroundColor: [
          "#FEF62D",
          "#BF8FFD",
          "#2D68FE",
          "#FF8181",
          "#81FF95",
          
        ],
        borderColor: [
          "rgba(254, 246, 45, 1)",
          "rgba(151, 71, 255, 0.6)",
          "rgba(45, 104, 254, 1)",
          "rgba(255, 129, 129, 1)",
          "rgba(129, 255, 149, 1)",
          
        ],
        borderWidth: 1,
        cutout: 50,
       
      },
    ],
    
  };
  const centerTextDoughnut = {
    id: 'centerTextDoughnut',
    afterDatasetsDraw(chart, args, pluginOptions){
        const {ctx} = chart;
        ctx.font ='bold 20px sans-serif';
        const text = 'Enter center abeg';
        ctx.textAlign = 'center';
        const textWidth = ctx.measureText(text).width

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        
        ctx.fillText(text, x, y);
        ctx.FillRect(x,y,10,10);
    }
}

  return (
    <div className=' mt-4 bg-chart-co p-4 border rounded-md border-gray-200'>
    <div className='flex justify-between'>
        <div className=' flex flex-col justify-center'>
            <h1>Plates produced by month </h1>
            </div>
          <SelectButton 
            value={month}
            onChange={handleChange}
            items={mon}
          />
        </div>
    <div className=" mx-auto w-1/2  flex-row ">
      
      <Doughnut data={data} width={10} height={10} 
         options={{
            centerTextDoughnut,
          plugins: {
            title: {
              display: true,
              text: "Today plates",
              align: 'center',
                verticalAlign: 'middle',
                y: -20,

            },
            
            responsive: true,
            cutoutPercentage: 10,
            legend: {
              display: true,
              position: "right",
              labels:{
                    usePointStyle: true,
              }
           }
          }
        }}
       
      />
      
    </div>
    </div>
  );
}