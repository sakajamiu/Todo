//import {Container } from 'react-bootstrap'
import React from 'react'
import './App.css'
import useMediaQuery from './hooks/mediaQuery'
import desktopImageLight from './images/bg-desktop-light.jpg'
import mobileImageLight from './images/bg-mobile-light.jpg'
import desktopImageDark from './images/bg-desktop-dark.jpg'
import mobileImageDark from './images/bg-mobile-dark.jpg'
import TODO from './components/TODO'
import { useSelector } from 'react-redux'

function App() {
  const isLight = useSelector(state => state.theme)
  let isDesktop = useMediaQuery('(min-width: 480px)')
  const background = () => {
    if(isDesktop){
      if(isLight){
        return desktopImageLight
      }
      return desktopImageDark
    }
    if(isLight){
      return mobileImageLight
    }
    return mobileImageDark
  }
  const height = isDesktop? '300px': '200px'
  const backgroundSize = isDesktop? 'contain': 'cover'
  const changeTheme = isLight? 'Light': 'Dark'
  return (
    <div className="App" id ={`${changeTheme}`}  >
      <div style={{
        backgroundImage: `url(${background()})`,
        height:`${height}` ,
        backgroundSize:`${backgroundSize}`,
        backgroundRepeat:'no-repeat'
      }} className = 'header'>
      </div>
      <TODO />
    </div>
  )
}

export default App
