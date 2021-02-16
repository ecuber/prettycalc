import React from 'react'
import { StaticMathField, addStyles } from 'react-mathquill'
import NumInput from './NumInput'

addStyles()

interface Point {
  x: number
  y: number
}

class PointInput extends React.Component<Point, any> {
  constructor (props: Point) {
    super(props)
    this.state = {
      x: this.props.x,
      y: this.props.y
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event: any): void {
    const target = event.target
    // const formatted = formatNum(target.value)
    if (!isNaN(parseFloat(target.value))) {
      this.setState({
        [target.name]: target.value
      })
    }
  }

  render (): JSX.Element {
    return (
      <div className='inputrow'>
        <StaticMathField>
          {'('}
        </StaticMathField>
        <NumInput value={'1'}/>
        <StaticMathField>
          {','}
        </StaticMathField>
        <NumInput value={'0'}/>
        <StaticMathField>
          {')'}
        </StaticMathField>
      </div>
    )
  }
}

export default PointInput
