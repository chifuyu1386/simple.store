import { Link } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "../components/ui";

export function OrderSuccessPage() {
  // یه شماره سفارش رندوم برای نمایش
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 animate-in zoom-in duration-500">
        <CheckCircle2 className="h-12 w-12" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          سفارش شما ثبت شد!
        </h1>
        <p className="text-gray-600">
          از خرید شما سپاسگزاریم. سفارش به‌زودی پردازش می‌شه.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">شماره سفارش</span>
          <span className="font-mono font-bold text-gray-900" dir="ltr">
            {orderNumber}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">وضعیت</span>
          <span className="text-green-600 font-medium">در حال پردازش</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">زمان ثبت</span>
          <span className="text-gray-900">
            {new Date().toLocaleDateString("fa-IR")}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link to="/products">
          <Button size="lg">
            <Package className="h-5 w-5" />
            ادامه خرید
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="lg">
            بازگشت به خانه
          </Button>
        </Link>
      </div>
    </div>
  );
}