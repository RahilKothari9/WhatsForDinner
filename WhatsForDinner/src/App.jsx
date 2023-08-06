import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import AddSection from './components/AddSection'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Section from './components/Section'
import AddItem from './components/AddItem'
import Private from './components/Private'
import { ThemeProvider } from '@emotion/react'

function App() {
    const [sectionId, setSectionId] = useState("")
    // const theme = createTheme({
    //   components: {
        
    //     MuiTextField: {
    //       styleOverrides: {
    //         root: {
    //           font-family: 'Barlow Semi Condensed',

    //         },
    //       },
    //     },
    //   },
    // });
  return (
    <>
      <div className='wrapper'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<Private/>}>
                    <Route exact path='/' element={<Dashboard sectionId={sectionId} setSectionId={setSectionId}/>}/>
              </Route>
              <Route path='/section' element={<Private/>}>
                    <Route path='/section' element={<Section sectionId={sectionId} setSectionId={setSectionId}/>}/>
              </Route>
              <Route exact path='/addadish' element={<Private/>}>
                    <Route path='/addadish' element={<AddItem sectionId={sectionId} setSectionId={setSectionId}/>}/>
              </Route>
              <Route exact path='/addcategory' element={<Private/>}>
                    <Route exact path='/addcategory' element={<AddSection/>}/>
              </Route>
              <Route path='/register' element={<Signup/>} />
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
      {/* <h4>Hi</h4> */}
    </>
  )
}

export default App
