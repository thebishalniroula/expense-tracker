export function formatNumber(number: number) {
  if (number >= 10000000) {
    return (number / 10000000).toFixed(2) + ' C'
  } else if (number >= 100000) {
    return (number / 100000).toFixed(2) + ' L'
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + ' K'
  } else {
    return number.toString()
  }
}
