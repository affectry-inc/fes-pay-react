import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SignUp from './containers/SignUp';
import HowToUse from './containers/HowToUse';
import Todos from './containers/Todos';
import NotFound from './containers/NotFound';

const routes = (
  <Route path="/" component={ App } >
    <IndexRoute component={ HowToUse } />
    <Route path="/yeah/:bandId" component={ SignUp } />
    <Route path="/how-to-use" component={ HowToUse } />
    <Route path="/todos" component={ Todos } />
    <Route path="*" component={ NotFound } />
  </Route>
)

export default routes
