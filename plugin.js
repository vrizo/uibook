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

var getSettings = function (options) {
  return {
    isFixedHeader: !(options.isFixedHeader === false)
  }
}
class UibookPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    let options = this.options
    let isChunkExcluded = checkChunkExclusion(compiler.options)
    let isHotErrored = false

    compiler.plugin('entry-option', function (context, entry) {
      let controllerPath = options.controller
      let uibookEntry = controllerPath
      let hasHMR = false

      if (compiler.options && compiler.options.devServer) {
        hasHMR = compiler.options.devServer.hot
      }

      if (options.hot) {
        try {
          uibookEntry = [
            require.resolve('webpack-dev-server/client') + '?/',
            hasHMR ? require.resolve('webpack/hot/dev-server') : null,
            controllerPath
          ].filter(Boolean)
        } catch (e) {
          isHotErrored = true
        }
      }

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
          uibook: uibookEntry
        }
      } else {
        entry.uibook = uibookEntry
      }

      Object.keys(entry).forEach(function (name) {
        compiler.apply(itemToPlugin(entry[name], name))
      })

      return true
    })

    compiler.plugin('emit', function (compilation, callback) {
      let publicPath = compilation.outputOptions.publicPath
      let entrypoints = []
      let notices = []
      let imports = ''
      let files = []

      if (Array.isArray(compilation.entrypoints)) {
        entrypoints = compilation.entrypoints
      } else if (typeof compilation.entrypoints === 'object') {
        if (typeof compilation.entrypoints.forEach === 'function') {
          compilation.entrypoints.forEach(function (entrypoint) {
            entrypoints.push(entrypoint)
          })
        } else {
          Object.keys(compilation.entrypoints).forEach(function (entrypoint) {
            entrypoints.push(compilation.entrypoints[entrypoint])
          })
        }
      } else {
        entrypoints = [compilation.entrypoints]
      }

      entrypoints.forEach(function (i) {
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

      if (!isChunkExcluded) {
        notices.unshift('chunk')
      }
      if (isHotErrored) {
        notices.unshift('hot')
      }
      notices = JSON.stringify(notices)

      let outputPath = trimSlashes(options.outputPath || 'uibook')
      let settings = JSON.stringify(getSettings(options))
      let title = options.title || 'Uibook'

      let pathHtml = require.resolve('./src/template.html')
      let pathCss = require.resolve('./src/uibook.css')
      let UibookHtml = fs.readFileSync(pathHtml, 'utf-8')
      let UibookCss = fs.readFileSync(pathCss, 'utf-8')

      UibookHtml = UibookHtml.replace(/%OUTPUT_PATH%/gm, outputPath)
      UibookHtml = UibookHtml.replace(/%PUBLIC_URL%/gm, publicPath)
      UibookHtml = UibookHtml.replace(/%SETTINGS%/, settings)
      UibookHtml = UibookHtml.replace(/%NOTICES%/, notices)
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
