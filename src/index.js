import React, { Component } from './react'
import ReactDOM from './react-dom'
import Counter from './components/Counter'


const el = (
  <div className='title' title='hello' style={{ fontWeight: 'bold' }}>
    hello{' '}
    <span
      style='color: red'
      onClick={() => {
        alert('hello')
      }}
    >
      react
    </span>
  </div>
)

class ClassComp extends Component {
  render() {
    const { name } = this.props
    return (
      <div class='classComp'>
        <p>hi, {name}</p>
        this is a <b>class</b> component
      </div>
    )
  }
}


function FunComp(props) {
  return (
    <div>
      <i>hello, <span style={{ color: 'red' }}>{props.name}</span></i>
      <h1>this is function component</h1>
    </div>
  )
}

const show = (
  <div>
    {/* {el}
    <ClassComp name={'hx'} />
    <FunComp name={'hx'} /> */}
    <Counter />
  </div>
)

React.createElement()

ReactDOM.render(show, document.getElementById('root'))
