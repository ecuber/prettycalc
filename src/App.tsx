import React from 'react'
import './App.css'
import wave from './Components/wave.svg'
import { Header } from './Components/visly'
import InputArea from './Components/InputArea'
import Board from './Components/Board'
import Container from 'react-bootstrap/Container'

interface AppState {
  equation: string
  valid: boolean
  x: string
  y: string
}

class App extends React.Component<{}, AppState> {
  constructor (props: any) {
    super(props)
    this.state = {
      equation: '\\frac{x}{x^2+y^2}',
      valid: true,
      x: '1',
      y: '0'
    }
  }

  onUpdate (target: { name: string, value: string }): void {
    // const formatted = formatNum(target.value)
    const state: any = {
      [target.name]: target.value
    }
    this.setState(state)
  }

  render (): JSX.Element {
    const state = this.state
    console.log(state)
    return (
      <div className='App'>
      <section className='section1'>
        <Header/>
        <InputArea onUpdate={this.onUpdate.bind(this)} equation={state.equation} x={state.x} y={state.y}/>
      </section>
      <img src={wave} style={{ pointerEvents: 'none', userSelect: 'none', display: 'block', margin: 0, padding: 0 }}></img>
      <Container>
        <Board equation={state.equation} x={state.x} y={state.y}/>
      </Container>
    </div>
    )
  }
}

export default App
