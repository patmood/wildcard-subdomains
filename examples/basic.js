var express = require('express')
var app = express()
var wildcardSubdomains = require('../')

app.use(wildcardSubdomains({
  domain: 'vcap.me',
  namespace: 's',
}))

app.get('/', function (req, res) {
  res.end('root')
})

app.get('/s/:subdomain', function (req, res) {
  res.end('Subdomain: ' + req.params.subdomain)
})

app.listen(5555)
console.log('Example started on port 5555, visit http://test.vcap.me:5555/')
