import React from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import JanuaryErEto from './components/JanuaryErEto'
import FebruaryErEto from './components/FebruaryErEto'
import "./Er.css"
import MarchErEto from './components/MarchErEto'
import AprilErEto from './components/AprilErEto'
import MayErEto from './components/MayErEto'
import JuneErEto from './components/JuneErEto'

function Er() {
  return (
      <DashboardLayout>
          <DashboardNavbar/>
          <div className='two'>
              <JanuaryErEto/>
          </div>
          <div className='two'>
              <FebruaryErEto/>
          </div>
          <div className='two'>
              <MarchErEto/>
          </div>
          <div className='two'>
              <AprilErEto/>
          </div>
          <div className='two'>
              <MayErEto/>
          </div>
          <div className='two'>
              <JuneErEto/>
          </div>
      </DashboardLayout>
  )
}

export default Er