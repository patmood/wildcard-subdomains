var express = require('express')
var app = express()
var wildcardSubdomains = require('../')

app.use(wildcardSubdomains())

app.get('/', function (req, res) {
  res.send('Visit <a href="http://foo.vcap.me:5555">http://foo.vcap.me:5555</a> (points back to localhost)')
})

app.get('/_sub/bar/foo', function (req, res) {
  res.end(
    'Subdomains: ' +
    JSON.stringify(req.subdomains) +
    '\n' +
    'Original Url: ' +
    req.originalUrl +
    '\n' +
    'New Url: ' +
    req.url +
    '\n' +
    'Query string: ' +
    JSON.stringify(req.query)
  )
})

// Generous matching
app.get('/_sub/:firstSubdomain/*', function (req, res) {
  res.end(
    'First Subdomain: ' +
    req.params.firstSubdomain +
    '\n' +
    'Original Url: ' +
    req.originalUrl +
    '\n' +
    'New Url: ' +
    req.url +
    '\n' +
    'Query string: ' +
    JSON.stringify(req.query)
  )
})

app.listen(5555)
console.log('Example started on port 5555')
console.log('============================')
console.log('To test subdomain routing, visit these urls in your browser:')
console.log('http://test.vcap.me:5555/')
console.log('http://another.test.vcap.me:5555/')
