const AuthModeReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        // currentUser: JSON.parse(localStorage.getItem("user")) || null,
        currentUser: window.localStorage.clear(),
      };
    }

    default:
      return state;
  }
};

export default AuthModeReducer;
