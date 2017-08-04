import { IntlProvider } from 'react-intl'

const t = (state, id) => {
  const intlProvider = new IntlProvider(state.intl, {})
  const { intl } = intlProvider.getChildContext()

  return intl.formatMessage({ id: 'editCreditCard.invalidChars' })
}

module.exports = {
  t,
}
