const RpcClient = require('./rpc-client')

// Mock request cookies and headers for test
let cookies = 'Idea-4d1f50f9=1889c34e-5240-47d4-9766-231f9ba9eedc; _ga=GA1.1.16325481.1527222890; lang=en; fxoncomgrandprint[key]=ddaf6b8aab2556a64226c3d9eb646e91; sxt=eyJpdiI6IkFUcTQ4c1phMWZoUjIyV0ZPd21lSWc9PSIsInZhbHVlIjoicTRzRFhBS0pEUjcwYUdqWTRtUUMzUjNcL0czTjJcL0d6dFRiWk5JOThHV0' +
  'lwUE1xampqbDBmWnpUXC9FaDdOY0kweDlpQU8rRTJzcGlSeWc3NGN1NUFtTUE9PSIsIm1hYyI6ImExNjg0NDQxZjAzNGIwYWRjZmI1NWM3NDAzMzRjY2RjOTE3NjcwN2UxYTRlY2U5N2U5NzBlMzg3Njk4NDE1ODcifQ%3D%3D'
let headers = {
  'cache-control': 'max-age=0',
  'referer': 'http://localhost:7080/tools/indicators/5991',
  cookie: cookies
}

let client = new RpcClient()
client.setHeaders(headers)
client.get('api/surface/communities?productId=625')
  .then(res => {
    console.log(res)
  })
