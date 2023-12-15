import {
  SIGNIN,
  CLIENT_CREATE,
  GET_ALL_CLIENTS,
  PRICING_CREATE,
  GET_ALL_PRICINGS,
  ERROR,
} from "redux/actions/actions";

const initialState = {
  userLogged: {},
  error: {},
  clientForm: {},
  clients: [],
  pricings: [],
  pricingForm: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        userLogged: action.payload.user,
      };
    case CLIENT_CREATE:
      return {
        ...state,
        clientForm: action.payload,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case PRICING_CREATE:
      return {
        ...state,
        pricingForm: action.payload,
      };
    case GET_ALL_PRICINGS:
      return {
        ...state,
        pricings: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_ERROR":
      return {
        ...state,
        error: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
