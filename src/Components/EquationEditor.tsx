import React from 'react'
import { StaticMathField, EditableMathField, addStyles } from 'react-mathquill'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

addStyles()

interface EqProps { equation: string, onChange: (name: string, updates: { value?: string, valid: string }) => void }

class EquationEditor extends React.Component<EqProps, { equation: string, valid: boolean }> {
  constructor (props: EqProps) {
    super(props)
    this.state = {
      equation: props.equation,
      valid: true
    }
  }

  render (): JSX.Element {
    // console.log(this.state.equation)
    // console.log(this.state.valid)
    return (
      <Row className='justify-content-center align-items-center'>
        <Col lg='auto'>
          <StaticMathField>
            {'\\frac{dy}{dx}='}
          </StaticMathField>
          <EditableMathField
            style={this.state.valid ? { transition: 'outline 0.5s ease-in-out' } : { transition: 'outline 0.5s ease-in-out', outline: '2px solid #EB8088' }}
            className='input'
            latex={this.state.equation}
            onChange={(mathField) => {
              let isValid: boolean = true
              try {
                evaluatex(mathField.latex(), { x: 0, y: 0 }, { latex: true })()
              } catch (e) {
                console.log('invalid expression')
                isValid = false
              }
              // console.log(this.formatTex(mathField.latex()))
              this.setState({ equation: mathField.latex(), valid: isValid })
              if (isValid) {
                this.props.onChange('equation', { value: mathField.latex(), valid: 'true' })
              } else {
                this.props.onChange('equation', { valid: 'false' })
              }
            }}
            config={{
              autoCommands: 'pi',
              autoOperatorNames: 'sin cos tan sec arctan arccos arcsin csc cot ln log',
              spaceBehavesLikeTab: true,
              autoSubscriptNumerals: false,
              supSubsRequireOperand: true,
              sumStartsWithNEquals: true,
              maxDepth: 10
            }}
          />
        </Col>
      </Row>
    )
  }
}

export default EquationEditor
