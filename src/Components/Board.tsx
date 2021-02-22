import React from 'react'
import JXGBoard from '@sswatson/jsxgraph-react-js'
import evaluatex from '../util/evaluatex/evaluatex'

const LENGTH = 0.35
const SPACING = 0.6

interface BoardData { equation: string, x: string, y: string }

class Board extends React.Component<BoardData, BoardData> {
  state = {
    ...this.props
  }

  // brd has type https://jsxgraph.uni-bayreuth.de/docs/symbols/JXG.Board.html
  logicJs (brd: any): void {
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

    brd.prepareUpdate()
  }

  render (): JSX.Element {
    const board = <JXGBoard
      key={Math.random().toString()}
      logic={this.logicJs.bind(this)}
      boardAttributes={{
        axis: true,
        defaultAxes: {
          y: { ticks: { visible: true, majorHeight: 5 } },
          x: { ticks: { visible: true, majorHeight: 5 } }
        },
        showCopyright: false,
        screenshot: true,
        boundingBox: [-4.5, 4.5, 4.5, -4.5]
      }}
      style={{
        border: '1px solid black',
        borderRadius: '5px',
        axis: false,
        showReload: true
      }}
    />
    return board
  }
}

export default Board
