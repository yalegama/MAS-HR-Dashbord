import React, { useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import "../analysis/Analysis.css"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function Analysis() {
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='formSelect'>
<div className='form'>
<FormControl>
            <Select 
            className='select'>
            <MenuItem value={1}>2022</MenuItem>
            <MenuItem value={2}>2023</MenuItem>
            <MenuItem value={3}>2024</MenuItem>
            <MenuItem value={4}>2025</MenuItem>
            </Select>
        </FormControl>
</div>
<div className='form'>
<FormControl>
            <Select 
            className='select'>
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
      </DashboardLayout>
  )
}

export default Analysis