import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "../analysis/Analysis.css"


function AnalysisSelect() {
  return (
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
  )
}

export default AnalysisSelect