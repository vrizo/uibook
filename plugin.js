let SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
let MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
let fs = require('fs')

var trimSlashes = function (string) {
  return string.replace(/^\/+|\/+$/g, '')
}

var checkChunkExclusion = function (compilerOptions) {
  if (!compilerOptions) return true
  if (!compilerOptions.plugins) return true

  let htmlPlugin = compilerOptions.plugins.find(function (i) {
    return i.constructor && i.constructor.name === 'HtmlWebpackPlugin'
  })

  if (htmlPlugin && htmlPlugin.options) {
    let exclude = htmlPlugin.options.excludeChunks
    if (!exclude || exclude.indexOf('uibook') === -1) {
      return false
    }
  }
  return true
}

class UibookPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    let options = this.options
    let isChunkExcluded = checkChunkExclusion(compiler.options)

    compiler.plugin('entry-option', function (context, entry) {
      let controllerPath = options.controller

      let itemToPlugin = function (item, name) {
        if (Array.isArray(item)) {
          return new MultiEntryPlugin(context, item, name)
        } else {
          return new SingleEntryPlugin(context, item, name)
        }
      }

      if (typeof entry === 'string' || Array.isArray(entry)) {
        entry = {
          main: entry,
          uibook: controllerPath
        }
      } else {
        entry['uibook'] = controllerPath
      }

      Object.keys(entry).forEach(function (name) {
        compiler.apply(itemToPlugin(entry[name], name))
      })

      return true
    })

    compiler.plugin('emit', function (compilation, callback) {
      let publicPath = compilation.outputOptions.publicPath
      let imports = ''
      let files = []

      compilation.entrypoints.forEach(function (i) {
        if (i.name === 'uibook') {
          i.chunks.forEach(function (chunk) {
            if (chunk.files) {
              files = files.concat(chunk.files)
            }
          })
        }
      })

      files.forEach(function (file) {
        if (file.slice(-3) === '.js') {
          imports += '<script src="' + publicPath + file + '"></script>'
        } else if (file.slice(-4) === '.css') {
          imports += '<link rel="stylesheet" href="' + publicPath + file + '">'
        }
      })

      let outputPath = trimSlashes(options.outputPath || 'uibook')
      let title = options.title || 'Uibook'

      let pathHtml = require.resolve('./src/template.html')
      let pathCss = require.resolve('./src/uibook.css')
      let UibookHtml = fs.readFileSync(pathHtml, 'utf-8')
      let UibookCss = fs.readFileSync(pathCss, 'utf-8')

      UibookHtml = UibookHtml.replace(/%UIBOOK_EXCLUDED%/, isChunkExcluded)
      UibookHtml = UibookHtml.replace(/%OUTPUT_PATH%/gm, outputPath)
      UibookHtml = UibookHtml.replace(/%PUBLIC_URL%/gm, publicPath)
      UibookHtml = UibookHtml.replace(/%IMPORTS%/gm, imports)
      UibookHtml = UibookHtml.replace(/%TITLE%/, title)

      compilation.assets[outputPath + '/index.html'] = {
        source: function () {
          return UibookHtml
        },
        size: function () {
          return UibookHtml.length
        }
      }

      compilation.assets[outputPath + '/uibook.css'] = {
        source: function () {
          return UibookCss
        },
        size: function () {
          return UibookCss.length
        }
      }

      callback()
    })
  }
}

module.exports = UibookPlugin
