import React from 'react'
import './App.css'
import wave from './Components/wave.svg'
import { Header } from './Components/visly'
import InputArea from './Components/InputArea'

const App: React.FC = () => {
  return (
    <div className='App'>
      <section className='section1'>
      <Header/>
        <InputArea/>
      </section>
      <img src={wave} style={{ pointerEvents: 'none' }}></img>
    </div>
  )
}

export default App
