import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components';
import { changePassword } from '../../actions/user-action-types';

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
    <div className="mb-5">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 m-auto px-0 px-lg-3">
            <div className="card-hover-shadow profile-responsive card-border border-primary card d-flex">
              <h4 className="text-center mt-4">Change Password</h4>
              <div className="py-3 px-5">
                <form noValidate autoComplete="off">
                  <div className="form-group">
                    <input
                      type="password"
                      name="old_password"
                      className="form-control lg password"
                      placeholder="Enter Your Current Password"
                      value={old_password}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control lg password"
                      placeholder="Enter Your New Password"
                      value={password}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirm_password"
                      className="form-control lg password"
                      placeholder="Re-enter Your New Password"
                      value={confirm_password}
                      onChange={onChange}
                    />
                  </div>
                </form>
                <Button className="mb-2 mr-2 btn-pill btn btn-primary px-4 py-2 mt-2 btn-block" onClick={onSave}>
                  <h6 className="mt-1 text-white">Save Changes</h6>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
