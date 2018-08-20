function parseHeader(headers) {
  let res = []

  for (let index in headers) {
    let header = {}
    header[index] = headers[index]

    res.push({header: header})
  }

  return res
}

module.exports = {
  parseHeader: parseHeader
}
