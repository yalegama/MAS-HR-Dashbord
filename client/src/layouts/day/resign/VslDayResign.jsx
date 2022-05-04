import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function VslDayResign() {
    const [data, setdata] = useState([]);
    const [vslDetails, setvslDetails] = useState([]);
    const [vslCount, setvslCount] = useState([]);
  
    
    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/currentdayvslesign");
        setdata(response.data);
        for(const obj of response.data){
          vslDetails.push(obj.vsl);
          vslCount.push(obj.resign);
        }
    }
  

    useEffect(() => {
     locadData();
    }, [])
  
    const series= vslCount;
    const options= {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: vslDetails,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  return (
    <div>
        <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div>
  )
}

export default VslDayResign