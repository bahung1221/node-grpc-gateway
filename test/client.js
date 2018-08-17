const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, '../protos/root.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway

function main() {
  let client = new gateway_proto.Gateway('localhost:50051',
    grpc.credentials.createInsecure()),
    data = {
      route: 'api/surface/communities?productId=5991',
      cookies: [
        {
          cookie: {uname: 'hung'}
        },
        {
          cookie: {uid: '1'}
        }
      ],
      headers: [
        {
          header: {h1: 'header 1 ne'}
        },
        {
          header: {h2: 'header 2 ne'}
        }
      ]
  }

  client.get(data, function(err, response) {
    console.log('Greeting:')
    console.log(JSON.parse(response.data))
  })
}

main();
