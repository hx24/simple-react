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

function render(vnode, target) {
  if (!vnode) return

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

  target.appendChild(dom)
}

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
      } else if (value && typeof value === 'object') {
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
