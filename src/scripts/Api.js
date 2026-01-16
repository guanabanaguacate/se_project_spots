class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "447cc5c7-8732-411c-ac01-1b197e9caa1d"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default Api;