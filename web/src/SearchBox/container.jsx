import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';
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

  handleChange = debounce(this.props.onChange, 200)

  render() {
    return (
      <div className="search-box">
        <Input
          disabled={this.props.disabled}
          placeholder={PLACEHOLDER}
          onChange={e => this.handleChange(e.target.value.toLowerCase())}
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

const getViewFields = item => ({ key: item.sku, text: item.name });

const mapStateToProps = state => ({
  items: state.searchBox.items.map(getViewFields),
  loading: state.searchBox.loading,
  showDropdown: (state.searchBox.loading || state.searchBox.items.length > 0),
});

const mapDispatchToProps = dispatch => ({
  onChange: bindActionCreators(actions.onChange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
