import todoActions from './todos'
import signUpActions from './signUp'
import editFacePhotoActions from './editFacePhoto'
import editCreditCardActions from './editCreditCard'

module.exports = {
  ...todoActions,
  ...signUpActions,
  ...editFacePhotoActions,
  ...editCreditCardActions,
}
