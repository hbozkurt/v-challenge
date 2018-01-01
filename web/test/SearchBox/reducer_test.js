import { reducer, types as t} from '../../src/SearchBox';

describe('SearchBox reducer', () => {

  it('should return default state when action type is none', () => {
    const action = { type: 'OTHER_ACTION_TYPE' };
    const defaultState = {
      items: [],
      msg: '',
      loading: false,
    };
    expect(reducer(undefined, action)).toEqual(defaultState);
  });

  it('should return correct state when action type is SEARCH_REQUESTED', () => {
    const action = { type: t.SEARCH_REQUESTED };
    expect(reducer({}, action)).toEqual({ loading: true, items: [] });
  });

  it('should return correct state when action type is SEARCH_SUCCEEDED', () => {
    const action = { type: t.SEARCH_SUCCEEDED, items: [{ foo: 'bar' }] };
    expect(reducer({}, action)).toEqual({ loading: false, items: action.items });
  });

  it('should return correct state when action type is SEARCH_FAILED', () => {
    const action = { type: t.SEARCH_FAILED, msg: 'lorem ipsum' };
    expect(reducer({}, action)).toEqual({ loading: false, items: [], msg: action.msg });
  });

  it('should return correct state when action type is SEARCH_CANCELED', () => {
    const action = { type: t.SEARCH_CANCELED };
    expect(reducer({}, action)).toEqual({ loading: false, items: [], msg: '' });
  });
});