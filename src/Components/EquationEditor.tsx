import React, { useState } from 'react'
import { StaticMathField, EditableMathField, addStyles } from 'react-mathquill'
import evaluatex from 'evaluatex/dist/evaluatex'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

addStyles()

const EquationEditor: React.FC = () => {
  const [equation, setEquation] = useState('\\frac{x}{x^2+y^2}')
  const [valid, setValid] = useState(true)
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
            let isValid: boolean = true
            try {
              evaluatex(mathField.latex(), { x: 0, y: 0 }, { latex: true })()
            } catch (e) {
              isValid = false
            }
            setValid(isValid)
            setEquation(mathField.latex())
          }}
          config={{
            autoCommands: 'pi sqrt',
            autoOperatorNames: 'sin cos tan arcsin arccos arctan sec csc cot ln log',
            autoSubscriptNumerals: false
          }}
        />
      </Col>
    </Row>
  )
}

export default EquationEditor
