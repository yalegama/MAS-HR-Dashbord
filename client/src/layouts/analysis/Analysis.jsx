import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import AnalysisSelect from './AnalysisSelect'
import "../analysis/Analysis.css"

function Analysis() {
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <AnalysisSelect/>
      </DashboardLayout>
  )
}

export default Analysis