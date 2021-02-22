import React from 'react'
import { StaticMathField, addStyles } from 'react-mathquill'
import NumInput from './NumInput'

addStyles()

interface Point {
  onChange: (target: {name: string, value: string}) => void
  x: string
  y: string
}

class PointInput extends React.Component<Point, any> {
  handleChange (target: { name: string, value: string }): void {
    this.props.onChange({ name: target.name, value: target.value })
  }

  render (): JSX.Element {
    return (
      <div className='inputrow'>
        <StaticMathField style={{ margin: 0, padding: 0 }}>
          {'('}
        </StaticMathField>
        <NumInput onChange={this.handleChange.bind(this)} name='x' value={'1'}/>
        <StaticMathField>
          {','}
        </StaticMathField>
        <NumInput onChange={this.handleChange.bind(this)} name='y' value={'0'}/>
        <StaticMathField>
          {')'}
        </StaticMathField>
      </div>
    )
  }
}

export default PointInput
