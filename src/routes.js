import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import SignUp from './containers/SignUp'
import ReRegister from './containers/ReRegister'
import History from './containers/History'
import Settings from './containers/Settings'
import TermsOfUse from './containers/TermsOfUse'
import ComAct from './containers/ComAct'
import PrivacyPolicy from './containers/PrivacyPolicy'
import AboutUs from './containers/AboutUs'
import HowToUse from './containers/HowToUse'
import Todos from './containers/Todos'
import NotFound from './containers/NotFound'
import FirebaseClient from './utils/firebaseClient'

const routeHome = (nextState, replace, callback) => {
  FirebaseClient.routeHome(nextState.params.bandId, replace, callback)
}

const routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ HowToUse } />
    <Route path='/yeah/:bandId' component={ SignUp } onEnter={ routeHome } />
    <Route path='/wow/:bandId' component={ ReRegister } />
    <Route path='/history/:bandId' component={ History } />
    <Route path='/settings/:bandId' component={ Settings } />
    <Route path='/terms' component={ TermsOfUse } />
    <Route path='/com_act' component={ ComAct } />
    <Route path='/privacy' component={ PrivacyPolicy } />
    <Route path='/about' component={ AboutUs } />
    <Route path='/howto' component={ HowToUse } />
    <Route path='/todos' component={ Todos } />
    <Route path='*' component={ NotFound } />
  </Route>
)

export default routes
