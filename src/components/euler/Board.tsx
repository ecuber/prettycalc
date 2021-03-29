/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import JXGBoard from '@sswatson/jsxgraph-react-js'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'

const LENGTH = 0.4
const SPACING = 0.6

interface BoardData { className: string, equation: string, x: string, y: string, delta: number }

class Board extends React.Component<BoardData> {
  // brd has type https://jsxgraph.uni-bayreuth.de/docs/symbols/JXG.Board.html
  logicJs (brd: any): void {
    const delta = this.props.delta
    const slope: (params: { x: number, y: number }) => number = evaluatex(this.props.equation, {}, { latex: true })

    let start

    try {
      // console.log(slope({ x: evaluatex(this.props.x, {}, { latex: true })(), y: evaluatex(this.props.y, {}, { latex: true })() }))
      start = brd.create('point', [evaluatex(this.props.x, {}, { latex: true })(), evaluatex(this.props.y, {}, { latex: true })()], { withLabel: false, color: '#06A77D', fixed: true })
    } catch (e: any) {
      start = { X: () => 1, Y: () => 0 }
    }

    // [left, top, right, bottom]
    brd.setBoundingBox([start.X() - 5.5, start.Y() + 4.5, start.X() + 3.5, start.Y() - 4.5])

    // Renders slope field
    for (let x = Math.floor(start.X() - 10); x < start.X() + 10; x += SPACING) {
      for (let y = -10; y < 10; y += SPACING) {
        const slope = evaluatex(this.props.equation, {}, { latex: true })({ x, y })
        // console.log(slope)
        const angle = Math.atan(slope)
        brd.create('arrow', [[x, y], [x + LENGTH * Math.cos(angle), y + LENGTH * Math.sin(angle)]], { color: '#052F5F', opacity: 0.2, fixed: true })
      }
    }

    // Set up Euler method points
    // hex 005377
    // palette 052f5f,005377,06a77d,d5c67a,f1a208

    let x = start.X()
    let y = start.Y()
    let i = 0
    while (i < 20 && !isNaN(y) && Math.abs(y) !== Infinity) {
      x += delta
      if (!isNaN(y)) {
        const deltay = delta * evaluatex(this.props.equation, {}, { latex: true })({ x, y })
        y += deltay >= 200 * Math.pow(10, 200) ? 0 : deltay
        brd.create('point', [x, y], { color: '#005377', fixed: true, withLabel: false })
      }
      i++
    }
    x = start.X()
    y = start.Y()
    while (i > 0 && !isNaN(y) && Math.abs(y) !== Infinity) {
      x -= delta
      if (!isNaN(y)) {
        const deltay = delta * evaluatex(this.props.equation, {}, { latex: true })({ x, y })
        y -= deltay >= 200 * Math.pow(10, 200) ? 0 : deltay
        brd.create('point', [x, y], { color: '#005377', fixed: true, withLabel: false })
      }
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
        width: '100%',
        height: 0,
        paddingBottom: '100%',
        border: '1px solid black',
        borderRadius: '5px',
        showReload: true,
        margin: 'auto'
      }}
    />
    return board
  }
}

export default Board
