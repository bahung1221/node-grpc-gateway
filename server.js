const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname,  './protos/helloworld.proto')
const hello_proto = grpc.load(PROTO_PATH).helloworld

/**
 * Implements the SayHello RPC method.
 */
function get(call, callback) {
  callback(null, {
    message: JSON.stringify(call.request.cookies)
  })
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Gateway.service, {get: get});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
