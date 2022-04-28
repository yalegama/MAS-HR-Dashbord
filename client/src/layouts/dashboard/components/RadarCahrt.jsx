import React from 'react'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';

function RadarCahrt() {
   const series= [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20,40,10,20,50,11],
      }];
      const options= {
        chart: {
          height: 350,
          type: 'radar',
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June','August','September','October','November','December']
        }
      }
  return (
    <div>
        
        <Card id="delete-account">
      <VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="radar" height={550} />
        </VuiBox>
      </VuiBox>
    </Card>
    </div>
  )
}

export default RadarCahrt