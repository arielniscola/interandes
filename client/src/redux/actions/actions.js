import URL_API from "config";

export const SIGNIN = "SIGNIN";
export const CLIENT_CREATE = "CLIENT_CREATE";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const PRICING_CREATE = "PRICING_CREATE";
export const GET_ALL_PRICINGS = "GET_ALL_PRICINGS";
export const ERROR = "ERROR";

export const signin = (loginData) => {
  return function (dispatch) {
    fetch(`${URL_API}/users/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          dispatch({ type: SIGNIN, payload: data });
          window.localStorage.setItem("token", data.token);
        } else {
          dispatch({ type: ERROR, payload: data });
        }
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const clientCreate = (clientData) => {
  return function (dispatch) {
    fetch(`${URL_API}/clients`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          dispatch({ type: ERROR, payload: data });
        } else {
          dispatch({ type: CLIENT_CREATE, payload: data });
        }
      })

      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const getAllClients = () => {
  return function (dispatch) {
    fetch(`${URL_API}/clients`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_ALL_CLIENTS, payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const pricingCreate = (clientData) => {
  return function (dispatch) {
    fetch(`${URL_API}/pricing`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(clientData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch({ type: PRICING_CREATE, payload: data });
        } else {
          dispatch({ type: ERROR, payload: data });
        }
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const getAllPricing = () => {};
