import { useEffect, useReducer, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  checkoutReducer,
  initialCheckoutState,
} from "../context/checkoutReducer";
import {
  validatePayment,
  validateShipping,
} from "../utils/checkoutValidation";
import { CheckoutSteps } from "../components/checkout/CheckoutSteps";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { PaymentForm } from "../components/checkout/PaymentForm";
import { ReviewOrder } from "../components/checkout/ReviewOrder";
import { CartSummary } from "../components/cart/CartSummary";
import { Button } from "../components/ui";
import type { PaymentInfo, ShippingAddress } from "../types/checkout";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  const [state, dispatch] = useReducer(checkoutReducer, initialCheckoutState);
  const [submitting, setSubmitting] = useState(false);

  // ─── Pre-fill از اطلاعات کاربر ───
  useEffect(() => {
    if (user) {
      dispatch({
        type: "UPDATE_SHIPPING",
        payload: {
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      });
    }
  }, [user]);

  // ─── اگه سبد خالیه، برو به سبد خرید ───
  if (items.length === 0 && !submitting) {
    return <Navigate to="/cart" replace />;
  }

  // ─── اعتبارسنجی مرحله فعلی ───
  const shippingErrors = validateShipping(state.shipping);
  const paymentErrors = validatePayment(state.payment);

  const isShippingValid = Object.keys(shippingErrors).length === 0;
  const isPaymentValid = Object.keys(paymentErrors).length === 0;

  // ─── هندلرها ───
  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    dispatch({ type: "UPDATE_SHIPPING", payload: { [field]: value } });
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    dispatch({ type: "UPDATE_PAYMENT", payload: { [field]: value } });
  };

  const handleBlur = (field: string) => {
    dispatch({ type: "TOUCH_FIELD", payload: field });
  };

  const goNext = () => {
    if (state.step === "shipping") {
      // همه فیلدها رو touched کن که خطاها نشون داده بشن
      Object.keys(state.shipping).forEach((key) =>
        dispatch({ type: "TOUCH_FIELD", payload: key })
      );
      if (isShippingValid) dispatch({ type: "SET_STEP", payload: "payment" });
    } else if (state.step === "payment") {
      Object.keys(state.payment).forEach((key) =>
        dispatch({ type: "TOUCH_FIELD", payload: key })
      );
      if (isPaymentValid) dispatch({ type: "SET_STEP", payload: "review" });
    }
  };

  const goBack = () => {
    if (state.step === "payment") dispatch({ type: "SET_STEP", payload: "shipping" });
    else if (state.step === "review") dispatch({ type: "SET_STEP", payload: "payment" });
  };

  const handleSubmitOrder = async () => {
    setSubmitting(true);
    // شبیه‌سازی درخواست
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    navigate("/order-success", { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-3"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به سبد خرید
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          تسویه حساب
        </h1>
      </div>

      <CheckoutSteps current={state.step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* فرم */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            {state.step === "shipping" && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">
                  آدرس ارسال
                </h2>
                <ShippingForm
                  values={state.shipping}
                  errors={shippingErrors}
                  touched={state.touched}
                  onChange={handleShippingChange}
                  onBlur={handleBlur}
                />
              </>
            )}

            {state.step === "payment" && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">
                  اطلاعات پرداخت
                </h2>
                <PaymentForm
                  values={state.payment}
                  errors={paymentErrors}
                  touched={state.touched}
                  onChange={handlePaymentChange}
                  onBlur={handleBlur}
                />
              </>
            )}

            {state.step === "review" && (
              <>
                <h2 className="font-bold text-gray-900 mb-4">
                  بررسی نهایی
                </h2>
                <ReviewOrder
                  shipping={state.shipping}
                  payment={state.payment}
                />
              </>
            )}

            {/* دکمه‌های ناوبری */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-200">
              {state.step !== "shipping" ? (
                <Button variant="outline" onClick={goBack} disabled={submitting}>
                  <ArrowRight className="h-4 w-4" />
                  مرحله قبل
                </Button>
              ) : (
                <div />
              )}

              {state.step !== "review" ? (
                <Button onClick={goNext}>
                  مرحله بعد
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  isLoading={submitting}
                  size="lg"
                >
                  {submitting ? "در حال ثبت..." : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      ثبت نهایی سفارش
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}