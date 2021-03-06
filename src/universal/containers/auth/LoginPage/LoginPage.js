import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {push as pushState} from 'react-router-redux';
import LoginForm from './LoginForm';
import {loginAction} from 'universal/redux/reducers/auth';
import {Paper} from 'universal/components';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn
  }), {
    initialize,
    loginAction,
    pushState
  })
export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.string,
    loggingIn: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    loginAction: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('login', {});
  }

  handleSubmit(data) {
    this.props.loginAction(data.email, data.password);
  }

  render() {
    const {loggingIn, loginError} = this.props;
    const styles = require('./LoginPage.scss');

    return (
      <Paper className={styles.LoginPage}>
        <Helmet title="maildoodle - Login" />
        <h4>Login</h4>
        <LoginForm
          onSubmit={::this.handleSubmit}
          isLoggingIn={loggingIn || false}
          loginError={loginError}/>

        <Link className={''} to="/auth/sign-up">Sign Up</Link>
      </Paper>
    );
  }
}
