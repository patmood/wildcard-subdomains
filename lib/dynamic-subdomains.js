module.exports = function(options) {
  return function(req, res, next) {
    var namespace = options.namespace || 'sub'
      , domain = options.domain || ''
      , www = options.www || true
      , regex = new RegExp('(.|)' + domain + '.+')
      , subdomains = req.headers.host.replace(regex, '')

    // console.log('Subdomains (pre-split):', subdomains)

    if (subdomains) subdomains = subdomains.split('.')

    // console.log('================================')
    // console.log('Options:', options)
    // console.log('Host:', req.headers.host)
    // console.log('Url:', req.url)
    // console.log('Subdomains:', subdomains)
    // console.log('Old Query:',req.url)

    if(!subdomains) return next();

    if (subdomains[0] === 'www') {
      if (www) return res.redirect('http://' + req.headers.host.replace('www.','') + req.url)
      return next()
    } else {
      req.url = '/' + namespace + '/' + subdomains.join('/') + req.url
    }

    // console.log('New Query:',req.url)

    next()
  }
}

