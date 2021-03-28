import React from 'react'
import '../css/App.css'
import { Header, setBreakpoints } from '../components/visly'
import { Row, Col, Container } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import InputArea from '../components/euler/InputArea'
import Board from '../components/euler/Board'
import ETable from '../components/euler/ETable'
import wave from '../components/wave.svg'

setBreakpoints('min-width', ['800px', '1200px'])

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
    this.graphRef = React.createRef<HTMLHeadingElement>()
  }

  onUpdate (props: AppState): void {
    this.setState(props)
  }

  render (): JSX.Element {
    const state = this.state
    return (
    <div className='App'>
      <Helmet>
        <title>EulerCalc</title>
      </Helmet>
      <section className='section1'>
        <Header/>
        <InputArea delta={state.delta} onUpdate={this.onUpdate.bind(this)} equation={state.equation} x={state.x} y={state.y} graphRef={this.graphRef}/>
      </section>
      <img src={wave} style={{ pointerEvents: 'none', userSelect: 'none', display: 'block', margin: 0, padding: 0 }}></img>
      <Container>
        <Row xs={1} lg={2} className='w-100 justify-content-center m-auto'>
          <Col className='mx-auto justify-content-center'>
            <h3 ref={this.graphRef} className='h3 mb-4'>graph</h3>
            <div className='mw-500'>
              <Board className='' equation={state.equation} delta={state.delta} x={state.x} y={state.y}/>
            </div>
          </Col>
          <Col className='mt-5 mx-auto mt-lg-0 justify-content-center align-content-center'>
            <h3 className='h3 mb-4'>table</h3>
            <ETable data={{ equation: state.equation, x: state.x, y: state.y, delta: state.delta }}/>
          </Col>
        </Row>
      </Container>
      <div className='footer pt-2 pb-5 d-flex flex-column align-contents-center justify-content-center'>
        <a className='black mx-auto' href='https://github.com/ecuber/euler'><FaGithub/></a>
        <p className='lightfont'>github</p>
      </div>
    </div>
    )
  }
}

export default App
