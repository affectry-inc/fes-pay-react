import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import CardRegister from './containers/CardRegister';
import Todos from './containers/Todos';
import NotFound from './containers/NotFound';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/todos" component={Todos} />
    <Route path="/yeah/:bandId" component={CardRegister} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
