module.exports = function (options) {
  options = options || {}
  var path = '/' + (options.namespace || '_sub') + '/'

  // Support previous `www` boolean option
  var whitelist = options.www === false ? [] : ['www']

  if (typeof options.whitelist === 'string') {
    whitelist = [options.whitelist]
  } else if (Array.isArray(options.whitelist)) {
    whitelist = options.whitelist
  }

  return function (req, res, next) {
    var subdomains = req.subdomains
    var host = req.hostname

    var inWhitelist = whitelist.some(function(subdomain) {
      var i = subdomains.indexOf(subdomain)
      return i > -1
    })

    var tmpURL = req.url

    if (inWhitelist) return next()

    // continue if no subdomains
    if (!subdomains.length) return next()

    // rebuild url
    req.url = path + subdomains.join('/') + req.url

    // override url when more than one level sub domain eg: .co.id
    if (subdomains.length > 1) {
      req.url = path + subdomains[parseInt(subdomains.length)-1] + tmpURL
    }
    // Q.E.D.
    next()
  }
}
