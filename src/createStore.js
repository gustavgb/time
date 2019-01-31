import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

const createContext = (reducer) => {
  let state = reducer(undefined, {})
  if (state === undefined) {
    throw new Error('Reducer cannot return undefined during initialization.')
  }

  let subscribers = []

  const context = React.createContext(state)

  const dispatch = (type, payload) => {
    state = reducer(state, { type, payload })

    subscribers.forEach(s => s.callback(state))
  }

  const subscribe = (callback) => {
    const id = uuid()

    if (typeof callback !== 'function') {
      throw new Error('Subscriber callback must be a function.')
    }

    subscribers.push({
      id,
      callback
    })
  }

  const unsubscribe = (id) => {
    const newSubscribers = subscribers.filter(s => s.id !== id)

    if (newSubscribers.length === subscribers) {
      throw new Error('Cannot unsubscribe. Id not found.')
    }

    subscribers = newSubscribers
  }

  const init = (_instance) => {
    const id = uuid()

    _instance.state = {
      ..._instance.state,
      [id]: state
    }

    let didMount = () => null
    let willUnmount = () => null
    let subId = null

    if (_instance.componentDidMount) {
      didMount = _instance.componentDidMount
    }

    _instance.componentDidMount = () => {
      subId = subscribe(_instance.setState.bind(_instance))
      didMount()
    }

    if (_instance.componentWillUnmount) {
      willUnmount = _instance.componentWillUnmount
    }

    _instance.componentWillUnmount = () => {
      unsubscribe(subId)
      willUnmount()
    }
  }

  const connect = (_instance) => {
    _instance.contextType = context
  }

  const Consumer = ({ children, ...props }) => React.createElement(context.Consumer, { ...props, children: (p) => children(p, dispatch) })
  const Provider = ({ children }) => React.createElement(context.Provider, { value: state }, children)
  Consumer.propTypes = Provider.propTypes = { children: PropTypes.any }

  return {
    init,
    connect,
    Consumer,
    Provider
  }
}

export default createContext
