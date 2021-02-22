import React from 'react'
import { EditableMathField, addStyles } from 'react-mathquill'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'

addStyles()

interface Num {
  value: string
  name: string
  onChange: (name: string, updates: { value: string, valid: string }) => void
}

class EquationEditor extends React.Component<Num, { value: string, valid: boolean }> {
  constructor (props: Num) {
    super(props)
    this.state = {
      value: props.value,
      valid: true
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
        if (mathField.latex() !== '') {
          let isValid = true
          try {
            evaluatex(mathField.latex(), {}, { latex: true })()
          } catch (e) {
            isValid = false
          }
          if (isValid) {
            this.props.onChange(this.props.name, { value: mathField.latex(), valid: 'true' })
          } else {
            this.props.onChange(this.props.name, { value: '', valid: 'false' })
          }

          this.setState({ valid: isValid })
        }
      }}
    />
    )
  }
}

export default EquationEditor
