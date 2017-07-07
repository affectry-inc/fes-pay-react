import * as Types from '../types/app'

const closeAlert = () => {
  return {
    type: Types.CLOSE_ALERT,
  }
}

module.exports = {
  closeAlert,
}
