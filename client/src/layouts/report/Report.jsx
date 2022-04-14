import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import HorizantalBarChart from 'examples/Charts/HorizantalBarChart/HorizantalBarChart'
import Card from "@mui/material/Card";
import VuiTypography from 'components/VuiTypography'
import VuiBox from 'components/VuiBox';
import { FormControl, MenuItem, Select } from '@material-ui/core';


function Report() {
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <div className='formSelect'>
<div className='form'>
<FormControl>
            <Select className='select'>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
            </Select>
        </FormControl>
</div>
<div className='form'>
<FormControl>
            <Select className='select'>
            <MenuItem value={10}>January</MenuItem>
            <MenuItem value={10}>February</MenuItem>
            <MenuItem value={10}>March</MenuItem>
            <MenuItem value={10}>April</MenuItem>
            <MenuItem value={10}>May</MenuItem>
            <MenuItem value={10}>June</MenuItem>
            <MenuItem value={10}>July</MenuItem>
            <MenuItem value={10}>August</MenuItem>
            <MenuItem value={10}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={10}>November</MenuItem>
            <MenuItem value={10}>December</MenuItem>
            </Select>
        </FormControl>
</div>
    </div>
      
      <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Billing Information
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <HorizantalBarChart/>
        </VuiBox>
      </VuiBox>
    </Card>
    </DashboardLayout>
  )
}

export default Report