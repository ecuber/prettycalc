/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import EquationEditor from '../EquationEditor'
import SigmaEditor from './SigmaEditor'

const InputArea: React.FC = (props: { handleChange: (variable: string, value: string) => void, equation: string }) => {
  const [equation, setEquation] = useState(props.equation)
  const handleEquation = (variable: string, value: string): void => {
    setEquation(value)
    props.handleChange(variable, value)
  }
  return <>
    <Box minW='300px' marginTop={4} padding={3} shadow='lg' bg='white' borderRadius='lg' d='flex' alignItems='center' justifyContent='center'>
      <SigmaEditor onChange={props.handleChange}/>
      <EquationEditor equation={equation} onChange={handleEquation} n/>
    </Box>
  </>
}

export default InputArea
