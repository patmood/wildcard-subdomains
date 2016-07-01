var url = require('url')

module.exports = function (options) {
  return function (req, res, next) {
    options = options || {}
    var path = '/' + (options.namespace || '_sub') + '/'
    var ignore = options.ignore ||  ''
    var subdomains = req.subdomains
    var host = req.hostname
    
    // continue if no subdomains
    if (!subdomains.length) return next()
    
    if(ignore !== ''){
      if(url.parse(req.url).path.split('/')[1] === ignore) return next();
    }

    // rebuild url
    path += subdomains.join('/') + req.url

    // TODO: check path and query strings are preserved
    // reassign url
    req.url = path

    // Q.E.D.
    next()
  }
}
