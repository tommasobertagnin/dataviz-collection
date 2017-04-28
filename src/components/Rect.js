import React from 'react'
import PropTypes from 'prop-types'

const Rect = ({
  align,
  height,
  position,
  style,
  width,
}) => {
  if (align && position && width && height) {
    switch (align) {
    case 'CENTER':
      position = {
        x: position.x - width/2,
        y: position.y - height/2,
      }
      break

    case 'BOTTOM-LEFT':
      position = {
        x: position.x,
        y: position.y - height,
      }
      break

    case 'BOTTOM-RIGHT':
      position = {
        x: position.x - width,
        y: position.y - height,
      }
      break

    case 'TOP-RIGHT':
      position = {
        x: position.x - width,
        y: position.y,
      }
      break
    }
  }

  return (
    <rect
      x={position ? position.x : 0}
      y={position ? position.y : 0}
      height={height || 10}
      width={width || 10}
      style={style ? style : {}}
    />
  )
}

export default Rect
