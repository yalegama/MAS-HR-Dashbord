import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "../review/Review.css"
import Lokuakka from './component/Lokuakka';
import Footer from 'examples/Footer';


function Review() {

    const [data, setdata] = useState([]);
    const [areaDetails, setareaDetails] = useState([]);
    const [areaCount, setareaCount] = useState([]);

    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allareawise");
        setdata(response.data);
        for(const obj of response.data){
            areaDetails.push(obj.area);
            areaCount.push(obj.areatotal);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    

    const series= areaCount;
           const options= {
              chart: {
                width: '100%',
                type: 'pie',
              },
              labels: areaDetails,
              theme: {
                monochrome: {
                  enabled: true
                }
              },
              plotOptions: {
                pie: {
                  dataLabels: {
                    offset: -5
                  }
                }
              },
              title: {
                text: "Area Wise"
              },
              dataLabels: {
                formatter(val, opts) {
                  const name = opts.w.globals.labels[opts.seriesIndex]
                  return [name, val.toFixed(1) + '%']
                }
              },
              legend: {
                show: false
              }
            }
          

  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='one'>
          <div className='rowOne'>
          <ReactApexChart options={options} series={series} type="pie" width={480} />
          </div>
          <div className='rowOne'>
          <ReactApexChart options={options} series={series} type="pie" width={480} />
          </div>
          </div>
          <div>
              <Lokuakka/>
          </div>
          <Footer/>
      </DashboardLayout>
  )
}

export default Review