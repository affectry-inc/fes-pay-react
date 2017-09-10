import todoActions from './todos'
import appActions from './app'
import signUpActions from './signUp'
import reRegisterActions  from './reRegister'
import editCreditCardActions from './editCreditCard'
import editFacePhotoActions from './editFacePhoto'
import editPhoneNumberActions from './editPhoneNumber'
import historyActions  from './history'
import settingsActions  from './settings'
import loginDialogActions  from './loginDialog'

module.exports = {
  ...todoActions,
  ...appActions,
  ...signUpActions,
  ...reRegisterActions,
  ...editCreditCardActions,
  ...editFacePhotoActions,
  ...editPhoneNumberActions,
  ...historyActions,
  ...settingsActions,
  ...loginDialogActions,
}
