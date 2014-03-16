wildcard-subdomains
==================

Handle dynamic/wildcard subdomains in Express.js. Perfect for when you have customized subdomains for different users, and need to handle them within your Node app.

Requests to `kitty.yourdomain.com` can be handled with using the route `/sub/subdomain`

Query strings and paths remain intact. For example:

`kitty.yourdomain.com/lol/cat` can be handled with using the route `/sub/kitty/lol/cat`

## How to use

Require the module in app.js:

`var subdomain = require('wildcard-subdomains')`

Use the module in middleware:

`app.use(subdomain.handler)`

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
- add options to set domain for matching multiple subdomains (eg a.b.c.whatever.com)
- add ability to customize namespace
- add tests
- remove console logs when ready for production
