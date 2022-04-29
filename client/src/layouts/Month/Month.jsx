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
    </DashboardLayout>
  )
}

export default Month