import React from 'react'
import Container from 'react-bootstrap/Container'
import { StaticMathField } from 'react-mathquill'
import EquationEditor from './EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, RoundButton, icons, Slider, SliderValue, CompLabel } from './visly'

interface InputProps { equation: string, x: string, y: string, onUpdate: (props: { equation: string, x: string, y: string, delta: number }) => void }
interface InputState { delta: { value: number, valid: string }, equation: { valid: string, value: string }, x: { valid: string, value: string }, y: { valid: string, value: string } }

class InputArea extends React.Component<InputProps, InputState> {
  constructor (props: InputProps) {
    super(props)
    this.state = {
      delta: {
        value: 0.4,
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
        <Card className='w-75 mx-auto mb-5' Content={
          <div className=' d-flex flex-column flex-lg-row '>
             <InputLabel control={<EquationEditor onChange={this.update.bind(this)} equation={state.equation.value}/>} label='Equation:' labelPosition='left'/>
             <InputLabel className='ml-0 ml-lg-3 ml-xl-5 mt-3 my-lg-0' control={<PointInput onChange={this.update.bind(this)} x={state.x.value} y={state.y.value}/>} label='Initial Condition:' labelPosition='left'/>
             <CompLabel className='ml-0 ml-lg-3 ml-xl-5 mt-3 my-lg-0' control={
               <SliderValue text={this.state.delta.value.toFixed(1).toString()} Slider={
                <Slider value={this.state.delta.value} min={0.1} max={1} step={0.1}
                onChange={(x) => { this.setState({ delta: { value: x, valid: 'true' } }) }}/>
               }/>
              }
              complabel={<StaticMathField>{'\\Delta x:'}</StaticMathField>}/>
          </div>
        }/>
        {
          this.isValid.bind(this)()
            ? <RoundButton
          className='m-auto'
          onPress={() => {
            this.props.onUpdate({ equation: this.state.equation.value, x: this.state.x.value, y: this.state.y.value, delta: this.state.delta.value })
          }}
          icon={icons.checkmark}
        />
            : <RoundButton className='m-auto' disabled/>
        }
      </Container>
    )
  }
}

export default InputArea
