import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function ShiftDayVop() {
    const [data, setdata] = useState([]);
    const [shiftDetails, setshiftDetails] = useState([]);
    const [shiftCount, setshiftCount] = useState([]);
  
  
    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/currentdayshiftvop");
        setdata(response.data);
        for(const obj of response.data){
            shiftDetails.push(obj.shift);
            shiftCount.push(obj.vop);
        }
    }
  
    useEffect(() => {
     locadData();
    }, [])
    
  
  
  
  
  
  
      const series= shiftCount;
     const  options= {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: shiftDetails,
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
          text: "Current Month Shift VOP"
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

export default ShiftDayVop