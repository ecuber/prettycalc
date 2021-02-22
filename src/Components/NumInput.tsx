import React from 'react'
import { EditableMathField, addStyles } from 'react-mathquill'
import evaluatex from '../util/evaluatex/evaluatex'

addStyles()

interface Num {
  value: string
  name: string
  onChange: (target: { name: string, value: string }) => void
}

class EquationEditor extends React.Component<Num, { value: string, floatValue: number, valid: boolean }> {
  constructor (props: Num) {
    super(props)
    this.state = {
      value: props.value,
      valid: true,
      floatValue: parseFloat(props.value)
    }
  }

  render (): JSX.Element {
    return (
      <EditableMathField
      style={this.state.valid ? { transition: 'outline 0.5s ease-in-out' } : { transition: 'outline 0.5s ease-in-out', outline: '2px solid #EB8088' }}
      className='input'
      latex={this.state.value}
      onChange={(mathField) => {
        this.setState({ value: mathField.latex() })
        this.props.onChange({ name: this.props.name, value: mathField.latex() })
        if (mathField.latex() !== '') {
          let isValid = true
          try {
            this.setState({ floatValue: evaluatex(mathField.latex(), {}, { latex: true })() })
          } catch (e) {
            isValid = false
          }
          this.setState({ valid: isValid })
        }
      }}
    />
    )
  }
}

export default EquationEditor
