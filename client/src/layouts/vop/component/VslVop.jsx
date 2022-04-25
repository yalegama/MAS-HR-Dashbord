import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function VslVop() {
    const [data, setdata] = useState([]);
    const [vslvopDetails, setvslvopDetails] = useState([]);
    const [vslvopCount, setvslvopCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/vslareavop");
        setdata(response.data);
        for(const obj of response.data){
            vslvopDetails.push(obj.vsl);
            vslvopCount.push(obj.vop);
        }
    }

    useEffect(() => {
     locadData();
    }, [])


    const series= vslvopCount;
    const options= {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: vslvopDetails,
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
        <ReactApexChart options={options} series={series} type="pie" width={480} />
    </div>
  )
}

export default VslVop