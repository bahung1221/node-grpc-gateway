const path = require('path')
const grpc = require('grpc')
const logger = require('morgan')
const PROTO_PATH = path.join(__dirname,  './protos/root.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway
const http = require('./services/http')
const builder = require('./services/builders')
const baseUrl = process.env.MYPAGE_HOST || 'http://127.0.0.1:8000/'

// Logger for development
logger('dev')

/**
 * Implements the get RPC method.
 */
async function get(call, callback) {
  let request = call.request,
    cookies = request.cookies,
    headers = request.headers,
    parsedCookies = builder.cookie.parseCookies(cookies),
    parsedHeaders = builder.header.parseHeaders(headers)

  // Add cookies into headers
  parsedHeaders.Cookie = parsedCookies

  // Get response
  let res

  try {
    res = await http.get(`${baseUrl}${request.route}`, {
      headers: parsedHeaders
    })
  } catch (e) {
    console.error(e)
  }

  // Response to client
  callback(null, {
    data: JSON.stringify(res)
  })
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function runServer() {
  let server = new grpc.Server()
  server.addService(gateway_proto.Gateway.service, {get: get})
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

runServer()
