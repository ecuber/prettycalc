/* eslint-disable react/jsx-key */
import React from 'react'
import Table from 'react-bootstrap/Table'
import evaluatex from '@ecuber/evaluatex/dist/evaluatex'
import equal from 'fast-deep-equal'

interface Props { data: { equation: string, x: string, y: string, delta: number }}
interface Data { n: number, x: number, y: number, slope: number, delta: number, dy: number }

class ETable extends React.Component<Props, { data: Data[]}> {
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

  createData (): Data[] {
    const eq = this.props.data
    const delta = eq.delta
    const fx: number = evaluatex(eq.x)()
    const fy: number = evaluatex(eq.y)()
    const slope: (params: { x: number, y: number }) => number = evaluatex(eq.equation)

    const arr: Data[] = []
    let i = 0
    let x = fx
    let y = fy
    while (i < 1 / eq.delta) {
      x = parseFloat((i === 0 ? x : x + delta).toFixed(3))
      const dydx = parseFloat((slope({ x, y }).toFixed(3)))
      y = parseFloat((i === 0 ? y : dydx * delta + arr[i - 1].y).toFixed(3))
      arr.push({ x, y, delta, slope: dydx, n: i + 1, dy: parseFloat((dydx * delta).toFixed(3)) })
      i++
    }
    return arr
  }

  render (): JSX.Element {
    const data: Data[] = this.state.data

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

    return (
    <Table>
      <thead>
        {
          <tr>
            {
              columns.map(column => (
                <th>
                  {column.Header}
                </th>
              ))
            }
          </tr>
        }
      </thead>
      <tbody>
        {
          data.map(row => {
            return (
              <tr>
                {
                  columns.map(column => (
                    <td>
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
  }
}

export default ETable
