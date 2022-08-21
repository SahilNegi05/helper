import React from 'react';
import { useDispatch } from 'react-redux';
import { shape, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Button from './button';
import { toggleDrawerMenu } from '../actions/app-action-types';
import { USER_SUPER_ADMIN, USER_SCHOOL_ADMIN } from '../constants';

const Drawer = ({
  activeDrawerMenu, user,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick = (payload) => {
    const activeMenu = payload === activeDrawerMenu ? null : payload;

    dispatch(toggleDrawerMenu(activeMenu));
  };

  const onLinkClick = (event) => {
    dispatch(toggleDrawerMenu(null));

    event.preventDefault();
  };

  const getActive = (url) => {
    const activePathname = location.pathname;

    return activePathname.indexOf(url) > -1;
  };

  const onDropDownHide = () => {
    dispatch(toggleDrawerMenu(null));
  };

  // const onDropDownShow = (payload) => {
  //   const activeMenu = payload === activeDrawerMenu ? null : payload;

  //   dispatch(toggleDrawerMenu(activeMenu));
  // };

  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div>
            <Button onClick={() => {}} type="button" className="hamburger close-sidebar-btn hamburger--elastic">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <Button
            onClick={() => {}}
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6" />
            </span>
          </Button>
        </span>
      </div>
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu mt-4">
            <li>
              <Link to="/dashboard" className={getActive('/dashboard') ? 'mm-active' : ''} onClick={location.pathname === '/dashboard' ? onLinkClick : onDropDownHide}>
              <i className="metismenu-icon pe-7s-home" />
                Home
              </Link>
              <Link to="/tickets" className={getActive('/tickets') ? 'mm-active' : ''} onClick={location.pathname === '/tickets' ? onLinkClick : onDropDownHide}>
                <i className="metismenu-icon pe-7s-ticket" />
                Generic CRM Tickets
              </Link>
              <Link to="/others" className={getActive('/others') ? 'mm-active' : ''} onClick={location.pathname === '/others' ? onLinkClick : onDropDownHide}>
                <i className="metismenu-icon pe-7s-more" />
                Other Pages
              </Link>
              {/* <Link to="/tickets" className={getActive('/tickets') ? 'mm-active' : ''} onClick={location.pathname === '/tickets' ? onLinkClick : onDropDownHide}>
              <i className="metismenu-icon pe-7s-more" />
                More
              </Link> */}
            </li>
            {user?.user_type_id === USER_SUPER_ADMIN && (
              <li>
                <Link to="/schools" className={getActive('/schools') ? 'mm-active' : ''} onClick={location.pathname === '/schools' ? onLinkClick : onDropDownHide}>
                  <i className="metismenu-icon pe-7s-cloud-upload" />
                  Schools
                </Link>
              </li>
            )}
            {user?.user_type_id === USER_SCHOOL_ADMIN && (
              <>
                <li className={`has-dropdown ${activeDrawerMenu === 'classes-management' ? 'mm-active' : ''}`}>
                  <a href='javascript:void(0);' className="dropdownToggle" onClick={() => onClick('classes-management')}>
                    <i className="metismenu-icon pe-7s-display2" />
                    Classes Management
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul className={`mm-collapse ${activeDrawerMenu === 'classes-management' ? 'mm-show' : ''}`}>
                    <li>
                      <Link to="/grades" className={location.pathname === '/grades' ? 'mm-active' : ''} onClick={location.pathname === '/grades' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Grades
                      </Link>
                    </li>
                    <li>
                      <Link to="/classes" className={location.pathname === '/classes' ? 'mm-active' : ''} onClick={location.pathname === '/classes' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Classes
                      </Link>
                    </li>
                    <li>
                      <Link to="/classes-schedule" className={location.pathname === '/classes-schedule' ? 'mm-active' : ''} onClick={location.pathname === '/classes-schedule' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Schedule
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`has-dropdown ${activeDrawerMenu === 'student-management' ? 'mm-active' : ''}`}>
                  <a href='javascript:void(0);' className="dropdownToggle" onClick={() => onClick('student-management')}>
                    <i className="metismenu-icon pe-7s-display2" />
                    Student Management
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul className={`mm-collapse ${activeDrawerMenu === 'student-management' ? 'mm-show' : ''}`}>
                    <li>
                      <Link to='/school-students' className={getActive('/school-students') ? 'mm-active' : ''} onClick={location.pathname === '/school-students' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Students
                      </Link>
                    </li>
                    <li>
                      <Link to="/attendance" className={location.pathname === '/attendance' ? 'mm-active' : ''} onClick={location.pathname === '/attendance' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Attendance
                      </Link>
                    </li>
                    <li>
                      <Link to="/send-message" className={location.pathname === '/send-message' ? 'mm-active' : ''} onClick={location.pathname === '/send-message' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Send Broadcast
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/enrollments" className={location.pathname === '/enrollments' ? 'mm-active' : ''} onClick={location.pathname === '/enrollments' ? onLinkClick : onDropDownHide}>
                    <i className="metismenu-icon pe-7s-display2" />
                    Enrollment
                  </Link>
                </li>
                <li>
                  <Link to="/school-wall" className={location.pathname === '/school-wall' ? 'mm-active' : ''} onClick={location.pathname === '/school-wall' ? onLinkClick : onDropDownHide}>
                    <i className="metismenu-icon pe-7s-display2" />
                    School Wall
                  </Link>
                </li>
                <li className={`has-dropdown ${activeDrawerMenu === 'finance' ? 'mm-active' : ''}`}>
                  <a href='javascript:void(0);' className="dropdownToggle" onClick={() => onClick('finance')}>
                    <i className="metismenu-icon pe-7s-display2" />
                    Finance
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul className={`mm-collapse ${activeDrawerMenu === 'finance' ? 'mm-show' : ''}`}>
                    <li>
                      <Link to="/cost-of-item" className={location.pathname === '/cost-of-item' ? 'mm-active' : ''} onClick={location.pathname === '/cost-of-item' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Cost Item
                      </Link>
                    </li>
                    <li>
                      <Link to="/cost-reason" className={location.pathname === '/cost-reason' ? 'mm-active' : ''} onClick={location.pathname === '/cost-reason' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Cost Reason
                      </Link>
                    </li>
                    <li>
                      <Link to="/source-of-income" className={location.pathname === '/source-of-income' ? 'mm-active' : ''} onClick={location.pathname === '/source-of-income' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Source of Income
                      </Link>
                    </li>
                    <li>
                      <Link to="/income-reasons" className={location.pathname === '/income-reasons' ? 'mm-active' : ''} onClick={location.pathname === '/income-reasons' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Income Reasons
                      </Link>
                    </li>
                    <li>
                      <Link to="/payment-types" className={location.pathname === '/payment-types' ? 'mm-active' : ''} onClick={location.pathname === '/payment-types' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Payment type
                      </Link>
                    </li>
                    <li>
                      <Link to="/outflows" className={location.pathname === '/outflows' ? 'mm-active' : ''} onClick={location.pathname === '/outflows' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Outflows
                      </Link>
                    </li>
                    <li>
                      <Link to="/entries" className={location.pathname === '/entries' ? 'mm-active' : ''} onClick={location.pathname === '/entries' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Entries
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`has-dropdown ${activeDrawerMenu === 'settings' ? 'mm-active' : ''}`}>
                  <a href='javascript:void(0);' className="dropdownToggle" onClick={() => onClick('settings')}>
                    <i className="metismenu-icon pe-7s-display2" />
                    Settings
                    <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                  </a>
                  <ul className={`mm-collapse ${activeDrawerMenu === 'settings' ? 'mm-show' : ''}`}>
                    <li>
                      <Link to="/installments" className={location.pathname === '/installments' ? 'mm-active' : ''} onClick={location.pathname === '/installments' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Installment
                      </Link>
                    </li>
                    <li>
                      <Link className={location.pathname === '/school-year' ? 'mm-active' : ''} to="/school-year" onClick={location.pathname === '/school-year' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        School Year
                      </Link>
                    </li>
                    <li>
                      <Link to="/income-forecast" className={getActive('/income-forecast') ? 'mm-active' : ''} onClick={location.pathname === '/income-forecast' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Income Forecast
                      </Link>
                    </li>
                    <li>
                      <Link to="/expenses-forecast" className={getActive('/expenses-forecast') ? 'mm-active' : ''} onClick={location.pathname === '/expenses-forecast' ? onLinkClick : onDropDownHide}>
                        <i className="metismenu-icon" />
                        Expenses Forecast
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/school-information/${user.school_id}`}
                        className={getActive('/school-information') ? 'mm-active' : ''}
                        onClick={getActive('/school-information') ? onLinkClick : onDropDownHide}
                      >
                        <i className="metismenu-icon" />
                        School information
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  activeDrawerMenu: string,
  user: shape({ name: string.isRequired }),
};

Drawer.defaultProps = {
  activeDrawerMenu: null,
  user: null,
};

export default Drawer;
