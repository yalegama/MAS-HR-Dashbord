import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import ReactApexChart from 'react-apexcharts';

function MayReport() {
    const [data, setdata] = useState([]);
    const [Details, setDetails] = useState([]);
    const [Count, setCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/mayreport");
        setdata(response.data);
        for(const obj of response.data){
            Details.push(obj.teamarea);
            Count.push(obj.eto);
        }
    }

    useEffect(() => {
     locadData();
    }, [])

    const series= [{
        data: Count,
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
              position: 'bottom'
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
          categories: Details,
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
            text: 'Custom DataLabels',
            align: 'center',
            floating: true
        },
        subtitle: {
            text: 'Category Names as DataLabels inside bars',
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
    <div>
                                                <Card id="delete-account">
      <VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold">
         May Report 
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="bar" height={480} />
        </VuiBox>
      </VuiBox>
    </Card>
    </div>
  )
}

export default MayReport