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
  if (typeof vnode === 'string') {
    // 字符串节点
    dom = document.createTextNode(vnode)
  } else {
    // 虚拟DOM对象
    const { tag, props, children } = vnode
    dom = document.createElement(tag)
    if (props) {
      setAttribute(dom, props)
    }

    // 递归渲染子节点
    if (children) {
      children.forEach(child => render(child, dom))
    }
  }
  return dom
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
