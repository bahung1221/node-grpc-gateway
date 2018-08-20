const rpc = require('./rpc-client')

rpc.get('api/surface/communities?productId=625')
  .then(res => {
    console.log(res)
  })
