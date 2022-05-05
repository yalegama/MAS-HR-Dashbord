import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import ReactApexChart from 'react-apexcharts';
import "../Reasons/Reasons.css"
import axios from 'axios';
import Footer from 'examples/Footer';
import JanuaryReasons from './components/JanuaryReasons';
import FebruaryReasons from './components/FebruaryReasons';
import MarchReasons from './components/MarchReasons';
import AprilReasons from './components/AprilReasons';
import MayReasons from './components/MayReasons';

function Reasons() {

  const [data, setdata] = useState([]);
  const [reasons, setreasons] = useState([]);
  const [total, settotal] = useState([]);

  const loadData=async()=>{
    const response=await axios.get("http://localhost:3001/allreasons");
    setdata(response.data);
    for(const obj of response.data){
      reasons.push(obj.reason)
      total.push(obj.total);
    }
  }

  useEffect(() => {
    loadData();
    console.log(reasons,total)
  }, [])
  

          
  const series= total;
  const options= {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: reasons,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
          
          
        


  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='rowOne'>
          <ReactApexChart options={options} series={series} type="pie" width={980} />
          </div>
          <div className='barChart'>
            <JanuaryReasons/>
            <FebruaryReasons/>
            <MarchReasons/>
            <AprilReasons/>
          </div>
          <div className='barChart'>
            <MayReasons/>
          </div>
          <Footer/>
      </DashboardLayout>
  )
}

export default Reasons