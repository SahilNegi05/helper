import React from 'react';
import { any } from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="internal-server">
          <div className="internal-server-body">
            <div className="container">
              <img alt='internal server error' src="https://i.imgur.com/qIufhof.png" />
              <h1>
                <span>500</span>
                <br />
                Internal server error
              </h1>
              <p>We are currently trying to fix the problem.</p>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = { children: any.isRequired };
