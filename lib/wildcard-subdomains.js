module.exports = function (options) {
  return function (req, res, next) {
    var path = '/' + (options.namespace || 'sub') + '/'
    var subdomains = req.subdomains
    var ignoreWWW = true
    var host = req.hostname

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

    // rebuild url
    path += subdomains.join('/') + req.url

    // reassign url
    req.url = path

    // Q.E.D.
    next()
  }
}
