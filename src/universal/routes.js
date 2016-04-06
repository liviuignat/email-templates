import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isUserLoaded, loadUserAction } from './redux/reducers/auth';
import {
    AppContainer,
    HomePage,
    DocumentationPage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    ProjectListPage,
    ProjectDetailPage,
    LayoutDetailPage,
    TemplateDetailPage,
    MyAccountPage,
    NotFoundPage,
    ReactDesignerPage
  } from './containers';

const REDIRECT_URL_LOGGED_IN = '/app/projects';
const REDIRECT_URL_LOGGED_OUT = '/auth/login';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, REDIRECT_URL_LOGGED_OUT);
      }
      cb();
    }

    if (!isUserLoaded(store.getState())) {
      store.dispatch(loadUserAction()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireNotLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replaceState(null, REDIRECT_URL_LOGGED_IN);
      }
      cb();
    }

    if (!isUserLoaded(store.getState())) {
      store.dispatch(loadUserAction()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} onEnter={requireNotLogin} />
      <Route path="auth/login" component={LoginPage} onEnter={requireNotLogin} />
      <Route path="auth/sign-up" component={SignUpPage} onEnter={requireNotLogin} />
      <Route path="documentation" component={DocumentationPage} />

      <Route onEnter={requireLogin}>
        <Route path="app" component={DashboardPage} />
        <Route path="app/my-account" component={MyAccountPage}/>

        <Route path="app/projects" component={ProjectListPage} />
        <Route path="app/projects/:projectId" component={ProjectDetailPage} />
        <Route path="app/projects/:projectId/layouts/:layoutId" component={LayoutDetailPage} />
        <Route path="app/projects/:projectId/templates/:templateId" component={TemplateDetailPage} />

        <Route path="app/designer" component={ReactDesignerPage} />
      </Route>

      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  );
};
