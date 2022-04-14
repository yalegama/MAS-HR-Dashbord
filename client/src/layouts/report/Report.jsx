import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import HorizantalBarChart from 'examples/Charts/HorizantalBarChart/HorizantalBarChart'
import Card from "@mui/material/Card";
import VuiTypography from 'components/VuiTypography'
import VuiBox from 'components/VuiBox';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import "../report/Report.css"


function Report() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <div className='all'>
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
      
      <div className='chart'>
      <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          ETO Report
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <HorizantalBarChart/>
        </VuiBox>
      </VuiBox>
    </Card>
      </div>
      <div className='table'>
      <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          ETO Table
        </VuiTypography>
      </VuiBox>
      <VuiBox className="mainbox">
        <VuiBox 
        className="box"
        component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <div 
        className='chart'
        style={{ height: 800, width: '60%',color:'white',backgroundColor:'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
      
    </div>
        </VuiBox>
        <VuiBox 
        className="box"
        component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <div 
        className='chart'
        style={{ height: 800, width: '60%',color:'white',backgroundColor:'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
      
    </div>
        </VuiBox>
      </VuiBox>
    </Card>
      </div>
      </div>
    </DashboardLayout>
  )
}

export default Report