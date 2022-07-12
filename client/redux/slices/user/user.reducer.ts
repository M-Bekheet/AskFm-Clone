import { UserActionsTypes } from './user.types';

const initialState = {
  isAuth: false,
  details: {},
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return {
        ...initialState,
        details: action.payload,
        isAuth: true,
        error: null,
      };

    case UserActionsTypes.LOGOUT:
      return initialState;

    case UserActionsTypes.HAS_ERROR:
      state = {
        ...initialState,
        error: action.payload.error,
      };
      return state;

    case UserActionsTypes.IS_LOADING:
      state.isLoading = true;
      return state;

    default:
      return state;
  }
};
