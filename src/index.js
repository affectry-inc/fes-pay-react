import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import ja from 'react-intl/locale-data/ja'
import en from 'react-intl/locale-data/en'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Cookies from 'universal-cookie'

import configureStore from './store/configureStore'
import routes from './routes'
import msgJa from './locales/ja'
import msgEn from './locales/en'
import './style.css'

injectTapEventPlugin()

addLocaleData([...ja, ...en])

const cookies = new Cookies()
const locale = cookies.get('locale', { path: '/' }) || 'ja'

let state = {
  intl: {
    defaultLocale: 'ja',
    locale: locale,
    messages: locale === 'en' ? msgEn : msgJa,
  },
}

const store = configureStore(browserHistory, state)

const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={history} routes={routes} />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
