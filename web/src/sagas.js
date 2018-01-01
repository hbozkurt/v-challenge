import { all } from 'redux-saga/effects';
import * as SearchBox from './SearchBox';

export default function* () {
  yield all([
    SearchBox.actions.searchSaga(),
  ]);
}
