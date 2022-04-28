import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import AreaEtoMonth from './components/eto/AreaEtoMonth'

function Month() {
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='monthlyareaeto'>
              <AreaEtoMonth/>
          </div>
      </DashboardLayout>
  )
}

export default Month