import React, { useState } from 'react'
import { StaticMathField, EditableMathField, addStyles } from 'react-mathquill'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

addStyles()

const EquationEditor: React.FC = () => {
  const [equation, setEquation] = useState('\\frac{x}{x^2+y^2}')
  return (
    <Row className='justify-content-center align-items-center'>
      <Col lg='auto'>
        <StaticMathField>
          {'\\frac{dy}{dx}='}
        </StaticMathField>
        <EditableMathField
          className='input'
          latex={equation}
          onChange={(mathField) => {
            setEquation(mathField.latex())
          }}
          config={{
            autoCommands: 'pi sqrt ln log',
            autoOperatorNames: 'sin cos tan arcsin arccos arctan sec csc cot',
            autoSubscriptNumerals: false
          }}
        />
      </Col>
    </Row>
  )
}

export default EquationEditor
