import React from 'react';
import PropTypes from 'prop-types';
import { optimizedResize } from '../utils';

class Resize extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    optimizedResize.add(this.onResize.bind(this));
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }

  onResize(e) {
    const width = e.target.innerWidth;
    const height = e.target.innerHeight;

    this.setState({ width, height });
  }

  render() {
    const { width, height } = this.state;
    return this.props.children(width, height);
  }
}

export default Resize;
