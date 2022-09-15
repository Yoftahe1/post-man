import React from 'react'
import Tabs from "./tabs"
import Output from "./Output";
import Sidebar from './Sidebar'
import './layout.css'
const Layout = () => {
  return (
    <div className='layout'>
        <Sidebar/>
        <div>
            <Tabs/>
            <Output/>
        </div>
    </div>
  )
}

export default Layout