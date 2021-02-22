/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import JXGBoard from '@sswatson/jsxgraph-react-js'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import { deflate } from 'zlib'

const LENGTH = 0.4
const SPACING = 0.6

interface BoardData { equation: string, x: string, y: string, delta: number }

class Board extends React.Component<BoardData> {
  // brd has type https://jsxgraph.uni-bayreuth.de/docs/symbols/JXG.Board.html
  logicJs (brd: any): void {
    const delta = this.props.delta

    const start = brd.create('point', [evaluatex(this.props.x)(), evaluatex(this.props.y)()], { withLabel: false, color: '#06A77D', fixed: true })

    // Renders slope field
    for (let x = Math.floor(start.X() - 10); x < start.X() + 10; x += SPACING) {
      for (let y = -10; y < 10; y += SPACING) {
        const slope = evaluatex(this.props.equation)({ x, y })
        // console.log(slope)
        const angle = Math.atan(slope)
        brd.create('arrow', [[x, y], [x + LENGTH * Math.cos(angle), y + LENGTH * Math.sin(angle)]], { color: '#052F5F', opacity: 0.3, fixed: true })
      }
    }

    // Set up Euler method points
    // hex 005377
    // palette 052f5f,005377,06a77d,d5c67a,f1a208

    let x = start.X()
    let y = start.Y()
    let i = 0
    while (i < 12) {
      console.log(typeof y)
      x += delta
      const deltay = delta * evaluatex(this.props.equation)({ x, y })
      y += deltay
      brd.create('point', [x, y], { color: '#005377', fixed: true, withLabel: false })
      i++
    }
    x = start.X()
    y = start.Y()
    while (i > 0) {
      x -= delta
      const deltay = delta * evaluatex(this.props.equation)({ x, y })
      y -= deltay
      brd.create('point', [x, y], { color: '#005377', fixed: true, withLabel: false })
      i--
    }
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
