import React from 'react'
import Container from 'react-bootstrap/Container'
import EquationEditor from './EquationEditor'
import PointInput from './PointInput'
import { InputLabel, Card, icons, RoundButton } from './visly'

const InputArea: React.FC = () => (
  <Container className='justify-content-center'>
    <Card className='mb-5' Content={
      <div className='d-flex flex-auto'>
         <InputLabel control={<EquationEditor/>} label='Equation:' labelPosition='left'/>
         <InputLabel className='ml-xs-2 ml-sm-2 ml-md-5' control={<PointInput x={0} y={0}/>} label='Initial Condition:' labelPosition='left'/>
      </div>
    }/>
    <RoundButton
      className='m-auto'
      onPress={() => {}}
      icon={icons.checkmark}
    />
  </Container>
)

export default InputArea
