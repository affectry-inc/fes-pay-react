import { IntlProvider } from 'react-intl'

const t = (stateIntl, id) => {
  const intlProvider = new IntlProvider(stateIntl, {})
  const { intl } = intlProvider.getChildContext()

  return intl.formatMessage({ id: id })
}

module.exports = {
  t,
}
