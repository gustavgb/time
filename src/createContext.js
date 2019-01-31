import React from 'react'
import uuid from 'uuid/v4'

const createContext = (reducer) => {
  let state = reducer(undefined, {})
  if (state === undefined) {
    throw new Error('Reducer cannot return undefined during initialization.')
  }

  let subscribers = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)

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

  const methods = {
    getState,
    dispatch,
    subscribe,
    unsubscribe
  }

  const context = React.createContext(methods)

  return {
    ...methods,
    Provider: context.Provider,
    Consumer: context.Consumer
  }
}

export default createContext
