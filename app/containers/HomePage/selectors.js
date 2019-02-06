/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectDataList = () => createSelector(
  selectHome,
  (dataState) => dataState.getIn(['data', 'list']),
);

const makeSelectDataListLoading = () => createSelector(
  selectHome,
  (dataState) => dataState.getIn(['data', 'loading']),
);


export {
  makeSelectDataList,
  makeSelectDataListLoading
};
