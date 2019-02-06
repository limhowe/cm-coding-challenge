/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, takeLatest, fork
} from 'redux-saga/effects';

import request from 'utils/request';

import {
  dataListSuccess,
  dataListError
} from './actions';

import { DATA_LIST_REQUEST } from './constants';

export function* dataListRequest() {
  try {
    const data = yield call(request, '/static/data.json', {
      method: 'GET'
    });
    yield put(dataListSuccess(data));
  } catch (err) {
    yield put(dataListError(err));
  }
}

export default function* homeSaga() {
  return yield [
    fork(takeLatest, DATA_LIST_REQUEST, dataListRequest),
  ];
}
