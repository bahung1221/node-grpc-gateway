function parseCookie(cookies) {
  if (typeof cookies !== 'string') {
    return []
  }

  let cookieArr = cookies.split('; '),
    res = []

  for (let index in cookieArr) {
    let el = cookieArr[index].split('='),
      key = el[0] || '',
      value = el[1] || '',
      cookie = {}

    cookie[key] = value

    res.push({cookie: cookie})
  }

  return res
}

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
  parseCookie: parseCookie,
  parseHeader: parseHeader
}
