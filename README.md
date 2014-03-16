wildcard-subdomains
==================

Handle dynamic/wildcard subdomains in Express.js. Perfect for when you have customized subdomains for different users, and need to handle them within your Node app.

Requests to `kitty.yourdomain.com` can be handled with using the route `/sub/subdomain`

Query strings and paths remain intact. For example:

`kitty.yourdomain.com/lol/cat` can be handled with using the route `/sub/kitty/lol/cat`

##TODO
- add options to set domain for matching multiple subdomains (eg a.b.c.whatever.com)
- add ability to customize namespace
- add tests
- remove console logs when ready for production
