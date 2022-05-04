import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function VslDayVop() {
    const [data, setdata] = useState([]);
    const [vslDetails, setvslDetails] = useState([]);
    const [vslCount, setvslCount] = useState([]);
  
    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/currentdayvslvop");
        setdata(response.data);
        for(const obj of response.data){
            vslDetails.push(obj.vsl);
            vslCount.push(obj.vop);
        }
    }
  
    useEffect(() => {
     locadData();
    }, [])
    
  
  
  
  
  
      const series= vslCount;
     const  options= {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: vslDetails,
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
          text: "Current Day VSL VOP"
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

export default VslDayVop