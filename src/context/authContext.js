import createDataContext from "./createDataContext";
import beApi from "../api/beApi";
import { navigationHelper } from "../utils/navigationHelper";

const authReducer = (state, action) => {
  try {
    switch (action.type) {
      case "login":
        localStorage.setItem("fintradeToken", action.payload.token);
        return {
          ...state,
          isSignedIn: true,
          isLoading: false,
          errorMessage: false,
        };
      case "logout":
        localStorage.setItem("", action.payload.token);
        return { isSignedIn: false, errorMessage: false };
      case "createAccount":
        return state;
      case "setErrorMessage":
        return { ...state, errorMessage: action.payload.message };
      case "clearErrorMessage":
        return { ...state, errorMessage: "" };
      default:
        return state;
    }
  } catch (err) {
    console.log("authReducer error: ", err);
    const { message = "Something went wrong. Please try again" } = err;
    return { ...state, errorMessage: message };
  }
};

const login = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await beApi.post("/signin", { email, password });
      if (response?.data?.token) {
        dispatch({ type: "login", payload: { token: response.data.token } });
        navigationHelper.navigate("/");
      } else {
        dispatch({
          type: "setErrorMessage",
          payload: {
            message: "Oops something we wrong, please try again later.",
          },
        });
      }
    } catch (err) {
      console.log("authContext error: ", err);
      // TODO check for 401 status and handle accordingly
      dispatch({
        type: "setErrorMessage",
        payload: { message: "invalid username or password" },
      });
    }
  };
};

const createAccount = (dispatch) => {
  return ({ username, password }) => {
    return dispatch({
      action: "createAccount",
      payload: { username, password },
    });
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { login, createAccount },
  {
    isLoading: true,
    isSignedIn: false,
    errorMessage: "",
  }
);
