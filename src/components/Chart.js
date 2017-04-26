import React from 'react'
import PropTypes from 'prop-types'

const Chart = (props) => {
  const {
    width,
    height,
    children,
  } = props

  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  )
}

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Chart
