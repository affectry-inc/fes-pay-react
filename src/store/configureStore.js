import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducers from '../reducers'

const logger = createLogger();

export default function configureStore(history, initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, logger)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
