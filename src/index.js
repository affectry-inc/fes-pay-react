import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore'
import routes from './routes'
import './style.css';

injectTapEventPlugin()

const history = createHistory()
const store = configureStore(history, {})

render(
  <Provider store={store}>
    <ConnectedRouter history={history} children={routes} />
  </Provider>,
  document.getElementById('root')
)
