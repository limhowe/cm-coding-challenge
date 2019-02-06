/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { DATA_LIST_REQUEST, DATA_LIST_SUCCESS, DATA_LIST_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  data: {
    list: [],
    loading: false,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LIST_REQUEST:
      return state.setIn(['data', 'loading'], true);
    case DATA_LIST_SUCCESS:
      return state.setIn(['data', 'list'], fromJS(action.data))
        .setIn(['data', 'loading'], false);
    case DATA_LIST_ERROR:
      return state.setIn(['data', 'loading'], false);
    default:
  }

  return state;
}

export default homeReducer;
