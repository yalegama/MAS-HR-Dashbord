import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';

function Action() {
    const columns = [
        { field: 'date', headerName: 'Date', width: 110 },
        { field: 'epf', headerName: 'EPF', width: 110 },
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'team', headerName: 'Team', width: 150 },
        { field: 'resign', headerName: 'Resign', width: 120 },
        { field: 'reason', headerName: 'Reason', width: 130 },
        { field: 'service', headerName: 'Service', width: 130 },
        { field: 'age', headerName: 'Age', width: 110 },
        { field: 'grading', headerName: 'Grading', width: 130 },
        { field: 'tl', headerName: 'TL', width: 90 },
        { field: 'area', headerName: 'Area', width: 120 },
        { field: 'shift', headerName: 'Shift', width: 120 },
        { field: 'vsl', headerName: 'VSL', width: 110 },
        { field: 'er', headerName: 'ER', width: 100 },
        { field: 'gl', headerName: 'GL', width: 100 },
        { field: 'godfather', headerName: 'God Father', width: 150 },
        { field: 'lokuakka', headerName: 'Loku Akka', width: 150 },
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
          <Button>
              Add Action
          </Button>

          <div>
          <div style={{ height: 750, width: '100%' ,backgroundColor:'white'}}>
           <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
          </div>

      </DashboardLayout>
  )
}

export default Action