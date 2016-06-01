var test = require('tape')
var request = require('supertest')
var express = require('express')
var wildcardSubdomains = require('../')

test('default subdomain namespace', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
  }))

  app.get('/sub/cat', function (req, res) {
    res.end(req.hostname)
  })

  t.plan(1)
  request(app)
    .get('/')
    .set('Host', 'cat.test.com')
    .expect('cat.test.com')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('custom namespace', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
    // www: 'false',
  }))

  app.get('/s/cat', function (req, res) {
    res.end(req.hostname)
  })

  t.plan(1)
  request(app)
    .get('/')
    .set('Host', 'cat.test.com')
    .expect('cat.test.com')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('ignore www', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
    www: true,
  }))

  app.get('/', function (req, res) {
    res.end(req.hostname)
  })

  t.plan(1)
  request(app)
    .get('/')
    .set('Host', 'www.test.com')
    .expect('www.test.com')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})
