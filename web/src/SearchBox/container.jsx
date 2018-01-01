import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Dropdown } from '../components';
import * as actions from './actions';

const PLACEHOLDER = "Hello, I'm looking for..";

export class SearchBox extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, text: PropTypes.string })),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    showDropdown: PropTypes.bool,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    items: [],
    loading: false,
    disabled: false,
    showDropdown: false,
    onChange: () => {},
  }

  handleChange = (e) => {
    const text = e.target.value.toLocaleLowerCase();
    this.props.onChange(text);
  }

  render() {
    return (
      <div className="search-box">
        <Input
          disabled={this.props.disabled}
          placeholder={PLACEHOLDER}
          onChange={this.handleChange}
        />

        {this.props.showDropdown && !this.props.disabled &&
          <Dropdown
            loading={this.props.loading}
            items={this.props.items}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.searchBox.items.map(i => ({ key: i.sku, text: i.name })),
  loading: state.searchBox.loading,
  showDropdown: (state.searchBox.loading || state.searchBox.items.length > 0),
});

const mapDispatchToProps = dispatch => ({
  onChange: bindActionCreators(actions.onChange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
