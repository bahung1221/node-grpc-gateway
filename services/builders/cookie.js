/**
 * Receive protobuf conditions object,
 * then response a standard conditions object
 *
 * @param cookies
 */
function parseCookies(cookies) {
  let str = ''

  // Loop over conditions array and mapping all element into general object
  for (let index in cookies) {
    let el = cookies[index]

    // If element is valid, assign it into general object
    if (el.cookie) {
      str += Object.keys(el.cookie)[0] + '=' + Object.values(el.cookie)[0] + '; '
    }
  }
  return str
}

module.exports = {
  parseCookies: parseCookies
}
