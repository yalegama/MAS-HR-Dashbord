import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import ReactApexChart from 'react-apexcharts';
import "../count/Count.css"
import axios from 'axios';
import Vsl from './components/Vsl';
import Er from './components/Er';
import Gl from './components/Gl';
import Godfather from './components/Godfather';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import Footer from 'examples/Footer';

function Count() {

    const [data, setdata] = useState([]);
    const [shiftDetails, setshiftDetails] = useState([]);
    const [shiftCount, setshiftCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allreasonsinshift");
        setdata(response.data);
        for(const obj of response.data){
            shiftDetails.push(obj.shift);
            shiftCount.push(obj.shifttotal);
        }
    }



   
    useEffect(() => {
      locadData();
    }, [])
    

    const series= shiftCount;
    const options= {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: shiftDetails,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

    const xaxis= [42, 47, 52, 58, 65];
            const yaxis= {
              chart: {
                width: 380,
                type: 'polarArea'
              },
              labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
              fill: {
                opacity: 1
              },
              stroke: {
                width: 1,
                colors: undefined
              },
              yaxis: {
                show: false
              },
              legend: {
                position: 'bottom'
              },
              plotOptions: {
                polarArea: {
                  rings: {
                    strokeWidth: 0
                  },
                  spokes: {
                    strokeWidth: 0
                  },
                }
              },
              theme: {
                monochrome: {
                  enabled: true,
                  shadeTo: 'light',
                  shadeIntensity: 0.6
                }
              }
            }

  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='column'>
          <div className='chart'>
          
          <Card id="delete-account">
      <VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="pie" width={440} />
        </VuiBox>
      </VuiBox>
    </Card>
          </div>
          <div className='chart'>
          <Vsl/>
          </div>
          </div>
          <div className='column2'>
              <Er/>
          </div>
          <div className='column3'>
              <Gl/>
          </div>
          <div className='column3'>
              <Godfather/>
          </div>
          <Footer/>
      </DashboardLayout>
  )
}

export default Count