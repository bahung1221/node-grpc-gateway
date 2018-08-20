const path = require('path')
const grpc = require('grpc')
const builder = require('./builders/cookie')
const PROTO_PATH = path.join(__dirname, '../protos/root.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway
let rpcClient = {}
let cookieTest = 'Idea-4d1f50f9=1889c34e-5240-47d4-9766-231f9ba9eedc; _ga=GA1.1.16325481.1527222890; lang=en; fxoncomgrandprint[key]=ddaf6b8aab2556a64226c3d9eb646e91; sxt=eyJpdiI6IkFUcTQ4c1phMWZoUjIyV0ZPd21lSWc9PSIsInZhbHVlIjoicTRzRFhBS0pEUjcwYUdqWTRtUUMzUjNcL0czTjJcL0d6dFRiWk5JOThHV0' +
  'lwUE1xampqbDBmWnpUXC9FaDdOY0kweDlpQU8rRTJzcGlSeWc3NGN1NUFtTUE9PSIsIm1hYyI6ImExNjg0NDQxZjAzNGIwYWRjZmI1NWM3NDAzMzRjY2RjOTE3NjcwN2UxYTRlY2U5N2U5NzBlMzg3Njk4NDE1ODcifQ%3D%3D'
let headers = {
  'cache-control': 'max-age=0',
  'referer': 'http://localhost:7080/tools/indicators/5991',
  cookie: cookieTest
}
function get(api) {
  return new Promise(function (resolve, reject) {
    let rpcServerHost = process.env.RPC_SERVER_HOST || 'localhost:50051',
      client = new gateway_proto.Gateway(rpcServerHost, grpc.credentials.createInsecure()),
      data = {
        route: api,
        // cookies: builder.parseCookie(cookieTest),
        headers: builder.parseHeader(headers)
      }

    client.get(data, function(err, response) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(response.data))
    })
  })
}

module.exports = {
  get: get
}
