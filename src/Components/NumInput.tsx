import React, { useState } from 'react'
import { EditableMathField, addStyles } from 'react-mathquill'
import evaluatex from 'evaluatex/dist/evaluatex'

addStyles()

const NumInput: React.FC<{value: string}> = (props: {value: string}) => {
  const [value, setValue] = useState(props.value)
  const [valid, setValid] = useState(true)

  return (
    <EditableMathField
      className='input'
      latex={value}
      onChange={(mathField) => {
        setValue(mathField.latex())
        if (mathField.latex() !== '') {
          try {
            const testEval = evaluatex(mathField.latex(), {}, { latex: true })()
            setValid(!isNaN(testEval))
          } catch (e) {
            setValid(false)
          }
        }
      }}
    />
  )
}

export default NumInput
