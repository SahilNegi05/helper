import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../components';
import { fetchMyProfileDetail } from '../../actions/user-action-types';

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userDetail);

  React.useEffect(() => {
    //dispatch(fetchMyProfileDetail());
  }, []);

  return (
    <div className="mb-5">
      <h4>LG User profile page</h4>
      {/* <div className="card-body">
        <div className="row">
          <div className="col-lg-12 m-auto px-0 px-lg-3">
            <div className="card-hover-shadow profile-responsive card-border border-success card">
              <div className="d-flex flex-fill">
                <div className="col-sm-4 bg-success p-4 text-center d-flex align-items-center justify-content-center">
                  <div className="menu-header-content">
                    <div className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xxl">
                      <div className="avatar-icon rounded">
                        <img src={user.profile_picture || 'public/images/avatars/1.jpg'} alt="Profile Pic" />
                      </div>
                    </div>
                    <div>
                      <h5 className="menu-header-title text-white">Testing Team</h5>
                      <Button
                        onClick={() => dispatch(push('/edit-profile'))}
                        className="btn btn-dark text-white btn-pill px-4 mt-3"
                      >
                        Edit
                      </Button>
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
                        <td className="py-2">{user ? user.email : ''}</td>
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
                        <td className="py-2">{user ? user.phone_number : ''}</td>
                      </tr>
                      {/* <tr>
                        <td>
                          <i className="pe-7s-note2 h4 mb-0 mt-1"> </i>
                        </td>
                        <td className="py-2">
                          {' '}
                          <b>Subject</b>
                        </td>
                        <td className="py-2" width={20} align="center">
                          <b>:</b>
                        </td>
                        <td className="py-2">Maths, English, Science</td>
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
                      </tr>
                       <tr>
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
                      </tr>
                      <tr>
                        <td colSpan={4}>
                          <Button
                            onClick={() => dispatch(push('/change-password'))}
                            className="mb-2 mr-2 btn-pill btn btn-primary px-4 mt-3"
                          >
                            Change Password
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
      </div>*/}
    </div>
  );
};

export default MyProfile;
