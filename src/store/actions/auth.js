export function auth(email, pass, isLogin) {
  return async dispatch => {
    const data = { email, pass, returnSecureToken: true };

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
    console.log(resp);
    const result = await resp.json();
    console.log(result);
  };
}
