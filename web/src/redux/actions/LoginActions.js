import jwtAuthService from "../../services/jwtAuth.service";
import history from "../../history";

import * as utils from "../../utils/formatters";
import AppNotification from "../../shared/appNotification";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService.loginWithEmailAndPassword(email, password).then(
      async (user_access) => {
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        new AppNotification({
          type:"error",
          msg:utils.processErrors(error)
        })
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}



export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}


