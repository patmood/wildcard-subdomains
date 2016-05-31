wildcard-subdomains
==================

Handle dynamic/wildcard subdomains in Express.js. Perfect for when you have customized subdomains for different users, and need to handle them within your Node app.

Requests to `kitty.yourdomain.com` can be handled with using the route `/sub/subdomain`

Query strings and paths remain intact. For example:

`kitty.yourdomain.com/lol/cat` can be handled with using the route `/sub/kitty/lol/cat`

Dependency free!

## How to use

Require the module in app.js:

`var subdomain = require('wildcard-subdomains')`

Use the module in middleware:

`app.use(subdomain(options))`

Options include domain (required), namespace (optional, default = 'sub'), www (optional, default = true). By default, requests starting with www will be redirected to their non-www equivalent. Set to false to handle the www requests manually. Example:

```
app.use(subdomain({
  domain: 'vcap.me'
, namespace: 's'
, www: 'false'
}))
```

Handle the new route for your subdomain, for example `kitty.yourdomain.com` would be handled with:

```
app.get('/sub/kitty/', function(req, res){
  res.send("Meow!")
})
```

## Protip

For testing subdomains locally, use the domain `vcap.me:3000`

This is a domain that points back to your local host, allowing you to test subdomains like `foobar.vcap.me`

##TODO
- add tests
- remove console logs when ready for production
- add license
- Add example and npm ignore
