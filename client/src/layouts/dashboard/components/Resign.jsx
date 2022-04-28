import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import axios from 'axios';

function Resign() {
    const [data, setdata] = useState([]);
    const [resignDetails, setresignDetails] = useState([]);
    const [resignCount, setresignCount] = useState([]);



    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/monthlyresigntotal");
        setdata(response.data);
        for(const obj of response.data){
            resignDetails.push(obj.month);
            resignCount.push(obj.resign);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    const series= [{
        name: 'Servings',
        data: resignCount
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
          categories: resignDetails,
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
        
        <Card id="delete-account">
      <VuiBox>
          <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
              Monthly Resign Summary
          </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
        </VuiBox>
      </VuiBox>
    </Card>
    </div>
  )
}

export default Resign