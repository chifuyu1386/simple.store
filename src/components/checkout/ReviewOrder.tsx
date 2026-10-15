import { MapPin, CreditCard, Package } from "lucide-react";
import type { PaymentInfo, ShippingAddress } from "../../types/checkout";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

interface ReviewOrderProps {
  shipping: ShippingAddress;
  payment: PaymentInfo;
}

export function ReviewOrder({ shipping, payment }: ReviewOrderProps) {
  const { items, subtotal } = useCart();

  return (
    <div className="space-y-6">
      {/* آدرس */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-gray-900">آدرس ارسال</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
          <p className="font-medium text-gray-900">{shipping.fullName}</p>
          <p>{shipping.address}</p>
          <p>
            {shipping.city} — کد پستی {shipping.postalCode}
          </p>
          <p className="text-gray-500 pt-1">{shipping.phone}</p>
          <p className="text-gray-500">{shipping.email}</p>
        </div>
      </section>

      {/* کارت */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-gray-900">اطلاعات پرداخت</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-mono" dir="ltr">
            •••• •••• •••• {payment.cardNumber.replace(/\s/g, "").slice(-4)}
          </p>
          <p className="mt-1">{payment.cardHolder}</p>
        </div>
      </section>

      {/* محصولات */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Package className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            محصولات ({items.length})
          </h3>
        </div>
        <div className="bg-gray-50 rounded-xl divide-y divide-gray-200">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3 p-3"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500">
                  {item.quantity.toLocaleString("fa-IR")} عدد
                </p>
              </div>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                {formatPrice(
                  item.product.price *
                    (1 - item.product.discountPercentage / 100) *
                    item.quantity
                )}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2 text-left">
          جمع اقلام: {formatPrice(subtotal)}
        </p>
      </section>
    </div>
  );
}