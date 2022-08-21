import React from 'react';
import { bool, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../button';

const Notifications = ({
  open, onClick,
}) => {
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

  return (
    <div className={`dropdown ${open ? 'show' : ''}`} ref={dropdownRef}>
      <Button data-toggle="dropdown" className="p-0 mr-2 btn btn-link" onClick={() => onClick(true)}>
        <span className="icon-wrapper icon-wrapper-alt rounded-circle">
          <span className="icon-wrapper-bg bg-danger" />
          <i className="icon text-danger icon-anim-pulse ion-android-notifications" />
          <span className="badge badge-dot badge-dot-sm badge-danger">Notifications</span>
        </span>
      </Button>
      <div
        tabIndex={-1}
        role="menu"
        aria-hidden="true"
        className={`dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right ${open ? 'show' : ''}`}
      >
        <div className="dropdown-menu-header mb-0">
          <div className="dropdown-menu-header-inner bg-deep-blue">
            <div
              className="menu-header-image opacity-1"
              style={{ backgroundImage: 'url("public/images/dropdown-header/city3.jpg")' }}
            />
            <div className="menu-header-content text-dark">
              <h5 className="menu-header-title">Notifications</h5>
              <h6 className="menu-header-subtitle">
                You have
                {' '}
                <b>21</b>
                {' '}
                unread messages
              </h6>
            </div>
          </div>
        </div>
        <div className="scroll-area-sm">
          <div className="scrollbar-container">
            <div className="p-3">
              <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <h4 className="timeline-title">All Hands Meeting</h4>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <p>
                      Another meeting today, at
                      {' '}
                      <b className="text-danger">12:00 PM</b>
                    </p>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <h4 className="timeline-title">Build the production release</h4>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <h4 className="timeline-title">All Hands Meeting</h4>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <h4 className="timeline-title text-success">FontAwesome Icons</h4>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <h4 className="timeline-title">Build the production release</h4>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
                <div id className="vertical-timeline-item vertical-timeline-element">
                  <span className="vertical-timeline-element-icon bounce-in" />
                  <div className="vertical-timeline-element-content bounce-in">
                    <div className="vertical-timeline-element-content-arrow" />
                    <p>
                      Another meeting today, at
                      {' '}
                      <b className="text-warning">12:00 PM</b>
                    </p>
                    <span className="vertical-timeline-element-date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item-divider nav-item" />
          <li className="nav-item-btn text-center nav-item">
            <Link to="/notifications" className="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">
              View All Notifications
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  onClick: func.isRequired,
  open: bool.isRequired,
};

export default Notifications;
