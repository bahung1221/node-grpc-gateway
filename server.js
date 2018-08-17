const path = require('path')
const grpc = require('grpc')
const logger = require('morgan')
const PROTO_PATH = path.join(__dirname,  './protos/root.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway
const http = require('./services/http')
const builder = require('./services/builders')

logger('dev')

/**
 * Implements the get RPC method.
 */
function get(call, callback) {
  let request = call.request,
    conditions = request.conditions,
    cookies = request.cookies,
    headers = request.headers

  let req = {
    route: request.route,
    conditions: builder.condition.parseConditions(conditions),
    cookies: builder.cookie.parseCookies(cookies),
    headers: builder.header.parseHeaders(headers)
  }

  console.log(req)

  callback(null, {
    data: JSON.stringify(req)
  })
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(gateway_proto.Gateway.service, {get: get});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
