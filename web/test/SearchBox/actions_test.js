import { call, put, takeLatest } from 'redux-saga/effects';
import { actions, types as t, Api } from '../../src/SearchBox';

describe('SearchBox', () => {
  describe('onChange action', () => {
    it('should return KEYWORD_CHANGED type and given payload', () => {
      const keyword = 'lorem ipsum';
      expect(actions.onChange(keyword)).toEqual({ type: t.KEYWORD_CHANGED, payload: { keyword }});
    });
  });

  describe('searchSaga action', () => {
    it('should yield the latest KEYWORD_CHANGED action', () => {
      const gen = actions.searchSaga();
      expect(gen.next().value).toEqual(takeLatest(t.KEYWORD_CHANGED, actions.handleChange));
    });
  });

  describe('handleChange action', () => {
    describe('when keyword length less than 3', () => {
      it('should yield SEARCH_CANCELED action', () => {
        const action = { payload: { keyword: 'xy' }};
        const gen = actions.handleChange(action);
        expect(gen.next().value).toEqual(put({ type: t.SEARCH_CANCELED }));
      });
    });

    describe('when keyword length is greater than 2', () => {
      it('should yield SEARCH_REQUESTED action and call fetchSearchResult function', () => {
        const action = { payload: { keyword: 'lorem ipsum' }};
        const gen = actions.handleChange(action);

        expect(gen.next().value).toEqual(put({ type: t.SEARCH_REQUESTED }));
        expect(gen.next().value).toEqual(call(actions.fetchSearchResult, action.payload.keyword));
      });
    });

    describe('fetchSearchResult action', () => {
      describe('when no error is thrown', () => {
        it('should call Api.search method', () => {
          const keyword = 'lorem ipsum';
          const items = [{ foo: 'bar' }];
          const gen = actions.fetchSearchResult(keyword);
          
          expect(gen.next().value).toEqual(call(Api.search, keyword));
          expect(gen.next(items).value).toEqual(put({ type: t.SEARCH_SUCCEEDED, items }));
        });
      });
    });
  });
});