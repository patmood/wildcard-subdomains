wildcard-subdomains
==================

[![Build Status](https://travis-ci.org/patmood/wildcard-subdomains.svg?branch=master)](https://travis-ci.org/patmood/wildcard-subdomains) [![npm version](https://badge.fury.io/js/wildcard-subdomains.svg)](https://badge.fury.io/js/wildcard-subdomains)

Handle dynamic/wildcard subdomains in Express.js. Perfect for when you have customized subdomains for different users, and need to handle them within your Node app.

Requests to `foo.yourdomain.com` can be handled with using the route `/_sub/:subdomain`

Paths and query strings and paths remain intact. For example:

`foo.yourdomain.com/post/cat?oh=hai` can be handled with using the route `/_sub/foo/post/cat?oh=hai`

Dependency free!

## How to use

Require the module in app.js:

`var wildcardSubdomains = require('wildcard-subdomains')`

Use the module in middleware:

`app.use(wildcardSubdomains(opts))`

### `opts` - Object
| Key       | Type            | Default  | Description            |
| --------- | --------------- | -------- | ---------------------- |
| namespace | String          | `'_sub'` | Prepended to the path  |
| whitelist | String or Array | `['www']`| Subdomains to ignore   |

Example options:

```
app.use(wildcardSubdomains({
  namespace: 's',
  whitelist: ['www', 'app'],
}))
```

Handle the new route for your subdomain, for example `foo.yourdomain.com` would be handled with:

```
app.get('/s/foo/', function(req, res){
  res.send("Meow!")
})
```

By using the `whiteList` option, requests to `app.yourdomain.com` and `www.yourdomain.com` will be ignored and handled normally.

## Example

`npm run example`

Or check the `examples` directory in this repo

## Protip

For testing subdomains locally, use the domain `vcap.me:3000`

This is a domain that points back to your localhost, allowing you to test subdomains like `foobar.vcap.me`

Running your app behind a proxy? You'll likely need to set the appropriate [trust proxy](http://expressjs.com/en/guide/behind-proxies.html) in express
