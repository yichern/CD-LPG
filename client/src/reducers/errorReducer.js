import { GET_ERRORS, CLEAR_ERRORS, RETURN_SUCCESS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    case RETURN_SUCCESS:
      return {
        msg: {},
        status: action.payload.status,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
