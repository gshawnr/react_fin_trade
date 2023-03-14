import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  try {
    switch (action.type) {
      default:
        return state;
    }
  } catch (err) {
    const { message = "Something went wrong. Please try again" } = err;
    return { ...state, errorMessage: message };
  }
};

const signin = (dispatch) => {
  return ({ username, password }) => {
    dispatch({ action: "signin", payload: { username, password } });
  };
};

const signup = (dispatch) => {
  return ({ username, password }) => {
    return dispatch({ action: "signup", payload: { username, password } });
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup },
  {
    isLoading: true,
    isSignedIn: false,
    errorMessage: "",
  }
);
