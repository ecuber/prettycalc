import React from 'react'
import Container from 'react-bootstrap/Container'
import EquationEditor from './EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, icons, RoundButton } from './visly'

interface InputProps { equation: string, x: string, y: string, onUpdate: (target: { name: string, value: string }) => void }
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

  render (): JSX.Element {
    const state = this.state
    return (
      <Container className='justify-content-center'>
        <Card className='' Content={
          <div className='d-flex flex-row'>
             <InputLabel control={<EquationEditor onChange={this.props.onUpdate} equation={state.equation}/>} label='Equation:' labelPosition='left'/>
             <InputLabel className='ml-xs-2 ml-sm-2 ml-md-5' control={<PointInput onChange={this.props.onUpdate} x={state.x} y={state.y}/>} label='Initial Condition:' labelPosition='left'/>
          </div>
        }/>
        {/* <RoundButton
          className='m-auto'
          onPress={() => {}}
          icon={icons.checkmark}
        /> */}
      </Container>
    )
  }
}

export default InputArea
