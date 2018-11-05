let SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
let MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
let fs = require('fs')

var trimSlashes = function (string) {
  return string.replace(/^\/+|\/+$/g, '')
}

class UibookPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    let options = this.options
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
      let scriptPath = compilation.chunks.find(function (i) {
        return i.name === 'uibook'
      }).files[0]
      let outputPath = trimSlashes(options.outputPath) || 'uibook'
      let title = options.title || 'uibook'

      let pathHtml = require.resolve('./src/template.html')
      let pathCss = require.resolve('./src/uibook.css')
      let UibookHtml = fs.readFileSync(pathHtml, 'utf-8')
      let UibookCss = fs.readFileSync(pathCss, 'utf-8')

      UibookHtml = UibookHtml.replace(/%OUTPUT_PATH%/gm, outputPath)
      UibookHtml = UibookHtml.replace(/%PUBLIC_URL%/gm, publicPath)
      UibookHtml = UibookHtml.replace(/%SCRIPT_URL%/gm, scriptPath)
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
