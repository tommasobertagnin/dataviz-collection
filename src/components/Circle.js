import React from 'react'
import PropTypes from 'prop-types'

const Circle = ({
  align,
  radius,
  position,
  style,
}) => {

  return (
    <circle
      cx={position.x}
      cy={position.y}
      r={radius}
      style={style ? style : {}}
    />
  )
}

export default Circle
