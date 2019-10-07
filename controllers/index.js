var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var combineObjects = require('../lib/combine-objects')
var UibookWrapper = require('../controllers/wrapper')
var UibookLoader = require('../components/loader')
var UibookError = require('../components/error')
var UibookCase = require('../components/case')
var Uibook = require('../components/index')

var DOCS_URL = 'https://github.com/vrizo/uibook/blob/master/docs/'

var lastEventID = 0

var t = {
  backgroundDeprecated: '\'white\' background is deprecated. ' +
                        'Please use \'light\' instead',
  noPagesAction: 'How to add pages',
  noPagesDesc: 'No pages in configuration file',
  noPagesUrl: DOCS_URL + 'troubleshooting.md#no-pages',
  noCasesDesc: function (page) {
    return page + ' contains no cases. Add them in config'
  },
  noCasesAction: 'How to add case',
  noCasesUrl: DOCS_URL + 'troubleshooting.md#no-cases',
  iframeErrorAction: 'Possible reasons',
  iframeErrorUrl: DOCS_URL + 'troubleshooting.md#iframe-error',
  iframeErrorDesc: function (page) {
    return page + ' failed to load in iframe'
  }
}

var UibookController = createReactClass({
  pages: [],

  getInitialState: function () {
    var values = this.props.values
    var locale

    if (values && values.locale) {
      locale = values.locale[0]
    }

    var state = {
      isEditable: false,
      settings: this.settings(),
      notices: this.notice(),
      errored: { },
      locale: locale,
      isInit: false,
      height: { },
      loaded: { },
      events: [],
      page: null
    }

    if (values) {
      for (var key in values) {
        if (values[key]) {
          state[key] = values[key][0]
        }
      }
    }

    return state
  },

  componentDidMount: function () {
    for (var key in this.props.pages) {
      if (this.props.pages[key].name) {
        this.pages.push(key)
      } else {
        for (var innerKey in this.props.pages[key]) {
          this.pages.push(innerKey)
        }
      }
    }
    document.body.addEventListener('track', this.track, false)
    window.addEventListener('hashchange', this.hashChange, false)
    window.addEventListener('keyup', this.keyup, false)
    this.hashChange()
    this.setState({ isInit: true })
  },

  componentDidUpdate: function (prevProps, prevState) {
    var locale = this.state.locale
    var page = this.state.page

    this.changeHash()
    if (prevState.page !== page || prevState.locale !== locale) {
      this.setState({ loaded: { } }, function () {
        setTimeout(function () {
          window.scrollTo(0, 0)
        }, 50)
      })
    }
  },

  componentWillUnmount: function () {
    document.body.removeEventListener('track', this.track, false)
    window.removeEventListener('hashchange', this.hashChange, false)
    window.removeEventListener('keyup', this.keyup, false)
  },

  getPage: function (name) {
    var pages = this.props.pages

    if (pages[name]) return pages[name]
    for (var key in pages) {
      if (pages[key].name) continue
      if (pages[key][name]) return pages[key][name]
    }
    return { }
  },

  track: function (e) {
    var event = {
      name: e.detail.name,
      args: e.detail.args,
      id: ++lastEventID
    }

    this.setState(function (prevState) {
      return {
        events: prevState.events.concat([event])
      }
    })
    setTimeout(function () {
      this.setState(function (prevState) {
        return {
          events: prevState.events.filter(function (i) {
            return i !== event
          })
        }
      })
    }.bind(this), 3000)
  },

  changeValue: function (event) {
    var state = this.state

    if (typeof this.props.values[event.target.id][0] === 'number') {
      state[event.target.id] = parseInt(event.target.value)
    } else {
      state[event.target.id] = event.target.value
    }
    this.setState(state)
  },

  changePage: function (page) {
    this.setState({ page: page })
  },

  changeEditable: function () {
    this.setState({ isEditable: !this.state.isEditable })
  },

  nextPage: function () {
    var pages = this.pages
    var current = pages.indexOf(this.state.page)
    var next = current + 1

    if (next >= pages.length) next = 0
    this.changePage(pages[next])
  },

  prevPage: function () {
    var pages = this.pages
    var current = pages.indexOf(this.state.page)
    var prev = current - 1

    if (prev < 0) prev = pages.length - 1
    this.changePage(pages[prev])
  },

  hashChange: function () {
    var locales = this.props.values && this.props.values.locale
    var pages = this.pages

    var hash = location.hash.slice(1).split(':')
    var page = hash[0]
    var locale = hash[1]

    if (this.state.page !== page || this.state.locale !== locale) {
      if (pages.indexOf(page) === -1) {
        this.changeHash()
      } else if (locales && !locale) {
        if (pages.indexOf(page) !== -1) {
          this.setState({ page: page })
        }
        this.changeHash()
      } else {
        this.setState({ page: page, locale: locale })
      }
    }
  },

  keyup: function (e) {
    if (this.state.isEditable) return
    if (e.keyCode === 39) {
      this.nextPage()
    } else if (e.keyCode === 37) {
      this.prevPage()
    }
  },

  loaded: function (index, e) {
    var key = this.state.page + index
    var main = e.target.contentDocument.querySelector('main')

    if (!main) {
      this.setState(function (prevState) {
        var errored = combineObjects(prevState.errored, { })
        errored[key] = true
        return { errored: errored }
      })
      return
    }
    var mainHeight = main.offsetHeight

    this.setState(function (prevState) {
      var loaded = combineObjects(prevState.loaded, { })
      loaded[key] = true
      var height = combineObjects(prevState.height, { })
      height[key + prevState.locale] = mainHeight

      return {
        loaded: loaded,
        height: height
      }
    })
  },

  changeHash: function () {
    var locale = this.state.locale ? ':' + this.state.locale : ''
    var hash = ''

    if (this.state.page) {
      hash = '#' + this.state.page + locale
    } else if (this.pages[0]) {
      hash = '#' + this.pages[0] + locale
    }
    if (location.hash !== hash) location.hash = hash
  },

  frameUrl: function (index) {
    var params = [
      'editable=' + this.state.isEditable,
      'page=' + this.state.page,
      'case=' + index,
      'iframe=true'
    ]

    for (var prop in this.props.values) {
      if (this.state.hasOwnProperty(prop)) { /* eslint-disable-line */
        var key = encodeURIComponent(prop)
        var value = encodeURIComponent(this.state[prop])
        params.push(key + '=' + value)
      }
    }

    return location.pathname + '/?' + params.join('&')
  },

  height: function (caseObj, index) {
    if (caseObj.height) {
      return caseObj.height
    } else {
      var key = this.state.page + index
      return this.state.height[key + this.state.locale] || 150
    }
  },

  notice: function () {
    var notices = []
    var body = document.getElementsByTagName('body')[0]

    try {
      notices = JSON.parse(body.dataset.uibookNotices)
    } catch (error) {
      console.log('JSON parsing error: ', error) /* eslint-disable-line */
    }

    return notices[0]
  },

  settings: function () {
    var settings = { }
    var body = document.getElementsByTagName('body')[0]

    try {
      settings = JSON.parse(body.dataset.uibookSettings)
    } catch (error) {
      console.log('JSON parsing error: ', error) /* eslint-disable-line */
    }

    return settings
  },

  render: function () {
    var content
    var page = this.getPage(this.state.page || this.pages[0])

    if (page.background === 'white') {
      console.warn(t.backgroundDeprecated) /* eslint-disable-line */
    }

    if (!this.state.isInit) {
      content = h(UibookLoader, { isLoading: true })
    } else if (!page.name) {
      content = h(UibookError, {
        actionText: t.noPagesAction,
        actionUrl: t.noPagesUrl,
        desc: t.noPagesDesc
      })
    } else if (!page.cases || page.cases.length === 0) {
      content = h(UibookError, {
        actionText: t.noCasesAction,
        actionUrl: t.noCasesUrl,
        desc: t.noCasesDesc(page.name)
      })
    } else {
      content = page.cases.map(function (i, index) {
        var key = this.state.page + index
        if (typeof i === 'function') {
          var component = i(this.state.locale)
          var combinedProps = combineObjects(
            {
              isEditable: this.state.isEditable,
              component: page.component,
              name: page.name
            }, component.props
          )
          return h('div', { key: key }, h(component.type, combinedProps))
        } else {
          return h(UibookCase, { key: key, example: i.example || '' }, [
            !this.state.errored[key]
              ? h(UibookLoader, {
                isLoading: !this.state.loaded[key],
                key: 'loader' + key
              }, [
                h('iframe', {
                  className: 'uibook-iframe',
                  onLoad: this.loaded.bind(this, index),
                  style: {
                    height: this.height(i, index),
                    width: i.width || '100%'
                  },
                  src: this.frameUrl(index),
                  key: 'iframe' + key
                })
              ])
              : h(UibookError, {
                actionText: t.iframeErrorAction,
                actionUrl: t.iframeErrorUrl,
                desc: t.iframeErrorDesc(page.name),
                key: 'error' + key
              })
          ])
        }
      }.bind(this))
    }

    return h(UibookWrapper, {
      wrapper: this.props.wrapper,
      values: this.props.values,
      state: this.state
    }, h(Uibook, {
      onEditableSwitch: this.changeEditable,
      isFixedHeader: this.state.settings.isFixedHeader,
      onValueChange: this.changeValue,
      onPageChange: this.changePage,
      background: page.background || 'default',
      isEditable: this.state.isEditable,
      onNextPage: this.nextPage,
      onPrevPage: this.prevPage,
      events: this.state.events,
      values: this.props.values,
      notice: this.state.notice,
      pages: this.props.pages,
      state: this.state,
      page: this.state.page
    }, content))
  }
})

module.exports = UibookController
