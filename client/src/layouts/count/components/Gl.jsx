import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

function Gl() {


    const [data, setdata] = useState([]);
    const [glDetails, setglDetails] = useState([]);
    const [glCount, setglCount] = useState([]);



    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allreasonsingl");
        setdata(response.data);
        for(const obj of response.data){
            glDetails.push(obj.gl);
            glCount.push(obj.gltotal);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    


    const series= [{
        name: 'ETO Total',
        data: glCount
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
          categories: glDetails,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'ETO Total',
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

export default Gl