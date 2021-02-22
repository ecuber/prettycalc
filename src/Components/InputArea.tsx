import React from 'react'
import Container from 'react-bootstrap/Container'
import EquationEditor from './EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, RoundButton, icons } from './visly'

interface InputProps { equation: string, x: string, y: string, onUpdate: (props: { equation: string, x: string, y: string }) => void }
interface InputState { equation: string, valid: boolean, x: string, y: string }

class InputArea extends React.Component<InputProps, InputState> {
  constructor (props: InputProps) {
    super(props)
    this.state = {
      equation: this.props.equation,
      valid: true,
      x: this.props.x,
      y: this.props.y

    }
  }

  update (target: { name: string, value: string }): void {
    console.log('input update attempt')
    const state: any = { [target.name]: target.value }
    this.setState(state)
  }

  render (): JSX.Element {
    const state = this.state
    return (
      <Container className='justify-content-center'>
        <Card className='mb-3' Content={
          <div className='d-flex flex-row'>
             <InputLabel control={<EquationEditor onChange={this.update.bind(this)} equation={state.equation}/>} label='Equation:' labelPosition='left'/>
             <InputLabel className='ml-xs-2 ml-sm-2 ml-md-5' control={<PointInput onChange={this.update.bind(this)} x={state.x} y={state.y}/>} label='Initial Condition:' labelPosition='left'/>
          </div>
        }/>
        {
          this.state.valid
            ? <RoundButton
          className='m-auto'
          onPress={() => {
            if (this.state.valid) {
              console.log('woo')
              this.props.onUpdate({ equation: this.state.equation, x: this.state.x, y: this.state.y })
            }
          }}
          icon={icons.checkmark}
        />
            : <RoundButton className='m-auto' icon={icons.checkmark} disabled/>
        }
      </Container>
    )
  }
}

export default InputArea
