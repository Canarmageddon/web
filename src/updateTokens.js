export default function updateToken({ setToken, token, refresh_token }) {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("refresh_token", refresh_token);
  setToken(function () {
    return token;
  });
}
