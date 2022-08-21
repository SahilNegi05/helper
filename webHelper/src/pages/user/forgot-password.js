import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { TextInput, Button } from '../../components';
import { forgotPassword } from '../../actions/user-action-types';
import Regex from '../../utility/regex';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');

  const onNavigate = () => {
    const path = '/';

    dispatch(push(path));
  };

  const onResetPasswordInstructions = () => {
    if (email === '' || !Regex.email(email)) {
      alert('Please enter a valid email address');

      return;
    }

    const request = { email };

    dispatch(forgotPassword(request));
  };

  return (
    <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
      <div className="logo">
        <img alt='logo' src="public/images/logo-n.png" />
      </div>
      <div className="forgotPwd-box mt-4">
        <h4>
          <div>Forgot your Password?</div>
          <span>Use the form below to recover it.</span>
        </h4>
        <form noValidate autoComplete="off">
          <div className="form-row">
            <div className="col-md-12">
              <TextInput
                title="Email"
                type="email"
                id="exampleEmail"
                name="email"
                placeholder="Email here..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="mt-4 d-flex align-items-center">
            <h6 className="mb-0">
              <Button className="btn-lg btn btn-link link_custom_btn" onClick={onNavigate}>
                Sign in existing account
              </Button>
            </h6>
            <div className="ml-auto">
              <Button onClick={onResetPasswordInstructions}>Recover Password</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
