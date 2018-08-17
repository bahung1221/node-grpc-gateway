const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto')
const hello_proto = grpc.load(PROTO_PATH).helloworld

function main() {
  let client = new hello_proto.Gateway('localhost:50051',
    grpc.credentials.createInsecure()),
    data = {
      name: 'Hung ne',
      cookies: [
        {
          cookie: {uname: 'hung'}
        },
        {
          cookie: {uid: '1'}
        }
      ]
  }

  client.get(data, function(err, response) {
    console.log('Greeting:')
    console.log(response)
  })
}

main();
