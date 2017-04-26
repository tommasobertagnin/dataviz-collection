import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from '../actions/appState'
import { SCATTERPLOT_URL } from '../constants'
import { mapToRange } from '../utils/math'
import Chart from '../components/Chart'


class Scatterplot extends Component {
  componentWillMount() {
    this.props.fetchData(SCATTERPLOT_URL)
  }

  render() {
    const {
      isFetching,
      chartData,
    } = this.props

    // ensure we work with local data
    const data = chartData ? [...chartData] : []

    const chartWidth = window.innerWidth * 0.8
    const chartHeight = 300
    const dotRadius = 12

    const { max, min } = data.reduce((range, cyclist) => {
      const value = cyclist.Seconds
      return {
        max: value > range.max ? value : range.max,
        min: value < range.min ? value : range.min,
      }
    }, { max: -Infinity, min: Infinity })

    const Dots = data.map((cyclist, i) => (
      <circle
        key={i + '-dot'}
        r={dotRadius}
        cx={((chartWidth - dotRadius) / data.length) * cyclist.Place}
        cy={chartHeight - mapToRange(min, max, dotRadius, chartHeight - dotRadius, cyclist.Seconds)}
      />
    ))

    return (
      <div>
        <h1 className="header L">Scatterplot</h1>
        <div className="chart">
          {
            isFetching ?
              <p>Data is being loaded...</p>
              :
              <Chart
                height={chartHeight}
                width={chartWidth}
              >
                {Dots}
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

export default connect(mapStateToProps, mapDispatchToProps)(Scatterplot)
