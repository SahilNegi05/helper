import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Button from '../button';

const ProfileDropDown = ({
  handleDrawerMenu, open, onClick, onLogout, user,
}) => {
  const location = useLocation();
  const dropdownRef = React.useRef(null);

  const handleBodyClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      onClick(false);
    }
  };

  React.useEffect(() => {
    document.getElementsByClassName('skulman')[0].addEventListener('click', handleBodyClick);

    return () => {
      document.getElementsByClassName('skulman')[0].removeEventListener('click', handleBodyClick);
    };
  }, []);

  const onActive = () => {
    onClick(true);
    handleDrawerMenu();
  };

  return (
    <div ref={dropdownRef} className="header-btn-lg pr-0">
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div role='presentation' className={`btn-group ${open ? 'show' : ''}`} onClick={onActive}>
              <a href='javascript:void(0);' data-toggle="dropdown" aria-expanded="false" className="p-0 btn">
                <img
                  width={42}
                  height={42}
                  className="rounded-circle"
                  src={encodeURI(user.profile_picture) || '..\images\the-secretaries.jpg'}
                  alt="Profile"
                />
                <i className="fa fa-angle-down ml-2 opacity-8" />
              </a>
              <div
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className={`dropdown-menu dropdown-menu-right ${open ? 'show' : ''}`}
              >
                <Link
                  to="/my-profile"
                  className={`${
                    location.pathname === '/my-profile' ? 'active' : ''
                  } dropdown-item d-flex align-items-center px-2`}
                >
                  <i className="lnr-user h6 my-0 col-2 px-0 text-center" />
                  My Profile
                </Link>
                <Link
                  to="/change-password"
                  className={`${
                    location.pathname === '/change-password' ? 'active' : ''
                  } dropdown-item d-flex align-items-center px-2`}
                >
                  <i className="pe-7s-key h5 my-0 col-2 px-0 text-center"> </i>
                  Change Password
                </Link>
                <Button className="dropdown-item d-flex align-items-center px-2" onClick={onLogout}>
                  <i className="lnr-power-switch h5 my-0 col-2 px-0 text-center"> </i>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
          <div className="widget-content-left  ml-3 header-user-info">
            <div className="widget-heading">Tripleplay</div>
            <div className="widget-subheading"> Employee</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDropDown.propTypes = {
  handleDrawerMenu: func.isRequired,
  onClick: func.isRequired,
  onLogout: func.isRequired,
  open: bool.isRequired,
  user: shape({ name: string.isRequired }),
};

ProfileDropDown.defaultProps = { user: null };

export default ProfileDropDown;
