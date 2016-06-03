var test = require('tape')
var xtest = function () {}
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

test('strip www', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
    www: true,
  }))

  app.get('/', function (req, res) {
    res.end(req.hostname)
  })

  app.get('/s/cat', function (req, res) {
    res.end('cat')
  })

  t.plan(2)
  request(app)
    .get('/')
    .set('Host', 'www.test.com')
    .expect('www.test.com')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })

  request(app)
    .get('/')
    .set('Host', 'cat.test.com')
    .expect('cat')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('handle www', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
    www: false,
  }))

  app.get('/', function (req, res) {
    res.end(req.hostname)
  })

  app.get('/s/cat', function (req, res) {
    res.end('cat')
  })

  app.get('/s/www', function (req, res) {
    res.end('custom www handler')
  })

  t.plan(2)
  request(app)
    .get('/')
    .set('Host', 'www.test.com')
    .expect('custom www handler')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })

  request(app)
    .get('/')
    .set('Host', 'cat.test.com')
    .expect('cat')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('wildcard subdomains', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
  }))

  app.get('/s/:subdomain', function (req, res) {
    res.end(req.params.subdomain)
  })

  t.plan(2)
  request(app)
    .get('/')
    .set('Host', 'cat.test.com')
    .expect('cat')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })

  request(app)
    .get('/')
    .set('Host', 'js.test.com')
    .expect('js')
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('multiple subdomains', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
  }))

  app.get('/s/cat/dog', function (req, res) {
    res.json(req.subdomains)
  })

  t.plan(1)
  request(app)
    .get('/')
    .set('Host', 'dog.cat.test.com')
    .expect(['cat', 'dog'])
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})

test('subdomain array in request', function (t) {
  var app = express()
  app.use(wildcardSubdomains({
    domain: 'test.com',
    namespace: 's',
  }))

  app.get('/s/:firstSubdomain/:secondSubdomain?', function (req, res) {
    res.json(req.subdomains)
  })

  t.plan(2)
  request(app)
    .get('/')
    .set('Host', 'dog.cat.test.com')
    .expect(['cat', 'dog'])
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })

  request(app)
    .get('/')
    .set('Host', 'single.test.com')
    .expect(['single'])
    .end(function (err, res) {
      if (err) return t.fail(err)
      t.pass('pass')
    })
})
