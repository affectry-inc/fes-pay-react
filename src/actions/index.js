import todoActions from './todos'
import signUpActions from './signUp'
import editFacePhotoActions from './editFacePhoto'

module.exports = {
  ...todoActions,
  ...signUpActions,
  ...editFacePhotoActions,
}
