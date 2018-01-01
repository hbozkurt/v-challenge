import { call, put, takeLatest } from 'redux-saga/effects';
import Api from './api';
import * as t from './types';

export function onChange(keyword) {
  return { type: t.KEYWORD_CHANGED, payload: { keyword } };
}

export function* fetchSearchResult(keyword) {
  try {
    const items = yield call(Api.search, keyword);
    yield put({ type: t.SEARCH_SUCCEEDED, items });
  } catch (e) {
    yield put({ type: t.SEARCH_FAILED, msg: e.message });
  }
}

// this action handles search keyword changes
// if the keyword length more than 2, it dispatches SEARCH_REQUESTED action to render a loading icon
// and make an api request to fetch search result
// if the keyword length is less than 3, it cancels search request
export function* handleChange(action) {
  const { keyword } = action.payload;

  if (keyword.length >= 3) {
    yield put({ type: t.SEARCH_REQUESTED });
    yield call(fetchSearchResult, keyword);
  } else {
    yield put({ type: t.SEARCH_CANCELED });
  }
}

// this saga watches KEYWORD_CHANGED action in the sagaMiddleware
export function* searchSaga() {
  yield takeLatest(t.KEYWORD_CHANGED, handleChange);
}
