import React, { useState } from 'react'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import { StaticMathField } from 'react-mathquill'

interface DisplayProps {
  n: number
  lim: number
  equation: string
}

const DisplayArea: React.FC = (props: DisplayProps) => {
  const [equation, setEquation] = useState(null)
  const [sequence, setSequence]: [number[], (l: number[]) => void] = useState([])
  const [n, setN] = useState(-1)
  const [lim, setLim] = useState(-1)
  const [sum, setSum] = useState(-1)
  const [length, setLength] = useState(0)
  const [index, setIndex] = useState(0)

  if (props.equation !== equation) {
    const list: number[] = []
    for (let i = props.n; i <= props.lim; i++) {
      const evaled: number = evaluatex(props.equation, { n: i }, { latex: true })()
      list.push(evaled)
    }
    setEquation(props.equation)
    setSequence(list)
    setSum(list.reduce((a, b) => a + b))
    setLim(props.lim)
    setN(props.n)
    setLength(props.lim - props.n)
    setIndex(0)
  } else {
    if (lim !== props.lim) {
      setLim(props.lim)
      if (lim < props.lim) {
        const list = [...sequence]
        for (let i = lim + 1; i <= props.lim; i++) {
          const evaled: number = evaluatex(props.equation, { n: i }, { latex: true })()
          list.push(evaled)
        }
        setSequence(list)
      } else {
        setLength(length - (lim - props.lim))
      }
    }
    if (n !== props.n) {
      if (n < props.n) {
        setIndex(index + props.n - n)
      } else {
        setIndex(0)
        const list = [...sequence]
      }
    }
  }
  return <div>
    <StaticMathField>{`=${sum ?? 0}`}</StaticMathField>
    <p key={sequence.toString()}>
    {sequence.slice(index, length).map((n, i) => {
      // const style = { fontSize: `${2 - i / (props.lim - props.n + 1.4)}rem` }
      const style = { fontSize: '1.5rem', animationDelay: (props.lim - props.n) >= 500 ? '0s' : `${0.2 + i / (14 + (props.lim - props.n) / 15)}s` }
      return <span aria-hidden='true' key={i} style={style}>
        {`${n.toPrecision(7)}, `}
      </span>
    }
    )}
    </p>
  </div>
}

export default DisplayArea
