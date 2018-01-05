import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  defaultProps = {
    children: PropTypes.object.isRequired,
  }

  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h3>Opps! Something went wrong when fetching search result.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
