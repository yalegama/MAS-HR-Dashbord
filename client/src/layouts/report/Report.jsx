import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Card from "@mui/material/Card";
import VuiTypography from 'components/VuiTypography'
import VuiBox from 'components/VuiBox';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import "../report/Report.css"
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';


function Report() {



  //select month
  const [month, setmonth] = useState('1');
  const monthChange=(e)=>{
    const currentMonth=e.target.value;
    setmonth(currentMonth);
  }

  //select date
  const [date, setdate] = useState('1');
  const dateChange=(e)=>{
    setdate(e.target.value);
  }

  const [data, setdata] = useState([]);
  const [first, setfirst] = useState([]);
  const [area, setarea] = useState([])
  const loadData=async()=>{

    
    const response=await axios.get(`http://localhost:3001/etodetailsmonthmonthandday/${month}/${date}`);
    setdata(response);
    for(const obj of response.data){
      first.push(obj.etopercentage)
      area.push(obj.teamarea);
      
    }
    console.log(first)
    console.log(area);
    setfirst(first)
    setarea(area);
  }
  useEffect(() => {
    loadData();
    console.log(data)
  }, [month,date])
  

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
  

  const series= [{
    data: first
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
          position: 'center'
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
      categories: area
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: '',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: '',
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
    <DashboardLayout>
      <DashboardNavbar/>
      <div className='all'>
      <div className='formSelect'>
<div className='form'>
<FormControl>
            <Select 
            value={month}
            onChange={monthChange}
            className='select'>
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
            </Select>
        </FormControl>
</div>
<div className='form'>
<FormControl>
            <Select 
            value={date}
            onChange={dateChange}
            className='select'>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={26}>26</MenuItem>
            <MenuItem value={27}>27</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            <MenuItem value={29}>29</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            

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
        <ReactApexChart options={options} series={series} type="bar" height={16000} />
        </VuiBox>
      </VuiBox>
    </Card>
      </div>
      {/* <div className='table'>
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
      </div> */}
      </div>
    </DashboardLayout>
  )
}

export default Report