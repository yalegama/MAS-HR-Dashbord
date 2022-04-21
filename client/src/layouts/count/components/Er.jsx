import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function Er() {

    const [data, setdata] = useState([]);
    const [erDetails, seterDetails] = useState([]);
    const [erCount, seterCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allreasonsiner");
        setdata(response.data);
        for(const obj of response.data){
            erDetails.push(obj.er);
            erCount.push(obj.ertotal);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    

    const series= [{
        name: 'Servings',
        data: erCount
      }];
      const options= {
        annotations: {
          points: [{
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Bananas are good',
            }
          }]
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
          categories: erDetails,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Servings',
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

export default Er