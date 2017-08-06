import { updateIntl } from 'react-intl-redux'

import * as Types from '../types/app'
import msgJa from '../locales/ja'
import msgEn from '../locales/en'

const closeAlert = () => {
  return {
    type: Types.CLOSE_ALERT,
  }
}

const changeLocale = (locale) => {
  const messages = locale === 'en' ? msgEn : msgJa
  return dispatch => {
    dispatch(updateIntl({
      locale,
      messages,
    }))
  }
}

module.exports = {
  closeAlert,
  changeLocale,
}
