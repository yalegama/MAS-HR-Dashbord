import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import "./Report.css"
import Grid from "@mui/material/Grid";
import VuiBox from 'components/VuiBox';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import { IoDocumentText, IoGlobe, IoWallet } from 'react-icons/io5';
import VuiTypography from 'components/VuiTypography';
import Card from "@mui/material/Card";
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

function Report() {
  //Select Month
  const [selectMonth, setselectMonth] = useState('1')
  const monthChange=(e)=>{
    setselectMonth(e.target.value);
  }

  //Select Month
  const [selectDay, setselectDay] = useState('1');
  const dayChange=(e)=>{
    setselectDay(e.target.value);
  }
const [data, setdata] = useState([]);
const [eto, seteto] = useState([]);
const [area, setarea] = useState([]);

  const loadData=async()=>{

    
    const response=await axios.get(`http://localhost:3001/etodetailsmonthmonthandday/${selectMonth}/${selectDay}`);
    setdata(response);
    for(const obj of response.data){
      eto.push(obj.etopercentage)
      area.push(obj.teamarea);
      
    }
    
  }

    useEffect(() => {
    loadData();
    console.log(eto,area)
  }, [selectMonth,selectDay])
  

  const series= [{
    data: eto
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
      <div className='formControll'>
        <div className='form'>
        <FormControl className='formControl'>
          <Select 
          value={selectMonth}
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
        <FormControl className='formControl'>
          <Select 
          value={selectDay}
          onChange={dayChange}
          className='select'>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
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
      <div className='boxes'>
      <VuiBox mb={3}>
           <Grid container spacing={3}>
             <Grid item xs={12} md={6} xl={3}>
               <MiniStatisticsCard
                 title={{ text: "", fontWeight: "regular" }}
                 count="Direct ETO"
                 percentage={{ color: "success", text: "55%" }}
                 icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
               />
             </Grid>
             <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                 title={{ text: "" }}
                 count="Indirect ETO"
                 percentage={{ color: "success", text: "+3%" }}
                 icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
               />
             </Grid>
             <Grid item xs={12} md={6} xl={3}>
               <MiniStatisticsCard
                 title={{ text: "" }}
                 count="Total ETO"
                 percentage={{ color: "error", text: "-2%" }}
                 icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
               />
             </Grid>
           </Grid>
         </VuiBox>
      </div>
      <div className='chartandtable '>
        <div className='chart'>
              <div className='chart'>
       <Card id="delete-account">
       <VuiBox>
         <VuiTypography variant="lg" color="white" fontWeight="bold">
           ETO Report
         </VuiTypography>
       </VuiBox>
       <VuiBox>
       <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
         <ReactApexChart options={options} series={series} type="bar" height={6000} />
         </VuiBox>
       </VuiBox>
     </Card>
       </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Report
















































// import React, { useEffect, useState } from 'react'
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
// import Card from "@mui/material/Card";
// import VuiTypography from 'components/VuiTypography'
// import VuiBox from 'components/VuiBox';
// import { FormControl, MenuItem, Select } from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
// import "../report/Report.css"
// import axios from 'axios';
// import ReactApexChart from 'react-apexcharts';
// import Grid from "@mui/material/Grid";
// import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
// import { IoDocumentText, IoGlobe, IoWallet } from 'react-icons/io5';

// function Report() {



//   //select month
//   const [month, setmonth] = useState('1');
//   const monthChange=(e)=>{
//     const currentMonth=e.target.value;
//     setmonth(currentMonth);
//   }

//   //select date
//   const [date, setdate] = useState('1');
//   const dateChange=(e)=>{
//     setdate(e.target.value);
//   }

//   const [data, setdata] = useState([]);
//   const [first, setfirst] = useState([]);
//   const [area, setarea] = useState([]);
//   const loadData=async()=>{

    
//     const response=await axios.get(`http://localhost:3001/etodetailsmonthmonthandday/${month}/${date}`);
//     setdata(response);
//     for(const obj of response.data){
//       first.push(obj.etopercentage)
//       area.push(obj.teamarea);
      
//     }
//     setfirst(first)
//     setarea(area);
//   }

//   const [percentage, setpercentage] = useState([])

//   const loadPercentageData=async()=>{
//     const dataValue=await axios.get(`http://localhost:3001/etodetailspercentage/${month}/${date}`)
//     setpercentage(dataValue)
//   }

//   useEffect(() => {
//     loadData();
//     loadPercentageData();
//     console.log(percentage.Object.etopercentage)
//   }, [month,date])
  

  
  

//   const series= [{
//     data: first
//   }];
//   const options= {
//     chart: {
//       type: 'bar',
//       height: 380
//     },
//     plotOptions: {
//       bar: {
//         barHeight: '100%',
//         distributed: true,
//         horizontal: true,
//         dataLabels: {
//           position: 'center'
//         },
//       }
//     },
//     colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
//       '#f48024', '#69d2e7'
//     ],
//     dataLabels: {
//       enabled: true,
//       textAnchor: 'start',
//       style: {
//         colors: ['#fff']
//       },
//       formatter: function (val, opt) {
//         return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
//       },
//       offsetX: 0,
//       dropShadow: {
//         enabled: true
//       }
//     },
//     stroke: {
//       width: 1,
//       colors: ['#fff']
//     },
//     xaxis: {
//       categories: area
//     },
//     yaxis: {
//       labels: {
//         show: false
//       }
//     },
//     title: {
//         text: '',
//         align: 'center',
//         floating: true
//     },
//     subtitle: {
//         text: '',
//         align: 'center',
//     },
//     tooltip: {
//       theme: 'dark',
//       x: {
//         show: false
//       },
//       y: {
//         title: {
//           formatter: function () {
//             return ''
//           }
//         }
//       }
//     }
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar/>
//       <div className='all'>
//       <div className='formSelect'>
// <div className='form'>
// <FormControl>
//             <Select 
//             value={month}
//             onChange={monthChange}
//             className='select'>
//             <MenuItem value={1}>January</MenuItem>
//             <MenuItem value={2}>February</MenuItem>
//             <MenuItem value={3}>March</MenuItem>
//             <MenuItem value={4}>April</MenuItem>
//             <MenuItem value={5}>May</MenuItem>
//             <MenuItem value={6}>June</MenuItem>
//             <MenuItem value={7}>July</MenuItem>
//             <MenuItem value={8}>August</MenuItem>
//             <MenuItem value={9}>September</MenuItem>
//             <MenuItem value={10}>October</MenuItem>
//             <MenuItem value={11}>November</MenuItem>
//             <MenuItem value={12}>December</MenuItem>
//             </Select>
//         </FormControl>
// </div>
// <div className='form'>
// <FormControl>
//             <Select 
//             value={date}
//             onChange={dateChange}
//             className='select'>
//             <MenuItem value="1">1</MenuItem>
//             <MenuItem value="2">2</MenuItem>
//             <MenuItem value={3}>3</MenuItem>
//             <MenuItem value={4}>4</MenuItem>
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={6}>6</MenuItem>
//             <MenuItem value={7}>7</MenuItem>
//             <MenuItem value={8}>8</MenuItem>
//             <MenuItem value={9}>9</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={11}>11</MenuItem>
//             <MenuItem value={12}>12</MenuItem>
//             <MenuItem value={13}>13</MenuItem>
//             <MenuItem value={14}>14</MenuItem>
//             <MenuItem value={15}>15</MenuItem>
//             <MenuItem value={16}>16</MenuItem>
//             <MenuItem value={17}>17</MenuItem>
//             <MenuItem value={18}>18</MenuItem>
//             <MenuItem value={19}>19</MenuItem>
//             <MenuItem value={20}>20</MenuItem>
//             <MenuItem value={21}>21</MenuItem>
//             <MenuItem value={22}>22</MenuItem>
//             <MenuItem value={23}>23</MenuItem>
//             <MenuItem value={24}>24</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={26}>26</MenuItem>
//             <MenuItem value={27}>27</MenuItem>
//             <MenuItem value={28}>28</MenuItem>
//             <MenuItem value={29}>29</MenuItem>
//             <MenuItem value={30}>30</MenuItem>
            

//             </Select>
//         </FormControl>
// </div>
//     </div>
//       <div>
//       <VuiBox mb={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} xl={3}>
//               <MiniStatisticsCard
//                 title={{ text: "", fontWeight: "regular" }}
//                 count="Direct ETO"
//                 percentage={{ color: "success", text: "55%" }}
//                 icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6} xl={3}>
//               <MiniStatisticsCard
//                 title={{ text: "" }}
//                 count="Indirect ETO"
//                 percentage={{ color: "success", text: "+3%" }}
//                 icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6} xl={3}>
//               <MiniStatisticsCard
//                 title={{ text: "" }}
//                 count="Total ETO"
//                 percentage={{ color: "error", text: "-2%" }}
//                 icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6} xl={3}>
              
//             </Grid>
//           </Grid>
//         </VuiBox>
//       </div>
//       <div className='chart'>
//       <Card id="delete-account">
//       <VuiBox>
//         <VuiTypography variant="lg" color="white" fontWeight="bold">
//           ETO Report
//         </VuiTypography>
//       </VuiBox>
//       <VuiBox>
//         <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
//         <ReactApexChart options={options} series={series} type="bar" height={16000} />
//         </VuiBox>
//       </VuiBox>
//     </Card>
//       </div>
//       {/* <div className='table'>
//       <Card id="delete-account">
//       <VuiBox>
//         <VuiTypography variant="lg" color="white" fontWeight="bold">
//           ETO Table
//         </VuiTypography>
//       </VuiBox>
//       <VuiBox className="mainbox">
//         <VuiBox 
//         className="box"
//         component="ul" display="flex" flexDirection="column" p={0} m={0}>
//         <div 
//         className='chart'
//         style={{ height: 800, width: '60%',color:'white',backgroundColor:'white' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         checkboxSelection
//         disableSelectionOnClick
//       />
      
//     </div>
//         </VuiBox>
//         <VuiBox 
//         className="box"
//         component="ul" display="flex" flexDirection="column" p={0} m={0}>
//         <div 
//         className='chart'
//         style={{ height: 800, width: '60%',color:'white',backgroundColor:'white' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         checkboxSelection
//         disableSelectionOnClick
//       />
      
//     </div>
//         </VuiBox>
//       </VuiBox>
//     </Card>
//       </div> */}
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Report