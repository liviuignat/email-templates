import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {push as pushState} from 'react-router-redux';
import {Paper} from 'universal/components';
import {signUpAction} from 'universal/redux/reducers/auth/actionCreators';
import SignUpForm from './SignUpForm';

@connect(
  state => ({
    user: state.auth.user,
    signingUp: state.auth.signingUp,
    signUpError: state.auth.signUpError
  }), {
    initialize,
    pushState,
    signUpAction
  })
export default class SignUpPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    signUpAction: PropTypes.func.isRequired,
    signingUp: PropTypes.bool,
    signUpError: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('signup', {});
  }

  handleSubmit(data) {
    this.props.signUpAction(data.email, data.password);
  }

  render() {
    const styles = require('./SignUpPage.scss');
    const {
      signingUp,
      signUpError
    } = this.props;

    return (
      <Paper className={styles.SignUpPage}>
        <h4>Sign Up</h4>
        <SignUpForm
          onSubmit={::this.handleSubmit}
          isSigningUp={signingUp || false}
          signUpError={signUpError}
           />

        <Link className={''} to="/auth/login">Want to login?</Link>
      </Paper>
    );
  }
}
