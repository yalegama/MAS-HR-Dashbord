import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import "./GlVop.css"


function GlVop() {
    const [data, setdata] = useState([]);
    const [glDetails, setglDetails] = useState([]);
    const [glCount, setglCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/glareavopone");
        setdata(response.data);
        for(const obj of response.data){
            glDetails.push(obj.gl);
            glCount.push(obj.vop);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    

    const series= [{
        name: 'VOP Total',
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
            text: 'GL VOP Total',
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
    <div className='glcard'>
        <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          GL  Wise Total VOP 
        </VuiTypography>
      </VuiBox>
    </Card>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  )
}

export default GlVop