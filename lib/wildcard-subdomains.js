module.exports = function(options) {
  if (!options.domains && !options.domain) console.error('Must add a domain to wildcard-subdomains module options. Refer to docs.')

  return function(req, res, next) {
    var url = '/' + (options.namespace || 'sub') + '/'
      , domains = options.domains || [options.domain]
      , ignoreWWW = options.www || true // TODO: this is never false!
      , host = req.headers.host
      , delimeter = options.delimeter || '.'
      , domaini, domain, subdomains, wwwi

    // check to see if it matches any domain
    for(i in domains) {
      domaini = host.indexOf(domains[i])
      if(domaini == -1) continue
      domain = domains[i]
      break
    }
    // (domaini is the position of domain in the host)
    // if so, remove that section of the host
    if (domaini == -1) return next()
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
    if (!subdomains.length) return next();
    req.subdomains = subdomains

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
