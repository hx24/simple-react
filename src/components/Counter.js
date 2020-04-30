import React, { Component } from '../react'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      count: 1,
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
    // console.log('props', this.props, nextProps)
    // console.log('state', this.state , nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    console.log('props', this.props, prevProps)
    console.log('state', this.state, prevState)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  add() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    return (
      <div>
        <div>count: {this.state.count}</div>
        <button onClick={this.add.bind(this)}>加1</button>
      </div>
    )
  }
}

export default Counter
