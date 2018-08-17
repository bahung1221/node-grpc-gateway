const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, '../protos/root.proto')
const hello_proto = grpc.load(PROTO_PATH).helloworld

function main() {
  let client = new hello_proto.Gateway('localhost:50051',
    grpc.credentials.createInsecure()),
    data = {
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
    console.log(response)
  })
}

main();
