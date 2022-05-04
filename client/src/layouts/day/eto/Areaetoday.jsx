import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function Areaetoday() {
  const [data, setdata] = useState([]);
  const [areaDetails, setareaDetails] = useState([]);
  const [areaCount, setareaCount] = useState([]);


  const locadData=async ()=>{
      const response=await axios.get("http://localhost:3001/currentdayareaeto");
      setdata(response.data);
      for(const obj of response.data){
        areaDetails.push(obj.area);
        areaCount.push(obj.eto);
      }
  }

  useEffect(() => {
   locadData();
  }, [])
  






    const series= areaCount;
   const  options= {
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: areaDetails,
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      title: {
        text: "Current Day Area ETO %"
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(1) + '%']
        }
      },
      legend: {
        show: false
      }
    }
  return (
    <div>
      <ReactApexChart options={options} series={series} type="pie" width={380}/>
    </div>
  )
}

export default Areaetoday