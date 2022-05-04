import React, { useEffect, useState } from 'react'
import HeatMap from '@uiw/react-heat-map';
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import "../component/Heat.css"
import axios from 'axios';

function Heat() {

  const [data, setdata] = useState([]);
  const [heatDetails, setheatDetails] = useState([]);
  const [heatCount, setheatCount] = useState([]);


  const locadData=async ()=>{
      const response=await axios.get("http://localhost:3001/allheat");
      setdata(response.data);
  }

  useEffect(() => {
   locadData();
   console.log(data)
  }, [])
  

    const value = data;
      
  return (
    <div>
         
         <Card className='card' id="delete-account">
      <VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <HeatMap value={value} startDate={new Date('2022/01/01')} />
        </VuiBox>
      </VuiBox>
    </Card>
    </div>
  )
}

export default Heat