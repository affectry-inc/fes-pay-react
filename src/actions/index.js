import todoActions from './todos'
import signUpActions from './signUp'

module.exports = {
  ...todoActions,
  ...signUpActions,
}
