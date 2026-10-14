export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatNumber(value: number): string {
  return new  Intl.NumberFormat("fa-IR").format(value)
}