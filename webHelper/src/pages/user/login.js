import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { InputLabel, MenuItem, FormControl, Select, TextField, Box, TextareaAutosize, Button, Checkbox, FormControlLabel } from '@mui/material';
import { login, genearteOtp } from '../../actions/user-action-types';
import Regex from '../../utility/regex';
import { NavLink } from 'react-router-dom';
// import Facebook from '../../components/facebook'
// import GoogleData from '../../components/gmail';

const Login = () => {
  const dispatch = useDispatch();
  const getAuthToken = useSelector((state) => state.user.tempToken)
  const getOtpStatus = useSelector((state) => state.user.otpSent)
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    OTP: '',
    remember: false,
  });
  const {
    email, password, remember, OTP
  } = form;

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updates);
  };



  const onNavigate = () => {
    const path = '/forgot-password';

    dispatch(push(path));
  };

  const onRemember = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.checked,
    };

    setForm(updates);
  };

  const onLogin = () => {
    if (email === '') {
      alert('Please enter a valid email address');
      return;
    }

    if (password === '') {
      alert('Please enter a valid password');
      return;
    }





    const request = {
      username: email,
      passwd: password,
    };

    dispatch(genearteOtp(request));
  };

  const onChangePassword = (e) => {


    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    onLogin()

    setForm(updates);
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      if (email === '') {
        alert('Please enter a valid email address');

        return;
      }

      if (password === '') {
        alert('Please enter a valid password');

        return;
      }

      const request = {
        emailId: email,
        mobileNo: password,
      };
      dispatch(genearteOtp(request));
    }
  };

  const onEnterPressPassword = (e) => {
    if (e.key === 'Enter') {
      if (email === '') {
        alert('Please enter a valid email address');

        return;
      }

      if (password === '') {
        alert('Please enter a valid password');

        return;
      }

      const request = {
        emailId: email,
        mobileNo: password,
      };
      dispatch(login(request));
    }
  };

  return (
    <>

      <div class="post_job">
        <div class="post_shadow">
          <h2 className='fixed_heading'>Login</h2>
          <div className='feild_input'>
            <TextField name="email" fullWidth={true} size={"medium"} id="email-address" label="Email Address" variant="outlined"
              onChange={onChange}
              value={email}
              onKeyPress={onEnterPress}
            />

          </div>
          <div className='feild_input'>
            <TextField fullWidth={true} id="password" name="password" type="password" label="Password" variant="outlined" onChange={onChange}
              value={password}
              onKeyPress={onEnterPressPassword} />

          </div>

          <div className='feild_input'>
            <Button onClick={onLogin} variant="contained" size="large" fullWidth={true}>SUBMIT</Button>

          </div>

          <div className='feild_input'>
            Don't Have Account? <NavLink to='/registration'>Sign Up</NavLink>
          </div>
          <div>
          </div>
        </div>

      </div>

    </>
  );
};

export default Login;