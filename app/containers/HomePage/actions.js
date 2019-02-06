/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { DATA_LIST_REQUEST, DATA_LIST_SUCCESS, DATA_LIST_ERROR } from './constants';

export function dataListRequest() {
  return {
    type: DATA_LIST_REQUEST
  };
}

export function dataListSuccess(data) {
  return {
    type: DATA_LIST_SUCCESS,
    data,
  };
}

export function dataListError(data) {
  return {
    type: DATA_LIST_ERROR,
    data,
  };
}
