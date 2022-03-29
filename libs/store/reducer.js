import * as actionTypes from "./actions";

const initialState = {
  userData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...state,
        userData: action.data,
      };
  }
  return state;
};

export default reducer;
