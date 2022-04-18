import React, { useEffect, useState } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import Footer from 'examples/Footer';
function Details() {
    
    const columns = [
        { field: 'date', 
        headerName: 'Date', 
        width: 120 },
        {
          field: 'teamarea',
          headerName: 'Team Area',
          width: 150,
        },
        {
          field: 'internalcarder',
          headerName: 'Internal Carder',
          width: 180,
        },
        {
          field: 'actualcarder',
          headerName: 'Actual Carder',
          width: 180,
        },
        {
            field: 'vop',
            headerName: 'VOP',
            width: 110,
          },
          {
            field: 'resign',
            headerName: 'Resign',
            width: 120,
          },
          {
            field: 'total',
            headerName: 'Total',
            width: 110,
          },
          {
            field: 'voppercentage',
            headerName: 'VOP %',
            width: 120,
          },
          {
            field: 'etopercentage',
            headerName: 'ETO %',
            width: 120,
          },
          {
            field: 'area',
            headerName: 'Area',
            width: 110,
          },
          {
            field: 'shift',
            headerName: 'Shift',
            width: 110,
          },
          {
            field: 'vsl',
            headerName: 'VSL',
            width: 110,
          },
          {
            field: 'er',
            headerName: 'ER',
            width: 110,
          },
          {
            field: 'gl',
            headerName: 'GL',
            width: 110,
          },
          {
            field: 'godfather',
            headerName: 'God Father',
            width: 180,
          },
          {
            field: 'lokuakka',
            headerName: 'Loku Akka',
            width: 180,
          },
          {
            field: 'day',
            headerName: 'Day',
            width: 110,
          },
          {
            field: 'month',
            headerName: 'Month',
            width: 120,
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

      const [data, setdata] = useState([]);
      const loadData=async()=>{
          const response=await axios.get("http://localhost:3001/etodetails");
          setdata(response.data);
      }
      useEffect(() => {
        loadData();
        console.log(data)
      }, [])
      
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div style={{ height: 750, width: '100%' , backgroundColor:'#fff'}}>
           <DataGrid
            rows={data}
            columns={columns}
            pageSize={12}
            checkboxSelection
            disableSelectionOnClick
           />
    </div>
    <Footer/>
      </DashboardLayout>
  )
}

export default Details