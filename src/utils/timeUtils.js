const fullFormat = () => {
  const now = new Date()
  let time = now.getFullYear()
  time += ('0' + (now.getMonth() + 1)).slice(-2)
  time += ('0' + now.getDate()).slice(-2)
  time += ('0' + now.getHours()).slice(-2)
  time += ('0' + now.getMinutes()).slice(-2)
  time += ('0' + now.getSeconds()).slice(-2)
  time += now.getMilliseconds()
  return time
}

const gmtToJst = (gmtStr) => {
  const gmt = new Date(gmtStr + '+00:00')
  let time = gmt.getFullYear() + '/'
  time += ('0' + (gmt.getMonth() + 1)).slice(-2) + '/'
  time += ('0' + gmt.getDate()).slice(-2) + ' '
  time += ('0' + gmt.getHours()).slice(-2) + ':'
  time += ('0' + gmt.getMinutes()).slice(-2) + ':'
  time += ('0' + gmt.getSeconds()).slice(-2)
  return time
}

module.exports = {
  fullFormat,
  gmtToJst,
}
