import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Button,
  ButtonGroup,
  Box
} from '@chakra-ui/react'
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

const defaultExpression = '\\sum_{n=0}^{10}'

const SigmaEditor: React.FC = (props: SigmaProps) => {
  const [equation, setEquation] = useState(defaultExpression)
  const [valid, setValid] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const open = (): void => setIsOpen(!isOpen)
  const close = (): void => setIsOpen(false)

  return <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement='auto'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <span style={{ paddingTop: 50 }}></span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">You deleted the Σ!</PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            Restore it by clicking here:
            <Box w='100%' d='inline' pl='2'>
              <ButtonGroup mt='1.5' size="sm">
                <Button onClick={() => {
                  setEquation(defaultExpression)
                  setValid(true)
                  close()
                }} colorScheme="green">Restore</Button>
              </ButtonGroup>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <EditableMathField
        className='input'
        style={valid ? { transition: 'outline 0.5s ease-in-out' } : { transition: 'outline 0.5s ease-in-out', outline: '2px solid #EB8088' }}
        latex={equation}
        onChange={(mathField) => {
          // Match equation to regex for sigma notation
          const input = mathField.latex()
          const split = input.match(/\\sum_({.{0,}}|.)\^({.{0,}}|.)/)
          if (split?.length > 0) {
            // Get arguments of sigma latex command
            const split1 = split[1].match(/{(.+)}/)?.[1] ?? split[1]
            const split2 = split[2].match(/{(.+)}/)?.[1] ?? split[2]
            // Make sure index and limit exist and are integers
            const index = split1.includes('n=') && split1.split('n=')[1].replaceAll(' ', '') !== '' ? split1.split('n=')[1] : ''
            let lim = split2
            const validIndex: boolean = split1.includes('n=') && index !== '' && cleanInt(index).length === index.length
            const validLimit: boolean = lim !== null && cleanInt(lim).length === lim.length /* || lim.split('').filter(a => '\\infinity'.split('').includes(a)) */
            lim = validLimit ? (lim.length > 5 ? '10000' : lim) : '10'

            if (validIndex && validLimit && parseInt(lim) !== 0) {
              setValid(true)
              if (validIndex) {
                props.onChange('n', { value: index, valid: true })
              }
              if (validLimit) {
                props.onChange('lim', { value: lim, valid: true })
              }
            } else {
              setValid(false)
            }
            setEquation(mathField.latex())
          } else {
            open()
          }
        }
        }
        config={{
          // autoCommands: 'infinity',
          maxDepth: 2
        }}
      />
  </>
}

export default SigmaEditor
