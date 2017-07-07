import { CLOSE_ALERT } from '../types/app'

const closeAlert = () => {
  return {
    type: CLOSE_ALERT,
  }
}

module.exports = {
  closeAlert,
}
