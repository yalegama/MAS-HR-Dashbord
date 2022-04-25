import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import axios from 'axios';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import ReactApexChart from 'react-apexcharts';
import GlVop from './vop/component/GlVop';
import GodFatherVop from './vop/component/GodFatherVop';
import LokuakkaVop from './vop/component/LokuakkaVop';

function Indetail() {
  const [data, setdata] = useState([]);
  const [erDetails, seterDetails] = useState([]);
  const [erCount, seterCount] = useState([]);


  const locadData=async ()=>{
      const response=await axios.get("http://localhost:3001/erareavopone");
      setdata(response.data);
      for(const obj of response.data){
        erDetails.push(obj.er);
        erCount.push(obj.vop);
      }
  }



 
  useEffect(() => {
    locadData();
  }, [])
  

  const series= [{
      name: 'VOP Total',
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
          text: 'VOP Total',
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
      <DashboardLayout>
          <DashboardNavbar/>
          
          <div>
          <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          ER Wise Total VOP
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
        </VuiBox>
      </VuiBox>
    </Card>
          </div>
          <div>
            <GlVop/>
          </div>
          <div>
            <GodFatherVop/>
          </div>
          <div>
            <LokuakkaVop/>
          </div>

      </DashboardLayout>
  )
}

export default Indetail