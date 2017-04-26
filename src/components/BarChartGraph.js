import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chart extends Component {
  constructor() {
    super()
    this.state = {
      offset: 0,
      selectedItem: null,
      selectedItemIndex: 0,
      data: []
    }
  }

  changeOffset(amount) {
    const offset = this.state.offset + amount
    const maxOffset = this.refs.chart.getBBox().width - this.props.width + 20

    if (offset > maxOffset) {
      return this.setState({ offset: maxOffset })
    }
    else if (offset < 0) {
      return this.setState({ offset: 0 })
    }
    this.setState({ offset })
  }

  highlightItem(selectedItem, selectedItemIndex) {
    this.setState({ selectedItem, selectedItemIndex })
  }

  render() {
    if (!this.state.data.length) {
      return <div>loading...</div>
    }

    const {
      width,
      height,
      children,
      moveH,
    } = this.props

    // local copy of data
    let data = [...this.props.data]

    // skip items? change % ...
    data = data.filter((item, i) => {
      if (i % 4 === 0) {
        return item
      }
    })

    // extract max and min values from the data
    const { max, min } = data.reduce((range, item) => {
      const value = item[1]
      return {
        max: value > range.max ? value : range.max,
        min: value < range.min ? value : range.min,
      }
    }, { max: 0, min: 0 })

    // some variables to manage the chart rendering
    const margin = 10
    const barWidth = 25
    const barMargin = 5
    const hStep = barWidth + barMargin
    const labelAreaBottom = 20
    const labelAreaSide = 0
    const chartHeight = height - labelAreaBottom
    const labelSize = 13

    // generate the vertical bar elements
    const bars = data.map((item, i, items) => {
      const barHeight = Math.floor(((chartHeight  - labelAreaBottom) * item[1]) / max)
      const growth = i > 1 ? item[1] > items[i-1][1] : true
      return (
        <g key={i}>
          <rect
            x={margin + hStep * i}
            y={chartHeight - barHeight}
            width={barWidth}
            height={barHeight}
            fill={growth ? 'url(#diagonalHatch)' : 'url(#diagonalHatchDown)'}
          />
          <rect
            x={margin + hStep * i}
            width={barWidth}
            height={height - labelAreaBottom}
            fill="black"
            opacity={ this.state.selectedItemIndex === i ? 0.08 : 0}
            onMouseOver={() => this.highlightItem(item, i)}
          />
        </g>
      )
    })

    // generate the horizontal lables below the chart
    const hLables = data.map((item, i) => {
      if (i % 3 === 0) {
        return (
          <text
            key={i}
            x={margin + hStep * i}
            y={height}
            fontFamily="Helvetica Neue"
            fontSize={labelSize}
            fontWeight="900"
          >
            {item[0].match(/^\d+/)}
          </text>
        )
      }
    })
    
    // render the chart elements
    return (
      <div>
        <h1>Gross Domestic Product &mdash; United States</h1>
        {
          this.state.selectedItem ? 
            <h2>in {
              this.state.selectedItem[0].replace(/-.+$/, '')
              } GDP was {
                this.state.selectedItem[1].toLocaleString()
                } Billion $
            </h2>
            : ''
        }
        <svg width={width} height={height}>
          <path d={`M${labelAreaSide} 1 H ${width}`} stroke="black" strokeWidth="2"/>
          <path d={`M${labelAreaSide} ${height - labelAreaBottom + 1} H ${width}`} stroke="black" strokeWidth="2"/>
          <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect x="0" y="0" width="4" height="4" fill="teal" />
            <path d="M-1,1 l2,-2
                    M0,4 l4,-4
                    M3,5 l2,-2" 
                  style={{
                    stroke: 'white',
                    strokeWidth: 1
                  }} />
          </pattern>
          <pattern id="diagonalHatchDown" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect x="0" y="0" width="4" height="4" fill="magenta" />
            <path d="M3,-1 l2,2
                    M0,0 l4,4
                    M-1,3 l2,2" 
                  style={{
                    stroke: 'white',
                    strokeWidth: 1
                  }} />
          </pattern>
          <svg
            width={width - labelAreaSide}
            height={height}
            ref="chart"
          >
            <g transform={`translate(${-this.state.offset})`}>
              {bars}
              {hLables}
            </g>
          </svg>
        </svg>
        <div className="chart-controls">
          <button
            title="see previous years"
            onClick={() => this.changeOffset(-180)}
          >
            &larr;
          </button>
          <button
            title="see next years"
            onClick={() => this.changeOffset(180)}
          >
            &rarr;
          </button>
        </div>
      </div>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Chart
