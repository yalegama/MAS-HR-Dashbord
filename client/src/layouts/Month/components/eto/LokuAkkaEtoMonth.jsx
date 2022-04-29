import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import ReactApexChart from 'react-apexcharts';
import VuiTypography from 'components/VuiTypography';

function LokuAkkaEtoMonth() {

    const [data, setdata] = useState([]);
    const [lokuakkaDetails, setlokuakkaDetails] = useState([]);
    const [lokuakkaCount, setlokuakkaCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/currentmonthlokuakkaeto");
        setdata(response.data);
        for(const obj of response.data){
            lokuakkaDetails.push(obj.lokuakka);
            lokuakkaCount.push(obj.eto);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    
    const series= [{
        name: 'ETO Total',
        data: lokuakkaCount
      }]
     const options= {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: lokuakkaDetails,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        
        },
        title: {
          text: 'Current Month ETO Of Loku Akka',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }

  return (
    <div>
                <Card id="delete-account">
      <VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold">
          Current Month ETO Loku Akka
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

export default LokuAkkaEtoMonth