import React from 'react'
import '../App.css'
import logo from '../assets/icon2.png'

export default function Header() {
    
  return (
    
        <div className='heading'>
          <img src={logo} className="App-logo" alt="logo" />
          <h1> WhatsForDinner?</h1>
          
        </div>
    
  )
}
