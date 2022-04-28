import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function AreaChart() {


    const [data, setdata] = useState([]);
    const [etoDetails, setetoDetails] = useState([]);
    const [etoCount, setetoCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/monthlyetopercentage");
        setdata(response.data);
        for(const obj of response.data){
            etoDetails.push(obj.month);
            etoCount.push(obj.eto);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    


    const series= [{
        name: 'ETO Percentage',
        data: etoCount
      }];
      const options= {
        annotations: {
          
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: etoDetails,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'ETO Percentage',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      }
  return (
    <div>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  )
}

export default AreaChart