import Component from './component'

const React = {
  createElement,
  Component
}

function createElement(tag, props, ...children) {
  return new VDOM(tag, props, children)
}

class VDOM {
  constructor(tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

console.log('React', React)

export default React

export {
  Component
}
