import React, { useState } from 'react'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import { StaticMathField } from 'react-mathquill'
import { Box, Container } from '@chakra-ui/layout'

interface DisplayProps {
  n: number
  lim: number
  equation: string
}

const evalSequence = (fn: (vars: {n: number}) => number, start: number, end: number): number[] => {
  const list: number[] = []
  for (let i = start; i <= end; i++) {
    list.push((fn({ n: i })))
  }
  return list
}

const DisplayArea: React.FC = (props: DisplayProps) => {
  const [state, setState] = useState({
    sequence: new Array<number>(0),
    fn: (n: number) => n,
    equation: '',
    lim: NaN,
    n: NaN
  })

  const changedEquation = props.equation !== state.equation
  if (changedEquation) {
    const fn: ({ n: number }) => number = evaluatex(props.equation, {}, { latex: true })
    setState({ sequence: evalSequence(fn, props.n, props.lim), equation: props.equation, lim: props.lim, n: props.n, fn })
  } else {
    if (props.n !== state.n) {
      setState({ ...state, sequence: evalSequence(state.fn, props.n, state.lim), n: props.n })
    } else if (props.lim !== state.lim) {
      setState({ ...state, sequence: evalSequence(state.fn, state.n, props.lim), lim: props.lim })
    }
  }

  return <Container maxW='100%' maxH='100%' centerContent>
    <span style={{ fontSize: 23, marginBottom: 10 }}>
      <StaticMathField>{`=${state.sequence.length > 0 ? state.sequence.reduce((a, b) => a + b) : 0}`}</StaticMathField>
    </span>
    <Box flex h='100%' centerContent alignContent='center'>
      <p key={state.sequence.toString()}>
      {state.sequence.map((n, i) => {
        // const style = { fontSize: `${2 - i / (props.lim - props.n + 1.4)}rem` }
        const style = { fontSize: '1.5rem', animationDelay: (props.lim - props.n) >= 500 ? '0s' : `${0.2 + i / (14 + (props.lim - props.n) / 15)}s` }
        return <span aria-hidden='true' key={i} style={style}>
          {`${n < 1 ? '(' : ''}${n % 1 !== 0 ? n.toPrecision(7) : n}${n < 1 ? ')' : ''}${i !== state.sequence.length - 1 ? ' + ' : ''}`}
        </span>
      }
      )}
      </p>
    </Box>
  </Container>
}

export default DisplayArea
