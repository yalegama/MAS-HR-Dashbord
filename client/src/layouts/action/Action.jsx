import { BrowserRouter,Switch, Route } from 'react-router-dom'
import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { ToastContainer } from 'react-toastify'
import ActionPlan from './components/ActionPlan'

function Action() {
  return (
<BrowserRouter>
<DashboardLayout>
      <DashboardNavbar/>
      <div className='app'>
        <ToastContainer position='top-center'/>
        <Switch>
          <Route exact path="/action" component={ActionPlan}/>
        </Switch>
      </div>
    </DashboardLayout>
</BrowserRouter>
  )
}

export default Action