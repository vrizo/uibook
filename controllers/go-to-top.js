var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var UibookGoToTop = require('../components/go-to-top')
var throttler = require('../lib/throttler')

var scrollInterval = null
var scrolling = false

var UibookGoToTopController = createReactClass({
  getInitialState: function () {
    return {
      prevScrollTop: 0,
      scrollTop: 0
    }
  },

  componentDidMount: function () {
    document.addEventListener('scroll', this.scrollOrResize)
    window.addEventListener('resize', this.scrollOrResize)
  },

  getScrollTop: function () {
    return document.getElementsByTagName('html')[0].scrollTop
  },

  setScrollTop: function (scrollTop) {
    var startScrollTop = this.getScrollTop()
    var counter = 0
    scrolling = true

    scrollInterval = setInterval(function () {
      var easing = (Math.cos(Math.PI * counter / 5) + 1) / 2
      var scroll = scrollTop - ((scrollTop - startScrollTop) * easing)
      document.getElementsByTagName('html')[0].scrollTop = scroll
      counter += 1

      if (counter === 6) {
        clearInterval(scrollInterval)
        scrolling = false
      }
    }, 25)
  },

  scrollOrResize: function () {
    throttler(function () {
      this.setState({
        scrollTop: this.getScrollTop()
      })
    }.bind(this))
  },

  click: function () {
    if (scrolling) return

    if (this.getScrollTop() === 0 && this.state.prevScrollTop) {
      this.setScrollTop(this.state.prevScrollTop)
    } else {
      this.setState({
        prevScrollTop: this.getScrollTop()
      })
      this.setScrollTop(0)
    }
  },

  render: function () {
    var container = document.getElementsByClassName('uibook-page')[0]
    var hasScroll = container &&
      container.offsetHeight - window.innerHeight > 50
    var isVisible = hasScroll &&
      (this.state.prevScrollTop || this.state.scrollTop > 50)
    var isReturn = this.state.prevScrollTop && this.state.scrollTop === 0

    return h(UibookGoToTop, {
      isVisible: isVisible,
      isReturn: isReturn,
      onClick: this.click
    })
  }
})

module.exports = UibookGoToTopController
