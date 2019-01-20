var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var combineObjects = require('../lib/combine-objects')
var UibookWrapper = require('../controllers/wrapper')
var UibookLoader = require('../components/loader')
var UibookCase = require('../components/case')
var Uibook = require('../components/index')

var lastEventID = 0

var UibookController = createReactClass({
  pages: [],

  getInitialState: function () {
    var values = this.props.values
    var state = {
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
  },

  componentDidUpdate: function (prevProps, prevState) {
    var locale = this.state.locale
    var page = this.state.page
    this.changeHash()
    if (prevState.page !== page || prevState.locale !== locale) {
      this.setState({ loaded: { } })
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

  nextPage: function () {
    var pages = this.pages
    var current = pages.indexOf(this.state.page)
    var next = current + 1
    if (next >= pages.length) next = 0
    this.setState({ page: pages[next] })
  },

  prevPage: function () {
    var pages = this.pages
    var current = pages.indexOf(this.state.page)
    var next = current - 1
    if (next < 0) next = pages.length - 1
    this.setState({ page: pages[next] })
  },

  hashChange: function () {
    var hash = location.hash.slice(1).split(':')
    var page = hash[0]
    var locale = hash[1]
    var pages = this.pages
    if (this.state.page !== page || this.state.locale !== locale) {
      if (pages.indexOf(page) === -1) {
        this.changeHash()
      } else {
        this.setState({ page: page, locale: locale })
      }
    }
  },

  keyup: function (e) {
    if (e.keyCode === 39) {
      this.nextPage()
    } else if (e.keyCode === 37) {
      this.prevPage()
    }
  },

  loaded: function (index, e) {
    var key = this.state.page + index
    var mainHeight = e.target.contentDocument.querySelector('main').offsetHeight
    this.setState(function (prevState) {
      var loaded = combineObjects(prevState.loaded, {})
      loaded[key] = true
      var height = combineObjects(prevState.height, {})
      height[key + prevState.locale] = mainHeight

      return {
        loaded: loaded,
        height: height
      }
    })
  },

  changeHash: function () {
    var locale = this.state.locale ? ':' + this.state.locale : ''
    var hash
    if (this.state.page) {
      hash = '#' + this.state.page + locale
    } else {
      hash = '#' + this.pages[0] + locale
    }
    if (location.hash !== hash) location.hash = hash
  },

  frameUrl: function (index) {
    var params = [
      'page=' + this.state.page,
      'case=' + index,
      'iframe=true'
    ]

    for (var prop in this.props.values) {
      if (this.state.hasOwnProperty(prop)) {
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

  render: function () {
    var page = this.getPage(this.state.page || this.pages[0])

    return h(UibookWrapper, {
      wrapper: this.props.wrapper,
      values: this.props.values,
      state: this.state
    }, h(Uibook, {
      onValueChange: this.changeValue,
      onPageChange: this.changePage,
      background: page.background || 'default',
      onNextPage: this.nextPage,
      onPrevPage: this.prevPage,
      events: this.state.events,
      values: this.props.values,
      pages: this.props.pages,
      state: this.state,
      page: this.state.page
    }, page.cases
      ? page.cases.map(function (i, index) {
        var key = this.state.page + index
        if (typeof i === 'function') {
          var component = i(this.state.locale)
          var combinedProps = combineObjects(
            { component: page.component, name: page.name }, component.props
          )
          return h('div', { key: key }, h(component.type, combinedProps))
        } else {
          return h(UibookCase, { key: key, example: i.example || '' }, [
            h(UibookLoader, {
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
          ])
        }
      }.bind(this))
      : null
    ))
  }
})

module.exports = UibookController
