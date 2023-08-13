import React from 'react'
import '../App.css'
import logo from '../assets/icon2.png'
import { Button } from '@mui/material'

export default function Header() {
    
  return (
    
        <div className='heading'>
          
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
          <h1> WhatsForDinner?</h1>
          
          
        </div>
    
  )
}
