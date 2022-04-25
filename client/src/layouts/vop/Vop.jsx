import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import MonthVop from './component/MonthVop';
import AreaVop from './component/AreaVop';

function Vop() {
    const [data, setdata] = useState([]);
const [area, setare] = useState([]);
const [vop, setvop] = useState([]);

  const loadData=async()=>{



    
    
    const response=await axios.get("http://localhost:3001/teamareaallvop");
    setdata(response);
    for(const obj of response.data){
        area.push(obj.teamarea)
        vop.push(obj.vop);
      
    }
    
  }

    useEffect(() => {
    loadData();
    console.log(area,vop)
  }, [])
  

  const series= [{
    data: vop
  }];
  const options= {
    chart: {
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'center'
        },
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      '#f48024', '#69d2e7'
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: area
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: '',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: '',
        align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    }
  }



  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div>
              <MonthVop/>
          </div>
          <div className='areavop'>
            <AreaVop/>
          </div>
          <div className='shiftvop'>
            
          </div>
          <div>
          <ReactApexChart options={options} series={series} type="bar" height={2800} />
          </div>
      </DashboardLayout>
  )
}

export default Vop