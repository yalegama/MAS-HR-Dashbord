import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';

function Vsl() {

    const [data, setdata] = useState([]);
    const [vslDetails, setvslDetails] = useState([]);
    const [vslCount, setvslCount] = useState([]);


    const locadData=async ()=>{
        const response=await axios.get("http://localhost:3001/allreasonsinvsl");
        setdata(response.data);
        for(const obj of response.data){
            vslDetails.push(obj.vsl);
            vslCount.push(obj.vsltotal);
        }
    }

    useEffect(() => {
     locadData();
    }, [])
    

    const series= vslCount;
    const options= {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: vslDetails,
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

  return (
      <div>
          

          <Card id="delete-account">
      <VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <ReactApexChart options={options} series={series} type="pie" width={580} />
        </VuiBox>
      </VuiBox>
    </Card>
      </div>

  )
}

export default Vsl