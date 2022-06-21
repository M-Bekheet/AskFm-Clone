import { UserActionsTypes } from './user.types';

const initialState = {
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return {
        ...state,
        details: action.payload,
      };
    case UserActionsTypes.HAS_ERROR:
      state = {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
      return state;
    default:
      return state;
  }
};
