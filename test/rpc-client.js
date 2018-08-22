const path = require('path')
const grpc = require('grpc')
const builder = require('./builders/header')
const PROTO_PATH = path.join(__dirname, '../protos/root.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway

/**
 * RpcClient constructor
 * TODO: Add config
 *
 * @constructor
 */
function RpcClient() {
  this._headers = {}
}

/**
 * Set headers for client, that will be send to RPC SERVER
 * When perform a rpc request
 *
 * @param headers
 */
RpcClient.prototype.setHeaders = function (headers) {
  this._headers = headers
}

/**
 * Perform a rpc get request
 *
 * @param api
 * @returns {Promise<any>}
 */
RpcClient.prototype.get = function (api) {
  let self = this

  return new Promise(function (resolve, reject) {
    // Get GRPC client & request data
    let rpcServerHost = process.env.RPC_SERVER_HOST || 'localhost:50051',
      client = new gateway_proto.Gateway(rpcServerHost, grpc.credentials.createInsecure()),
      data = {
        route: api,
        // cookies: builder.parseCookie(cookieTest),
        headers: builder.parseHeader(self._headers)
      }

    // Send request
    client.get(data, function(err, response) {
      if (err) {
        reject(err)
      }

      // Resolve response
      resolve(JSON.parse(response.data).data)
    })
  })
}

module.exports = RpcClient
