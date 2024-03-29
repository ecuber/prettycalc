import React from 'react'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { StaticMathField } from 'react-mathquill'
import EquationEditor from '../EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, RoundButton, icons, Slider, SliderValue, CompLabel, IconButton } from '../visly'

interface InputProps { delta: number, equation: string, x: string, y: string, onUpdate: (props: { equation: string, x: string, y: string, delta: number }) => void, graphRef: React.RefObject<HTMLHeadingElement> }
interface InputState { delta: { value: number, valid: string }, equation: { valid: string, value: string }, x: { valid: string, value: string }, y: { valid: string, value: string } }

class InputArea extends React.Component<InputProps, InputState> {
  constructor (props: InputProps) {
    super(props)
    this.state = {
      delta: {
        value: this.props.delta,
        valid: 'true'
      },
      equation: {
        valid: 'true',
        value: this.props.equation
      },
      x: {
        valid: 'true',
        value: this.props.x
      },
      y: {
        valid: 'true',
        value: this.props.y
      }
    }
  }

  // Updates state of a given field.
  update (name: string, updates: { value?: string, valid: string }): void {
    const state: any = { [name]: updates }
    this.setState(state)
  }

  // Checks all keys to make sure there are no invalid fields.
  isValid (): boolean {
    const valids = Object.keys(this.state).map(key => {
      return this.state[key as keyof InputState].valid === 'true'
    })
    return !valids.includes(false)
  }

  render (): JSX.Element {
    const state = this.state
    return (
      <Container className='justify-content-center'>
        <Card className='inputcard mx-auto mb-3' Content={
          <div className=' d-flex flex-column flex-lg-row '>
             <InputLabel control={<>
             <StaticMathField>
              {'\\frac{dy}{dx}='}
            </StaticMathField>
            <EquationEditor onChange={this.update.bind(this)} equation={state.equation.value}/>
            </>}
            label='Equation:'
            labelPosition='left'
            />
             <InputLabel className='ms-0 ms-lg-3 ms-xl-5 mt-3 my-lg-0' control={<PointInput onChange={this.update.bind(this)} x={state.x.value} y={state.y.value}/>} label='Initial Condition:' labelPosition='left'/>
             <CompLabel className='ms-0 ms-lg-3 ms-xl-5 mt-3 my-lg-0' control={
               <SliderValue text={this.state.delta.value.toFixed(1).toString()} Slider={
                <Slider value={this.state.delta.value} min={0.1} max={1} step={0.1}
                onChange={(x) => { this.setState({ delta: { value: x, valid: 'true' } }) }}/>
               }/>
              }
              complabel={<StaticMathField>{'\\Delta x:'}</StaticMathField>} label='delta x'/>
          </div>
        }/>
        <div className='m-auto d-flex justify-content-center align-content-center lightfont mb-2'>
          <p>Updates! Click here →</p>
          <OverlayTrigger
            trigger='focus'
            placement='auto-end'
            delay={{ show: 250, hide: 400 }}
            overlay={popover}
          >
            <IconButton kind='quiet'/>
          </OverlayTrigger>
        </div>
        {
          this.isValid.bind(this)()
            ? <RoundButton
          className='m-auto'
          onPress={() => {
            this.props.onUpdate({ equation: this.state.equation.value, x: this.state.x.value, y: this.state.y.value, delta: this.state.delta.value })
            this.props.graphRef.current?.scrollIntoView()
          }}
          icon={icons.checkmark}
        />
            : <RoundButton className='m-auto' disabled/>
        }
      </Container>
    )
  }
}

// Popover has to be defined in the same file to show up correctly for some reason
const popover = (
  <Popover style={{ minWidth: '20vw', maxWidth: '50vw' }} id="popover-basic">
    <Popover.Content className='pb-3'>
    <ul className='ps-4 pt-1'>
      <li>There&apos;s some cool new features to try:
        <ul className='ps-3'>
          <li>
            Automatic commands are now fully supported! Typing <code>pi</code> or <code>sqrt</code> will now automatically correct to <strong>π</strong> or <strong>√</strong> just like Desmos.
          </li>
          <li>
            nth-roots (like <strong>∛</strong>) are now supported as well! Type <code>nthroot</code> to try it out.
          </li>
          <li>
            You can type expressions in the initial condition box! For example, you can set the initial x-value to to <code>3pi/2</code>.
          </li>
        </ul>
      </li>
      <li className='pt-2'>
        If an input area turns <div className='m-0 d-inline' style={{ border: 'solid red 1px', color: 'red', padding: '0.2rem' }}>red</div> the parser couldn&apos;t understand it. Here are some common reasons why that may have happened:
        <ul className='ps-3'>
          <li>
            Make sure you type inverse trig functions using the arc- prefix (e.g. <code>arcsin</code> instead of <code>sin<sup>-1</sup></code>)
          </li>
          <li>
            The only allowed variables are <code>x</code> and <code>y</code>. Expressions in the initial condition boxes may not contain variables.
          </li>
          <li>
            Only logarithms with base e (<code>ln</code>) are supported at this time.
          </li>
        </ul>
      </li>
    </ul>
    </Popover.Content>
  </Popover>
)

export default InputArea
