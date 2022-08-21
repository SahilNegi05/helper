import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileDetail } from '../../actions/user-action-types';
import { Button } from '../../components';
import Regex from '../../utility/regex';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userDetail);
  const [form, setState] = React.useState({
    file: user.profile_picture || null,
    image: null,
    name: user.name || '',
    phone_number: user.phone_number || '',
  });
  const {
    name, phone_number, file, image,
  } = form;

  const onChange = (e) => {
    const updates = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setState(updates);
  };

  const onSave = () => {
    if (!name.trim().length) {
      alert('Please enter your name');

      return;
    }

    if (!phone_number || !Regex.mobile(phone_number)) {
      alert('Please enter a valid phone number');

      return;
    }

    const request = {
      email: user.email,
      image,
      name,
      phone_number,
    };

    dispatch(updateProfileDetail(request));
  };

  const onFileChange = (event) => {
    if (!event?.target?.files?.length) {
      return;
    }

    const cloneFiles = [...event.target.files];
    const updates = {
      ...form,
      file: URL.createObjectURL(cloneFiles[0]),
      image: event.target.files[0],
    };

    setState(updates);
  };

  return (
    <div className="mb-5">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12 m-auto px-0 px-lg-3">
            <div className="card-hover-shadow profile-responsive card-border border-success card">
              <div className="d-flex flex-fill">
                <div className="col-sm-4 bg-success p-4 text-center d-flex align-items-center justify-content-center">
                  <div className="menu-header-content">
                    <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                      <div className="avatar-icon rounded editProfile">
                        <img src={file || 'public/images/user-placeholder.png'} alt="Profile Pic" />
                        <div className="icon">
                          <i className="lnr-pencil" />
                          <input accept=".jpeg, .png, .jpg" type="file" onChange={onFileChange} />
                        </div>
                      </div>
                    </div>
                    <div className="nameEdit">
                      <input className="menu-header-title text-white" name="name" value={name.capitalizeEachLetter()} onChange={onChange} />
                      <i className="lnr-pencil icon" />
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4">
                  <table align="center" className="text-left">
                    <tbody>
                      <tr>
                        <td className="pr-2">
                          <i className="pe-7s-mail h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Email Address</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">{user.email || ''}</td>
                      </tr>
                      <tr>
                        <td>
                          <i className="pe-7s-call h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Phone Number</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">
                          <input className="form-control" name="phone_number" onChange={onChange} value={phone_number} />
                        </td>
                      </tr>
                      {/* <tr>
                        <td>
                          <i className="pe-7s-note2 h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Subject</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">
                          <input className="form-control" defaultValue="Maths, English, Science" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="pe-7s-star h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Grade Teaching</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">4.5 Grade</td>
                      </tr> */}
                      {/* <tr>
                        <td>
                          <i className="pe-7s-bell h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Notification</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">
                          <div className="custom-control custom-switch custom-switch-md  mt-n1">
                            <input type="checkbox" className="custom-control-input" id="notification" />
                            <label className="custom-control-label" htmlFor="notification" />
                          </div>
                        </td>
                      </tr> */}
                      {/* <tr>
                        <td>
                          <i className="pe-7s-lock h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          <b>Password</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={onChange}
                            value={password}
                          />
                        </td>
                      </tr> */}
                      <tr>
                        <td colSpan={4}>
                          <Button onClick={onSave} className="mb-2 mr-2 btn-pill btn btn-success px-4 mt-3 pb-2 px-5">
                            Save
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
