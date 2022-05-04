import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Areaetoday from './eto/Areaetoday'
import Shifttoday from './eto/Shifttoday'
import Vsltodayeto from './eto/Vsltodayeto'
import "./Day.css"
import ErDayEto from './eto/ErDayEto'
import GlDayEto from './eto/GlDayEto'
import GodFatherDay from './eto/GodFatherDay'
import LokuAkkaDayEto from './eto/LokuAkkaDayEto'
import VuiTypography from 'components/VuiTypography'
import AreaVopDay from './vop/AreaVopDay'
import ShiftDayVop from './vop/ShiftDayVop'
import VslDayVop from './vop/VslDayVop'
import ErDayVop from './vop/ErDayVop'
import GlDayVop from './vop/GlDayVop'
import LokuAkkaDay from './vop/LokuAkkaDay'
import AreaResignDay from './resign/AreaResignDay'
import ShiftDayResign from './resign/ShiftDayResign'
import VslDayResign from './resign/VslDayResign'
import ErResignDay from './resign/ErResignDay'
import GlResignDay from './resign/GlResignDay'
import GodFatherDayResign from './resign/GodFatherDayResign'
import LokuAkkaResignDay from './resign/LokuAkkaResignDay'

function Day() {
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='oneBar'>
            <Areaetoday/>
            <Shifttoday/>
            <Vsltodayeto/>
          </div>
          <div className='bar'>
            <ErDayEto/>
          </div>
          <div className='bar'>
            <GlDayEto/>
          </div>
          <div className='bar'>
            <GodFatherDay/>
          </div>
          <div className='bar'>
            <LokuAkkaDayEto/>
          </div>

<VuiTypography variant="lg" color="white" fontWeight="bold">
  <h2>VOP Summary Of Today</h2>
</VuiTypography>

<div className='oneBar'>
  <AreaVopDay/>
  <ShiftDayVop/>
  <VslDayVop/>
</div>
<div className='bar'>
  <ErDayVop/>
</div>
<div className='bar'>
  <GlDayVop/>
</div>
<div className='bar'>
  <GodFatherDay/>
</div>
<div className='bar'>
  <LokuAkkaDay/>
</div>

<VuiTypography variant="lg" color="white" fontWeight="bold">
  <h2>Resign Summary Of Today</h2>
</VuiTypography>

<div className='oneBar'>
  <AreaResignDay/>
  <ShiftDayResign/>
  <VslDayResign/>
</div>

<div className='bar'>
  <ErResignDay/>
</div>
<div className='bar'>
  <GlResignDay/>
</div>
<div className='bar'>
  <GodFatherDayResign/>
</div>
<div className='bar'>
  <LokuAkkaResignDay/>
</div>
      </DashboardLayout>
  )
}

export default Day