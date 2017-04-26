import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/appState'
import { BARCHART_URL } from '../constants'
import { mapToRange } from '../utils/math'
import Chart from '../components/Chart'


class BarChart extends Component {
  componentWillMount() {
    this.props.fetchData(BARCHART_URL)
  }

  render() {
    const {
      isFetching,
      chartData,
    } = this.props

    // ensure we work with local data
    const data = chartData && chartData.data ? [...chartData.data] : []

    const chartWidth = window.innerWidth * 0.8
    const chartHeight = 300
    const barWidth = 20
    const barMargin = 5
    const stepWidth = barWidth + barMargin

    const { max, min } = data.reduce((range, bar) => {
      const value = bar[1]
      return {
        max: value > range.max ? value : range.max,
        min: value < range.min ? value : range.min,
      }
    }, { max: -Infinity, min: Infinity })

    const Bars = data.reverse().filter((bar, i) => i % 4 === 0)
      .map((bar, i) => (
        <rect
          key={i + '-bar'}
          width={barWidth}
          height={mapToRange(min, max, 0, chartHeight, bar[1])}
          x={stepWidth * i}
          y={chartHeight - mapToRange(min, max, 0, chartHeight, bar[1])}
        />
      ))

    return (
      <div>
        <h1 className="header L">BarChart</h1>
        <div className="chart">
          {
            isFetching ?
              <p>Data is being loaded...</p>
              :
              <Chart
                height={chartHeight}
                width={chartWidth}
              >
                {Bars}
              </Chart>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.appState.isFetching,
  chartData: state.appState.data,
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url) => dispatch(fetchData(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BarChart)
