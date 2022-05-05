import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import AreaEto from './components/eto/AreaEto'
import ShiftEto from './components/eto/ShiftEto'
import VslEto from './components/eto/VslEto'
import "./Month.css"
import ErMonthEto from './components/eto/ErMonthEto'
import GlEtoMonth from './components/eto/GlEtoMonth'
import GodFatherMonth from './components/eto/GodFatherMonth'
import LokuAkkaEtoMonth from './components/eto/LokuAkkaEtoMonth'
import AreaVopMonth from './components/vop/AreaVopMonth'
import ShiftMonthVop from './components/vop/ShiftMonthVop'
import VslMonthVop from './components/vop/VslMonthVop'
import ErMonthVop from './components/vop/ErMonthVop'
import GlVopMonth from './components/vop/GlVopMonth'
import GodFatherMonthVop from './components/vop/GodFatherMonthVop'
import LokuAkkaVop from './components/vop/LokuAkkaVop'
import AreaResignMonth from './components/resign/AreaResignMonth'
import ShiftResignMonth from './components/resign/ShiftResignMonth'
import VslResignMonth from './components/resign/VslResignMonth'
import ErResignMonth from './components/resign/ErResignMonth'
import GlResignMonth from './components/resign/GlResignMonth'
import GorFatherResignMonth from './components/resign/GorFatherResignMonth'
import LokuAkkaResignMonth from './components/resign/LokuAkkaResignMonth'
import VuiTypography from 'components/VuiTypography'

function Month() {
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <div className='oneBar'>
      <AreaEto/>
      <ShiftEto/>
      <VslEto/>
      </div>
      <div className='group'>
        <ErMonthEto/>
      </div>
      <div className='group'>
        <GlEtoMonth/>
      </div>
      <div className='group'>
        <GodFatherMonth/>
      </div>

      <div className='group'>
        <LokuAkkaEtoMonth/>
      </div>
      <div className='title'>VOP</div>
      <div className='oneBar'> 
        <AreaVopMonth/>
        <ShiftMonthVop/>
        <VslMonthVop/>
      </div>
      <div className='group'>
        <ErMonthVop/>
        
      </div>
      <div className='group'>
      <GlVopMonth/>
      </div>
      <div className='group'>
      <GodFatherMonthVop/>
      </div>
      <div className='group'>
      <LokuAkkaVop/>
      </div>
      <div className='title'>Resign</div>
      <div className='group'>
      <div className='oneBar'>
      <AreaResignMonth/>
      <ShiftResignMonth/>
      <VslResignMonth/>
      </div>
      <div className='group'>
      <ErResignMonth/>
      </div>
      <div className='group'>
      <GlResignMonth/>
      </div>
      <div className='group'>
      <GorFatherResignMonth/>
      </div>
      <div className='group'>
      <LokuAkkaResignMonth/>
      </div>
      </div>
      <div>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          <h3>This Month Reason Summary</h3>
        </VuiTypography>
        <div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Month