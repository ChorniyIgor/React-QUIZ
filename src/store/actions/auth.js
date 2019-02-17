import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionsType";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const data = { email, password, returnSecureToken: true };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCUPw3luvf53bSd94HpaTb3i1ZJJBZlTJM";

    if (isLogin) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCUPw3luvf53bSd94HpaTb3i1ZJJBZlTJM";
    }

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const result = await resp.json();

    const expirationDate = new Date(new Date().getTime() + result.expiresIn * 1000);
    localStorage.setItem("token", result.idToken);
    localStorage.setItem("userId", result.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(result.idToken));
    dispatch(autoLogout(result.expiresIn));
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem("expirationDate");
      if (new Date() < new Date(expirationDate)) {
        dispatch(authSuccess(token));
        console.log();
        dispatch(autoLogout((new Date(expirationDate) - new Date()) / 1000));
      } else {
        dispatch(logout());
        console.log("authlogout");
      }
    }
  };
}
