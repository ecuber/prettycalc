import React from 'react'
import JXGBoard from '@sswatson/jsxgraph-react-js'
import evaluatex from '../util/evaluatex/evaluatex'

const LENGTH = 0.35
const SPACING = 0.6

class Board extends React.Component<{ equation: string, x: string, y: string }> {
  // brd has type https://jsxgraph.uni-bayreuth.de/docs/symbols/JXG.Board.html
  logicJs (brd: any): void {
    brd.suspendUpdate()

    // brd.defaultAxes.x.defaultTicks.setAttribute({ majorHeight: -1 })
    // brd.defaultAxes.y.defaultTicks.setAttribute({ majorHeight: -1 })
    const delta = brd.create('slider', [[-2.5, 3.25], [-1.5, 3.25], [0.01, 0.1, 1.0]])

    const start = brd.create('point', [evaluatex(this.props.x)(), evaluatex(this.props.y)()], { withLabel: false, color: 'gold' })

    // Rendersslope field
    for (let x = -10; x < 10; x += SPACING) {
      for (let y = -10; y < 10; y += SPACING) {
        const slope = evaluatex(this.props.equation)({ x, y })
        // console.log(slope)
        const angle = Math.atan(slope)
        brd.create('arrow', [[x, y], [x + LENGTH * Math.cos(angle), y + LENGTH * Math.sin(angle)]], { color: 'MidnightBlue', opacity: 0.3 })
      }
    }
    brd.unsuspendUpdate()
  }

  render (): JSX.Element {
    return (
      <JXGBoard
        logic={this.logicJs.bind(this)}
        boardAttributes={{ axis: true, showCopyright: false, screenshot: true, boundingBox: [-5, 5, 5, -5] }}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          axis: false
        }}
    />
    )
  }
}

export default Board
