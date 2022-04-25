import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import HeatMap from '@uiw/react-heat-map';
import "../heat/Heat.css"
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
function Heat() {
    const value = [
        { date: '2016/01/11', count: 2 },
        { date: '2016/01/12', count: 20 },
        { date: '2016/01/13', count: 10 },
        ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
        { date: '2016/04/11', count: 2 },
        { date: '2016/05/01', count: 5 },
        { date: '2016/05/02', count: 5 },
        { date: '2016/05/04', count: 11 },
      ];
      
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          
          <Card id="delete-account">
      <VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <HeatMap className='heat' height={4000} value={value} startDate={new Date('2016/01/01')} />
        </VuiBox>
      </VuiBox>
    </Card>
      </DashboardLayout>
  )
}

export default Heat