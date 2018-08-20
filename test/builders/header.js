function parseHeader(headers) {
  let res = []

  for (let index in headers) {
    let header = {}
    console.log(index)
    console.log(headers[index])
    header[index] = headers[index]

    res.push({header: header})
  }

  return res
}
