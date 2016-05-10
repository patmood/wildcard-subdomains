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

If you need to use wildcard with any subdomain (*.mydomain.com) , use this code:
```
// Indicate namespace to be replaced for routing
app.use(subdomain({
  domain: 'vcap.me'
, namespace: 'subdomain'
, www: 'false'
}))

// Add route with new path
app.get('/subdomain/:subdomain/',function(req, res){
    // This objects is injected to req to store subdomains data
    var subs = req.subdomain.subs;
    res.send('Subdomains comma separated : ' + subs);
});

```

With this code you will be able to use any subdomain.


## Protip

For testing subdomains locally, use the domain `vcap.me:3000`

This is a domain that points back to your local host, allowing you to test subdomains like `foobar.vcap.me`

##TODO
- add tests
- remove console logs when ready for production
