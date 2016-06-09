var url = require('url')

module.exports = function (options) {
  return function (req, res, next) {
    options = options || {}
    var path = '/' + (options.namespace || '_sub') + '/'
    var ignoreWWW = true
    var ignoreWithStartPath = options.ignoreWithStartPath ||  ''
    var subdomains = req.subdomains
    var host = req.hostname

    // If you want to handle the www subdomain differently
    if (options.www === false) {
      ignoreWWW = false
    }

    // remove www if chosen to ignore
    if (ignoreWWW) {
      var wwwi = subdomains.indexOf('www')
      if (wwwi >= 0) subdomains.splice(wwwi, 1)
    }
    
    // continue if no subdomains
    if (!subdomains.length) return next()
    
    if(ignoreWithStartPath !== ''){
      if(url.parse(req.url).path.split('/')[1] === ignoreWithStartPath) return next();
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
