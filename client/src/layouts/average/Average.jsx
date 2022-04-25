import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import "../average/Average.css"
import axios from 'axios';
import Heat from './component/Heat';

function Average() {
    const [data, setdata] = useState([]);
    const [etoDetails, setetoDetails] = useState([]);
    const [etoCount, setetoCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/monthwiseeto");
        setdata(response.data);
        for(const obj of response.data){
            etoDetails.push(obj.month);
            etoCount.push(obj.eto);
        }
    }

    useEffect(() => {
     locadData();
     console.log(etoDetails,etoCount)
    }, [])
    

    const series= [{
        name: 'Sales',
        data: etoCount
      }];
      const options= {
        chart: {
          height: 350,
          type: 'line',
        },
        forecastDataPoints: {
          count: 7
        },
        stroke: {
          width: 5,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: etoCount,
          tickAmount: 10,
          labels: {
            formatter: function(value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
          }
        },
        title: {
          text: 'Forecast',
          align: 'left',
          style: {
            fontSize: "16px",
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        yaxis: {
          min: -10,
          max: 40
        }
      }
    


  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='one'>
          
          

          <Card className='card' id="delete-account">
      
      <VuiBox className="box">
      <ReactApexChart options={options} series={series} type="line" height={350} />
      </VuiBox>
    </Card>
          
          </div>
          <div>
          <Heat/>
          </div>
      </DashboardLayout>
  )
}

export default Average