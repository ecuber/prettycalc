import React from 'react'
import './App.css'
import wave from './Components/wave.svg'
import { Header } from './Components/visly'
import InputArea from './Components/InputArea'
import Board from './Components/Board'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ETable from './Components/ETable'

interface AppState {
  equation: string
  x: string
  y: string
  delta: number
}

class App extends React.Component<{}, AppState> {
  constructor (props: any) {
    super(props)
    this.state = {
      equation: 'x^2+y^2',
      x: '1',
      y: '0',
      delta: 0.3
    }
  }

  onUpdate (props: AppState): void {
    this.setState(props)
  }

  render (): JSX.Element {
    const state = this.state
    return (
    <div className='App'>
      <section className='section1'>
        <Header/>
        <InputArea delta={state.delta} onUpdate={this.onUpdate.bind(this)} equation={state.equation} x={state.x} y={state.y}/>
      </section>
      <img src={wave} style={{ pointerEvents: 'none', userSelect: 'none', display: 'block', margin: 0, padding: 0 }}></img>
      <Container>
        <Row xs={1} lg={2} className='w-100 justify-content-center m-auto'>
          <Col className='mx-auto justify-content-center'>
            <h3 className='mb-4'>Graph</h3>
            <div className='mw-500'>
              <Board className='' equation={state.equation} delta={state.delta} x={state.x} y={state.y}/>
            </div>
          </Col>
          <Col className='mt-5 mx-auto mt-lg-0 justify-content-center align-content-center'>
            <h3 className='mb-4'>Table</h3>
            <ETable data={{ equation: state.equation, x: state.x, y: state.y, delta: state.delta }}/>
          </Col>
        </Row>
      </Container>
      <div className='footer p-5'>
        bruh
      </div>
    </div>
    )
  }
}

export default App
