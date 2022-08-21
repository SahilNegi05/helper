import React from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../actions/user-action-types';
import { InputLabel, MenuItem, FormControl, Select, TextField, Box, TextareaAutosize, Button, Checkbox, FormControlLabel } from '@mui/material';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [form, setState] = React.useState({
    confirm_password: '',
    old_password: '',
    password: '',
  });
  const {
    confirm_password, old_password, password,
  } = form;

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setState(updates);
  };

  const onSave = () => {
    if (!old_password.trim()) {
      alert('Please enter your current password');

      return;
    }

    if (!password.trim()) {
      alert('Please enter your new password');

      return;
    }

    if (!confirm_password.trim()) {
      alert('Please enter your confirm password');

      return;
    }

    const request = {
      confirm_password, old_password, password,
    };

    dispatch(changePassword(request));
  };

  return (
    <>
      <div class="post_job">
        <div class="post_shadow">
          <h2 className='fixed_heading'>Change Password</h2>
          <div className='feild_input'>
            <TextField
              fullWidth={true} size={"medium"}
              type="password"
              name="old_password"
              className="form-control lg password"
              placeholder="Enter Your Current Password"
              value={old_password}
              onChange={onChange}
            />
          </div>

          <div className='feild_input'>
            <TextField
              fullWidth={true} size={"medium"}
              type="password"
              name="password"
              className="form-control lg password"
              placeholder="Enter Your New Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className='feild_input'>
            <TextField
              fullWidth={true} size={"medium"}
              type="password"
              name="confirm_password"
              className="form-control lg password"
              placeholder="Re-enter Your New Password"
              value={confirm_password}
              onChange={onChange}
            />
          </div>

          <div className='feild_input'>
            <Button variant="contained" size="large" fullWidth={true} onClick={onSave}>Save Changes</Button>
          </div>

        </div>

      </div>


    </>
  );
};

export default ChangePassword;
