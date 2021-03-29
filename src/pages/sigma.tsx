/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useState } from 'react'
import { Box, Container } from '@chakra-ui/react'
import loadable from '@loadable/component'
import wave from '../components/wave.svg'
const EquationEditor = loadable(() => import('../components/EquationEditor'))
const SigmaEditor = loadable(() => import('../components/sigma/SigmaEditor'))
const DisplayArea = loadable(() => import('../components/sigma/DisplayArea'))
const Header = loadable(() => import('../components/sigma/Header'))

const Sigma: React.FC = (props) => {
  const [equation, setEquation] = useState('(-1)^n')
  const [n, setN] = useState(1)
  const [lim, setLim] = useState(10)

  const handleChange = (type: string, args: { value: string, valid: string}): void => {
    if (type === 'equation' && args.valid === 'true') {
      setEquation(args.value)
    } else if (type === 'n') {
      setN(parseInt(args.value))
    } else if (type === 'lim') {
      setLim(parseInt(args.value))
    }
  }

  // console.log('eq', equation)
  // console.log('n', n)
  // console.log('lim', lim)

  return <>
    <header style={{ backgroundColor: '#f3f4f5' }}>
      <Container paddingBottom={6} centerContent>
        <Header/>
        <Box minW='300px' marginTop={4} padding={3} shadow='lg' bg='white' borderRadius='lg' d='flex' alignItems='center' justifyContent='center'>
          <SigmaEditor onChange={handleChange}/>
          <EquationEditor equation={equation} onChange={handleChange} n/>
        </Box>
      </Container>
    </header>
    <img src={wave} style={{ pointerEvents: 'none', userSelect: 'none', display: 'block', margin: 0, marginBottom: '-2rem' }}></img>
    <section>
      <Container maxW='90vw' h='100%' paddingTop={3} marginX='auto' centerContent>
        <DisplayArea n={n} lim={lim} equation={equation}/>
      </Container>
    </section>
  </>
}

export default Sigma
