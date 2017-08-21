import { updateIntl } from 'react-intl-redux'
import Cookies from 'universal-cookie'
import { firebaseAuth } from '../firebase/'
import * as Types from '../types/app'
import msgJa from '../locales/ja'
import msgEn from '../locales/en'
import I18n from '../utils/i18n'
import FirebaseClient from '../utils/firebaseClient'

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

const storeBandId = (paramBandId) => {
  return (dispatch, getState) => {
    let bandId
    const cookies = new Cookies()
    if (paramBandId) {
      bandId = paramBandId
      cookies.set('bandId', bandId, { path: '/' })
    } else {
      bandId = cookies.get('bandId', { path: '/' })
    }

    firebaseAuth.onAuthStateChanged((user) => {
      console.log('LOGGED IN uid:', user.uid)
      if (user && !bandId) {
        dispatch({
          type: Types.OPEN_ALERT,
          alertMessage: I18n.t(getState().intl, 'app.accessViaQr')
        })
      }

      dispatch({
        type: Types.SET_BAND_ID,
        bandId: bandId,
        uid: user ? user.uid : '',
        isAnonymous: user ? user.isAnonymous : false,
      })

      if (user) {
        FirebaseClient.listenBandIds(user.uid,
          bandIds => {
            dispatch({
              type: Types.BAND_ID_ADDED,
              bandIds: bandIds,
            })
          }
        )
      }
    })
  }
}

const changeBandId = (bandId) => {
  return (dispatch, getState) => {
    const cookies = new Cookies()
    cookies.set('bandId', bandId, { path: '/' })

    dispatch({
      type: Types.CHANGE_BAND_ID,
      bandId: bandId,
    })
  }
}

module.exports = {
  closeAlert,
  changeLocale,
  storeBandId,
  changeBandId,
}
