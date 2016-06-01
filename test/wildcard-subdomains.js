var test = require('tape')
var request = require('supertest')
var express = require('express')
var wildcardSubdomains = require('../')({ domain: 'test.com' })

var app = express()
app.use(wildcardSubdomains)
app.get('/', function (req, res){
  res.end(req.hostname)
})

test('request test', function (t) {
  t.plan(1)
  request(app)
    .get('/')
    .set('Host', 'test.com')
    .expect('test.com')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})
