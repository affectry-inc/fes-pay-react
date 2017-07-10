import todoActions from './todos'
import appActions from './app'
import signUpActions from './signUp'
import editCreditCardActions from './editCreditCard'
import editFacePhotoActions from './editFacePhoto'
import editPhoneNumberActions from './editPhoneNumber'

module.exports = {
  ...todoActions,
  ...appActions,
  ...signUpActions,
  ...editCreditCardActions,
  ...editFacePhotoActions,
  ...editPhoneNumberActions,
}
