export const mapToRange = (min, max, outMin, outMax, value) => {
  return (value-min)/(max-min) * (outMax-outMin) + outMin
}
