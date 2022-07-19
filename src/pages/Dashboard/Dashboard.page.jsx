import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.component'

const Dashboard = () => {
  return (
    <section className='h-screen w-screen flex flex-row'>
      <div className='h-screen min-w-[270px]'>
        <Sidebar/>
      </div>
      <div className='h-screen w-4/5'>
        <div>
          navigation
        </div>
        Content
      </div>

    </section>
  )
}


export default Dashboard