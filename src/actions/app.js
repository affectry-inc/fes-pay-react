import { updateIntl } from 'react-intl-redux'
import Cookies from 'universal-cookie'

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

  const cookies = new Cookies()
  cookies.set('locale', locale, { path: '/' })

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
