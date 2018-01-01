import * as t from './types';

const defualtState = {
  items: [],
  loading: false,
  msg: '',
};

export default function (state = defualtState, action) {
  switch (action.type) {
    case t.SEARCH_REQUESTED:
      return { ...state, loading: true, items: [] };

    case t.SEARCH_SUCCEEDED:
      return { ...state, loading: false, items: action.items };

    case t.SEARCH_FAILED:
      return { loading: false, items: [], msg: action.msg };

    case t.SEARCH_CANCELED:
      return { loading: false, items: [], msg: '' };

    default:
      return state;
  }
}
