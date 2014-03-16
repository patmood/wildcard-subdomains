module.exports.handler = function(req, res, next) {
  var namespace = 'sub'
    , subdomain = req.headers.host.split('.')[0]

  // console.log('Domain:', req.headers.host)
  // console.log('Url:', req.url)
  // console.log('Subdomain:', subdomain)

  if(!subdomain) return next();

  // console.log('Old Query:',req.url)
  req.url = '/' + namespace + '/' + subdomain + req.url
  // console.log('New Query:',req.url)

  next()
}
