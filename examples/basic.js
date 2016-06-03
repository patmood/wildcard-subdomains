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

app.get('/s/:firstSubdomain/:secondSubdomain?', function (req, res) {
  res.end('First Subdomain: ' + req.params.firstSubdomain + ' Second Subdomain: ' + req.params.secondSubdomain)
})

app.listen(5555)
console.log('Example started on port 5555')
console.log('============================')
console.log('To test subdomain routing, visit these urls in your browser:')
console.log('http://test.vcap.me:5555/')
console.log('http://another.test.vcap.me:5555/')
