const fs = require('fs')
const path = require('path')

module.exports = absolutePath => {
  const ext = path.extname(absolutePath)
  const pathWExt = ext === 'graphql' ? absolutePath : `${absolutePath}.graphql`
  return fs.readFileSync(pathWExt, 'utf8')
}