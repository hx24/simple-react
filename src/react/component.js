import { updateClassComp } from '../react-dom'

class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }

  setState(value) {
    const newState = {
      ...this.state,
      ...value,
    }
    updateClassComp(this, newState)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillUnmount() {}
}

export default Component
