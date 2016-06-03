module.exports = function (options) {
  if (!options.domains && !options.domain) console.error('Must add a domain to wildcard-subdomains module options. Refer to docs.')

  return function (req, res, next) {
    var url = '/' + (options.namespace || 'sub') + '/'
    var domains = options.domains || [options.domain]
    var subdomains = []
    var ignoreWWW
    var host = req.hostname
    var delimeter = options.delimeter || '.'
    var domaini
    var domain
    var wwwi

    if (typeof options.www === 'undefined') {
      ignoreWWW = true
    } else {
      ignoreWWW = Boolean(options.www)
    }

    // check to see if it matches any domain
    for(var i in domains) {
      domaini = host.indexOf(domains[i])
      if(domaini === -1) continue
      domain = domains[i]
      break
    }
    // (domaini is the position of domain in the host)
    // if so, remove that section of the host
    if (domaini === -1) return next()
    subdomains = host.slice(0, domaini)

    // split on the period if any subdomains and remove blanks
    if (!subdomains) return next()
    subdomains = subdomains.split('.').filter(Boolean)

    // remove www if chosen to ignore
    if (ignoreWWW) {
      wwwi = subdomains.indexOf('www')
      if (wwwi >= 0) subdomains.splice(wwwi, 1)
    }

    // assign to request object
    if (!subdomains.length) return next()
    req._subdomains = subdomains

    // rebuild url
    url += subdomains.join(delimeter) + req.url

    // remove any double /'s (only if it exists, since it's expensive
    if (url.indexOf('//') >= 0) url.replace(/\/\//g, '/')

    // reassign url
    req.url = url

    // Q.E.D.
    next()
  }
}
