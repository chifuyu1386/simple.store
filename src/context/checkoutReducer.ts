import type { CheckoutAction, CheckoutState } from "../types/checkout";

export const initialCheckoutState: CheckoutState = {
  step: "shipping",
  shipping: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  },
  payment: {
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  },
  touched: {},
};

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };

    case "UPDATE_SHIPPING":
      return {
        ...state,
        shipping: { ...state.shipping, ...action.payload },
      };

    case "UPDATE_PAYMENT":
      return {
        ...state,
        payment: { ...state.payment, ...action.payload },
      };

    case "TOUCH_FIELD":
      return {
        ...state,
        touched: { ...state.touched, [action.payload]: true },
      };

    case "RESET":
      return initialCheckoutState;

    default:
      return state;
  }
}