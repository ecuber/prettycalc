import React, { useState } from 'react'
import { EditableMathField } from 'react-mathquill'
// import evaluatex from '@ecuber/evaluatex/dist/evaluatex'

interface SigmaProps {
  onChange: (variable: string, value: string) => void
}

const cleanInt: string = (p: string) => {
  const arr = p.split('')
  for (const char of arr) {
    if (isNaN(parseInt(char))) {
      arr.splice(arr.indexOf(char), 1)
    }
  }
  return arr.join('')
}

const SigmaEditor: React.FC = (props: SigmaProps) => {
  const [equation, setEquation] = useState('\\sum_{n=1}^{10}')

  return <EditableMathField
    className='input'
    latex={equation}
    onChange={(mathField) => {
      const split = mathField.latex().match(/\\sum_({.{0,}}|.)\^({.{0,}}|.)/)
      if (split?.length > 0) {
        const split1 = split[1].match(/{(.+)}/)?.[1] ?? split[1]
        const split2 = split[2].match(/{(.+)}/)?.[1] ?? split[2]
        // Make sure index and limit of summation are integers
        const index = split1.includes('n=') ? split1.split('n=')[1] : ''
        let lim = split2
        const validIndex: boolean = split1.includes('n=') && (index === null || cleanInt(index).length === index.length)
        const validLimit: boolean = lim === null || cleanInt(lim).length === lim.length /* || lim.split('').filter(a => '\\infinity'.split('').includes(a)) */
        lim = validLimit ? (lim.length > 5 ? '10000' : lim) : '10'
        const eq = `\\sum_{${validIndex ? `n=${index}` : 'n=1'}}^${lim.length > 1 || lim === null ? '{' : ''}${lim}${lim.length > 1 || lim === null ? '}' : ''}`

        if (validIndex) {
          props.onChange('n', { value: index, valid: true })
        }
        if (validLimit && parseInt(lim) !== 0) {
          props.onChange('lim', { value: lim, valid: true })
        }
        if (mathField.latex() !== eq) {
          setEquation('eq', eq)
          mathField.latex(eq)
          return
        }
        setEquation(mathField.latex())
      }
    }
    }
    config={{
      // autoCommands: 'infinity',
      maxDepth: 2
    }}
  />
}

export default SigmaEditor
