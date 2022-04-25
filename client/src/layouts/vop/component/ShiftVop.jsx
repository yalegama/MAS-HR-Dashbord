import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';



function ShiftVop() {
  const [data, setdata] = useState([]);
  const [shiftvopDetails, setshiftvopDetails] = useState([]);
  const [shiftvopCount, setshiftvopCount] = useState([]);


  const locadData=async ()=>{
      const response=await axios.get("http://localhost:3001/shiftareavopone");
      setdata(response.data);
      for(const obj of response.data){
        shiftvopDetails.push(obj.shift);
        shiftvopCount.push(obj.vop);
      }
  }

  useEffect(() => {
   locadData();
  }, [])
  

  const series= shiftvopCount;
  const options= {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: shiftvopDetails,
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

export default ShiftVop