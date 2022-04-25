import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import ReactApexChart from 'react-apexcharts';
import VslVop from './VslVop';
import ShiftVop from './ShiftVop';


function AreaVop() {
    const [data, setdata] = useState([]);
    const [areavopDetails, setareavopDetails] = useState([]);
    const [areavopCount, setareavopCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/areavop");
        setdata(response.data);
        for(const obj of response.data){
            areavopDetails.push(obj.area);
            areavopCount.push(obj.vop);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    

    const series= areavopCount;
    const options= {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: areavopDetails,
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
    <div className='charts'>
        <div>
        <ReactApexChart options={options} series={series} type="pie" width={480} />
    </div><div>
       <VslVop/>
    </div>
    <div>
      <ShiftVop/>
    </div>
    </div>
  )
}

export default AreaVop