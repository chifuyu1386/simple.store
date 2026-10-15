import type { PaymentInfo, ShippingAddress } from "../types/checkout";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// ─── آدرس ───
export function validateShipping(
  values: ShippingAddress
): ValidationErrors<ShippingAddress> {
  const errors: ValidationErrors<ShippingAddress> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "نام و نام خانوادگی الزامیه";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "نام حداقل ۳ کاراکتره";
  }

  if (!values.email.trim()) {
    errors.email = "ایمیل الزامیه";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "ایمیل معتبر نیست";
  }

  if (!values.phone.trim()) {
    errors.phone = "شماره تماس الزامیه";
  } else if (!/^09\d{9}$/.test(values.phone)) {
    errors.phone = "شماره باید با ۰۹ شروع شه و ۱۱ رقم باشه";
  }

  if (!values.address.trim()) {
    errors.address = "آدرس الزامیه";
  } else if (values.address.trim().length < 10) {
    errors.address = "آدرس حداقل ۱۰ کاراکتره";
  }

  if (!values.city.trim()) {
    errors.city = "شهر الزامیه";
  }

  if (!values.postalCode.trim()) {
    errors.postalCode = "کد پستی الزامیه";
  } else if (!/^\d{10}$/.test(values.postalCode)) {
    errors.postalCode = "کد پستی باید ۱۰ رقم باشه";
  }

  return errors;
}

// ─── پرداخت ───
export function validatePayment(
  values: PaymentInfo
): ValidationErrors<PaymentInfo> {
  const errors: ValidationErrors<PaymentInfo> = {};

  const cleanCard = values.cardNumber.replace(/\s/g, "");
  if (!cleanCard) {
    errors.cardNumber = "شماره کارت الزامیه";
  } else if (!/^\d{16}$/.test(cleanCard)) {
    errors.cardNumber = "شماره کارت باید ۱۶ رقم باشه";
  }

  if (!values.cardHolder.trim()) {
    errors.cardHolder = "نام دارنده کارت الزامیه";
  } else if (values.cardHolder.trim().length < 3) {
    errors.cardHolder = "نام حداقل ۳ کاراکتره";
  }

  if (!values.expiry.trim()) {
    errors.expiry = "تاریخ انقضا الزامیه";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) {
    errors.expiry = "فرمت صحیح: MM/YY";
  }

  if (!values.cvv.trim()) {
    errors.cvv = "CVV الزامیه";
  } else if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = "CVV باید ۳ یا ۴ رقم باشه";
  }

  return errors;
}