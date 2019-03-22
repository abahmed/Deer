const glob = require('glob-fs')({ gitignore: false })
const fs = require('fs')
const jsdoc2md = require('jsdoc-to-markdown')

const files = glob.readdirSync('./app/**/*.{js,jsx}')
const docs = jsdoc2md.renderSync({ files: files })
fs.writeFileSync('docs/api.md', docs)
