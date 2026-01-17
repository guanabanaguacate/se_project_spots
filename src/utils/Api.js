class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._header = headers;
  }

  getAppInfo() {
  return Promise.all([
    this.getUserInfo(),
    this.getInitialCards(),
  ]);
}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

//CREATE ANOTHER METHOD, getUserInfo (DIFFERENT BASE URL)
getUserInfo(){
  return fetch(`${this._baseUrl}/users/me`, {
    //??headers: this._headers,
    //??body:JSON.stringify({
    //name,
    //about,})
  }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
}

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

}

export default Api;
