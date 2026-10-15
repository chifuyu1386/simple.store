// شماره کارت: 1234 5678 9012 3456
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// تاریخ انقضا: 12/25
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

// شماره تلفن ایران
export function formatPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}