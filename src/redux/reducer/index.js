import ActionType from "../actions/index";

const globalState = {
  Auth: {
    USER_ID: null,
    CLIENT_KEY: null,
    SESSION_LOGIN_ID: null,
  },
  Loading: false,
};

const reducer = (state = globalState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_ID:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          USER_ID: action.userId,
        },
      };
    case ActionType.SET_CLIENT_KEY:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          CLIENT_KEY: action.clientKey,
        },
      };
    case ActionType.SET_SESSION_LOGIN_ID:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          SESSION_LOGIN_ID: action.sessionLoginId,
        },
      };

    case ActionType.LOADING:
        return{
            ...state,
            Loading: action.loading,
        }
    default:
        return state;
  }
};

export default reducer;
