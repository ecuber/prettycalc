import React from 'react'
import { Link } from 'gatsby'
import { Button } from '@chakra-ui/button'

const Index: React.FC = (props) => {
  return <>
    <h1>
      welcome
    </h1>
    <Button>
      <Link to='/euler/'>EulerCalc</Link>
    </Button>
    <Button>
      <Link to='/sigma/'>SigmaCalc</Link>
    </Button>
  </>
}

export default Index
