import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';

function Godfather() {

    const [data, setdata] = useState([]);
    const [godfatherDetails, setgodfatherDetails] = useState([]);
    const [godfatherCount, setgodfatherCount] = useState([]);



    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allreasonsingodfather");
        setdata(response.data);
        for(const obj of response.data){
            godfatherDetails.push(obj.godfather);
            godfatherCount.push(obj.godfathertotal);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    

    const series= [{
        name: 'ETO Total',
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

<Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          God Father Wise
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

export default Godfather