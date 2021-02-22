import React from 'react'
import Container from 'react-bootstrap/Container'
import EquationEditor from './EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, RoundButton, icons } from './visly'

interface InputProps { equation: string, x: string, y: string, onUpdate: (props: { equation: string, x: string, y: string }) => void }
interface InputState { equation: { valid: string, value: string }, x: { valid: string, value: string }, y: { valid: string, value: string } }

class InputArea extends React.Component<InputProps, InputState> {
  constructor (props: InputProps) {
    super(props)
    this.state = {
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

  update (name: string, updates: { value?: string, valid: string }): void {
    const state: any = { [name]: updates }
    this.setState(state)
  }

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
        <Card className='mb-4' Content={
          <div className='d-flex flex-column flex-md-row '>
             <InputLabel control={<EquationEditor onChange={this.update.bind(this)} equation={state.equation.value}/>} label='Equation:' labelPosition='left'/>
             <InputLabel className='ml-xs-2 ml-sm-2 ml-md-5' control={<PointInput onChange={this.update.bind(this)} x={state.x.value} y={state.y.value}/>} label='Initial Condition:' labelPosition='left'/>
          </div>
        }/>
        {
          this.isValid.bind(this)()
            ? <RoundButton
          className='m-auto'
          onPress={() => {
            this.props.onUpdate({ equation: this.state.equation.value, x: this.state.x.value, y: this.state.y.value })
          }}
          icon={icons.checkmark}
        />
            : <RoundButton className='m-auto' disabled={true}/>
        }
      </Container>
    )
  }
}

export default InputArea
