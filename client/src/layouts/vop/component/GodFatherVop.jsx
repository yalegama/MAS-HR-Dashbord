import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import ReactApexChart from 'react-apexcharts';

function GodFatherVop() {
    const [data, setdata] = useState([]);
    const [godfatherDetails, setgodfatherDetails] = useState([]);
    const [godfatherCount, setgodfatherCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/godfatherareavopone");
        setdata(response.data);
        for(const obj of response.data){
            godfatherDetails.push(obj.godfather);
            godfatherCount.push(obj.vop);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    

    const series= [{
        name: 'VOP Total',
        data: godfatherCount
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
          categories: godfatherDetails,
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
    <div className='godfathercard'>
    <Card id="delete-account">
  <VuiBox>
    <VuiTypography variant="lg" color="white" fontWeight="bold">
      GodFather  Wise Total VOP 
    </VuiTypography>
  </VuiBox>
</Card>
    <ReactApexChart options={options} series={series} type="bar" height={350} />
</div>
  )
}

export default GodFatherVop