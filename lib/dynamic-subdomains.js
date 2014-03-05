var domain

module.exports.options = function(options) {
  domain = options.domain
}

module.exports.handler = function(req, res, next) {
  var regexString = '/(^\w+).' + domain + '/'
  var regex = new RegExp(regexString, 'i')
  var subdomain = req.headers.host.match(regex)
  console.log('Subdomain:', subdomain)
  next()
}
