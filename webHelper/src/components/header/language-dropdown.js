import React from 'react';
import { bool, func } from 'prop-types';
import Button from '../button';

export const LanguageDropdown = ({
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
    <div ref={dropdownRef} className={`dropdown ${open ? 'show' : ''}`}>
      <Button type="button" data-toggle="dropdown" className="p-0 mr-2 btn btn-link" onClick={() => onClick(true)}>
        <span className="icon-wrapper icon-wrapper-alt rounded-circle">
          <span className="icon-wrapper-bg bg-focus" />
          <span className="language-icon opacity-8 flag large US" />
        </span>
      </Button>
      <div
        tabIndex={-1}
        role="menu"
        className={`rm-pointers dropdown-menu dropdown-menu-right ${open ? 'show' : ''}`}
        x-placement="top-end"
      >
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
            <div
              className="menu-header-image opacity-05"
              style={{ backgroundImage: 'url("public/images/dropdown-header/city2.jpg")' }}
            />
            <div className="menu-header-content text-center text-white">
              <h6 className="menu-header-subtitle mt-0"> Choose Language</h6>
            </div>
          </div>
        </div>
        <button type="button" tabIndex={0} className="dropdown-item">
          <span className="mr-3 opacity-8 flag large US" />
          {' '}
          English
        </button>
        <button type="button" tabIndex={0} className="dropdown-item">
          <span className="mr-3 opacity-8 flag large FR" />
          {' '}
          French
        </button>
      </div>
    </div>
  );
};

LanguageDropdown.propTypes = {
  onClick: func.isRequired,
  open: bool.isRequired,
};

export default LanguageDropdown;
