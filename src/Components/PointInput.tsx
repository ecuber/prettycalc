import React from 'react'
import { StaticMathField, addStyles } from 'react-mathquill'
import NumInput from './NumInput'

addStyles()

interface Point {
  onChange: (name: string, updates: { value: string, valid: string }) => void
  x: string
  y: string
}

class PointInput extends React.Component<Point, any> {
  render (): JSX.Element {
    return (
      <div className='inputrow'>
        <StaticMathField style={{ margin: 0, padding: 0 }}>
          {'('}
        </StaticMathField>
        <NumInput onChange={this.props.onChange.bind(this)} name='x' value={this.props.x}/>
        <StaticMathField>
          {','}
        </StaticMathField>
        <NumInput onChange={this.props.onChange.bind(this)} name='y' value={this.props.y}/>
        <StaticMathField>
          {')'}
        </StaticMathField>
      </div>
    )
  }
}

export default PointInput
