/* eslint-disable react/jsx-key */
import React from 'react'
import Table from 'react-bootstrap/Table'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import equal from 'fast-deep-equal'

interface Props { data: { equation: string, x: string, y: string, delta: number }}
interface Data { n: number, x: number, y: number, slope: number, delta: number, dy: number }

class ETable extends React.Component<Props, { data: { data: Data[], valid: boolean } }> {
  constructor (props: Props) {
    super(props)
    this.state = {
      data: this.createData()
    }
  }

  componentDidUpdate (prevProps: Props): void {
    if (!equal(prevProps, this.props)) {
      this.setState({ data: this.createData() })
    }
  }

  createData (): { data: Data[], valid: boolean } {
    let valid = true
    const eq = this.props.data
    const delta = eq.delta
    let fx = 0
    let fy = 0
    try {
      fx = evaluatex(eq.x, {}, { latex: true })()
      fy = evaluatex(eq.y, {}, { latex: true })()
    } catch (e) {
      valid = false
    }

    const slope: (params: { x: number, y: number }) => number = evaluatex(eq.equation, {}, { latex: true })

    const arr: Data[] = []
    let i = 0
    let x = fx
    let y = fy
    while (i <= 1 / eq.delta) {
      try {
        x = parseFloat((i === 0 ? x : x + delta).toFixed(3))
        const dydx = parseFloat((slope({ x, y }).toFixed(3)))
        y = parseFloat((i === 0 ? y : dydx * delta + arr[i - 1].y).toFixed(3))
        const nextslope = parseFloat((slope({ x: x + delta, y }).toFixed(3)))
        arr.push({ x, y, delta, slope: dydx, n: i + 1, dy: parseFloat((nextslope * delta).toFixed(3)) })
      } catch (e: any) {
        valid = false
        break
      }
      i++
    }
    return { data: arr, valid }
  }

  render (): JSX.Element {
    const data: Data[] = this.state.data.data

    const columns: Array<{ Header: string, accessor: keyof Data }> = [
      {
        Header: 'x',
        accessor: 'x'
      },
      {
        Header: 'y',
        accessor: 'y'
      },
      {
        Header: 'dy/dx',
        accessor: 'slope'
      },
      {
        Header: '∆x',
        accessor: 'delta'
      },
      {
        Header: '∆y',
        accessor: 'dy'
      }
    ]

    return this.state.data.valid
      ? (
    <Table>
      <thead>
        {
          <tr>
            {
              columns.map((column, i) => (
                <th key={`head-${i}`}>
                  {column.Header}
                </th>
              ))
            }
          </tr>
        }
      </thead>
      <tbody>
        {
          data.map((row, i) => {
            return (
              <tr key={`row-${i}`}>
                {
                  columns.map((column, j) => (
                    <td key={`col-${j}`}>
                      {row[column.accessor]}
                    </td>
                  ))
                }
              </tr>
            )
          })
        }
      </tbody>
    </Table>
        )
      : <p className='error'>This function is not defined at your starting point. Try changing the initial condition!</p>
  }
}

export default ETable
