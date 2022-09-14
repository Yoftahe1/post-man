import React from 'react'
import './header.css'
const Header = () => {
  return (
    <div className='header'>
    <img src={require('../img/logo.png') } alt="paper jet"/>
    <h2>HTTP REQUEST</h2>
    </div>
  )
}

export default Header