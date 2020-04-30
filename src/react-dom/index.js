import { Component } from '../react'

export default {
  render,
}

/**
{
  tag: 'div',
  props: {
    className: 'title',
    title: 'hello',
  },
  children: [
    "hello",
    {
      tag: "span",
      props: null,
      children: ['react']
    }
  ]
}
 */
/**
 * 渲染虚拟DOM到目标节点中
 * @param {object} vnode 虚拟DOM对象
 * @param {Element} target DOM节点
 */
function render(vnode, target) {
  target.appendChild(renderVnode2Dom(vnode))
}

function renderVnode2Dom(vnode) {
  if (!vnode) {
    vnode = ''
  }

  let dom

  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }

  if (typeof vnode === 'string') {
    // 字符串节点
    dom = document.createTextNode(vnode)
  } else {
    // 虚拟DOM对象
    const { tag, props, children } = vnode

    if (typeof tag === 'function') {
      // 类组件或函数组件
      if (tag.prototype.render) {
        // 类组件
        dom = handleClassComp(tag, props)
      } else {
        // 函数组件
        dom = handleFunComp(tag, props)
      }
    } else {
      // 原生dom节点
      dom = document.createElement(tag)
      if (props) {
        setAttribute(dom, props)
      }

      // 递归渲染子节点
      if (children) {
        children.forEach((child) => render(child, dom))
      }
    }
  }
  return dom
}

function handleClassComp(ClassComp, props) {
  // 创建组件实例
  const inst = createClassComp(ClassComp, props)
  const vnode = inst.render()
  inst.dom = renderVnode2Dom(vnode)

  inst.componentDidMount() // TODO  存疑 此时DOM渲染创建出来了，但是并没有插入到页面
  return inst.dom
}

/**
 * 创建类组件实例
 * @param {Component} ClassComp 类
 * @param {object} props 属性
 */
function createClassComp(ClassComp, props) {
  const inst = new ClassComp(props)
  inst.componentWillMount()
  return inst
}

/**
 *  更新组件
 * @param {Component} classCompInst 类组件实例
 * @param {object} nextState 新的state
 * @param {object} [props] 属性 可选  传了则更新属性
 */
export function updateClassComp(classCompInst, nextState = {}, props) {
  const prevState = classCompInst.state
  const prevProps = classCompInst.props
  classCompInst.componentWillUpdate(props || classCompInst.props, nextState)

  classCompInst.state = nextState
  if (props) {
    updateClassCompProps(classCompInst, props)
  }
  const vnode = classCompInst.render()
  const dom = renderVnode2Dom(vnode)
  classCompInst.dom.parentNode.replaceChild(dom, classCompInst.dom) // TODO  暂时不做diff，直接替换整个dom
  classCompInst.componentDidUpdate(prevProps, prevState)
  classCompInst.dom = dom
}

/**
 * 更新组件props
 */
function updateClassCompProps(classCompInst, props) {
  classCompInst.componentWillReceiveProps(props)
  classCompInst.props = props
}

function handleFunComp(funComp, props) {
  return renderVnode2Dom(funComp(props))
}

/**
 * 设置DOM属性
 * @param {Element} dom 要设置属性的DOM
 * @param {object}} attrs 属性集合
 */
function setAttribute(dom, attrs) {
  for (let key in attrs) {
    const attr = attrs[key]
    if (key === 'className') {
      key = 'class'
    }

    if (key === 'style') {
      // 处理样式
      if (!attr || typeof attr === 'string') {
        dom.style.cssText = attr
      } else if (attr && typeof attr === 'object') {
        // 样式是对象形式
        for (const k in attr) {
          let styleValue = attr[k]
          if (typeof styleValue === 'number') {
            styleValue += 'px'
          }
          dom.style[k] = styleValue || ''
        }
      }
    } else if (/on[A-Z]+/.test(key)) {
      // 事件  当然，真正的react事件实现并非如此
      key = key.toLowerCase()
      dom[key] = attr
    } else {
      // 设置properties和attributes  关于他们的区别
      // https://zh.javascript.info/dom-attributes-and-properties
      if (key in dom) {
        // 设置properties
        dom[key] = attr || ''
      }

      if (attr) {
        // 设置attributes
        dom.setAttribute(key, attr)
      } else {
        dom.removeAttribute(key)
      }
    }
  }
}
