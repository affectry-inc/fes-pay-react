import todoActions from './todos'
import appActions from './app'
import signUpActions from './signUp'
import editFacePhotoActions from './editFacePhoto'
import editCreditCardActions from './editCreditCard'

module.exports = {
  ...todoActions,
  ...appActions,
  ...signUpActions,
  ...editFacePhotoActions,
  ...editCreditCardActions,
}
