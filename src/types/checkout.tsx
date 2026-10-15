export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export type CheckoutStep = "shipping" | "payment" | "review";

export interface CheckoutState {
  step: CheckoutStep;
  shipping: ShippingAddress;
  payment: PaymentInfo;
  touched: Record<string, boolean>;
}

export type CheckoutAction =
  | { type: "SET_STEP"; payload: CheckoutStep }
  | { type: "UPDATE_SHIPPING"; payload: Partial<ShippingAddress> }
  | { type: "UPDATE_PAYMENT"; payload: Partial<PaymentInfo> }
  | { type: "TOUCH_FIELD"; payload: string }
  | { type: "RESET" };