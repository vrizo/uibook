var React = require('react')
var h = React.createElement

var UibookSelect = require('./select')
var UibookLocale = require('./locale')
var fixClick = require('../lib/fix-click')

var Header = function (props) {
  return h('header', { className: 'uibook-header' }, props.children)
}

var UibookHeader = function (props) {
  var onNextPage = function (e) {
    props.onNextPage()
    fixClick(e)
  }
  var onPrevPage = function (e) {
    props.onPrevPage()
    fixClick(e)
  }

  return h(Header, { key: 'header' }, [
    h('div', { key: 'controls' }, [
      h('button', {
        className: 'uibook-arrow',
        onClick: onPrevPage,
        key: '←'
      }, '←'),
      ' ',
      h(UibookSelect, {
        onPageChange: props.onPageChange,
        color: props.color,
        pages: props.pages,
        page: props.page,
        key: 'select'
      }),
      ' ',
      h('button', {
        className: 'uibook-arrow',
        onClick: onNextPage,
        key: '→'
      }, '→')
    ]),
    props.locale
      ? h(UibookLocale, {
        locale: props.locale,
        page: props.page,
        key: 'locale'
      })
      : null
  ])
}

module.exports = UibookHeader
