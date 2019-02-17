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

    dispatch(authSuccess(result));
    dispatch(autoLogout(result.expiresIn));
    console.log(result);
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

export function authSuccess(data) {
  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
  localStorage.setItem("token", data.idToken);
  localStorage.setItem("userId", data.localId);
  localStorage.setItem("expirationDate", expirationDate);
  return {
    type: AUTH_SUCCESS,
    token: data.idToken
  };
}
