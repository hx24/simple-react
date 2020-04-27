import React from './react'
import ReactDOM from './react-dom'

const el = (
  <div className='title' title='hello' style={{ fontWeight: 'bold' }}>
    hello <span style="color: red" onClick={() => { alert('hello') }}>react</span>
  </div>
)

console.log('el', el)

ReactDOM.render(el, document.getElementById('root'))
