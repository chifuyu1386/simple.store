import { CreditCard } from "lucide-react";
import type { PaymentInfo } from "../../types/checkout";
import type { ValidationErrors } from "../../utils/checkoutValidation";
import { Input } from "../ui";
import { formatCardNumber, formatExpiry } from "../../utils/formatters";

interface PaymentFormProps {
  values: PaymentInfo;
  errors: ValidationErrors<PaymentInfo>;
  touched: Record<string, boolean>;
  onChange: (field: keyof PaymentInfo, value: string) => void;
  onBlur: (field: string) => void;
}

export function PaymentForm({
  values,
  errors,
  touched,
  onChange,
  onBlur,
}: PaymentFormProps) {
  const showError = (field: keyof PaymentInfo) =>
    touched[field] ? errors[field] : undefined;

  return (
    <div className="space-y-4">
      {/* نمایش کارت شبیه‌سازی‌شده */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-500 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <CreditCard className="h-8 w-8" />
          <span className="text-sm opacity-80">کارت اعتباری</span>
        </div>

        <p className="font-mono text-xl tracking-wider mb-4 tabular-nums" dir="ltr">
          {values.cardNumber || "•••• •••• •••• ••••"}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="opacity-70 text-xs mb-0.5">دارنده کارت</p>
            <p className="font-medium">
              {values.cardHolder || "نام شما"}
            </p>
          </div>
          <div>
            <p className="opacity-70 text-xs mb-0.5">انقضا</p>
            <p className="font-mono" dir="ltr">
              {values.expiry || "MM/YY"}
            </p>
          </div>
        </div>
      </div>

      <Input
        name="cardNumber"
        label="شماره کارت"
        placeholder="1234 5678 9012 3456"
        value={values.cardNumber}
        onChange={(e) => onChange("cardNumber", formatCardNumber(e.target.value))}
        onBlur={() => onBlur("cardNumber")}
        error={showError("cardNumber")}
        inputMode="numeric"
        dir="ltr"
        className="font-mono"
      />

      <Input
        name="cardHolder"
        label="نام دارنده کارت"
        placeholder="ALI REZAEI"
        value={values.cardHolder}
        onChange={(e) => onChange("cardHolder", e.target.value.toUpperCase())}
        onBlur={() => onBlur("cardHolder")}
        error={showError("cardHolder")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="expiry"
          label="تاریخ انقضا"
          placeholder="MM/YY"
          value={values.expiry}
          onChange={(e) => onChange("expiry", formatExpiry(e.target.value))}
          onBlur={() => onBlur("expiry")}
          error={showError("expiry")}
          inputMode="numeric"
          dir="ltr"
          className="font-mono"
        />

        <Input
          name="cvv"
          label="CVV"
          placeholder="123"
          type="password"
          value={values.cvv}
          onChange={(e) =>
            onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          onBlur={() => onBlur("cvv")}
          error={showError("cvv")}
          inputMode="numeric"
          dir="ltr"
          className="font-mono"
        />
      </div>

      <p className="text-xs text-gray-500 text-center pt-2">
        🔒 این یه نسخه نمایشیه. هیچ اطلاعات واقعی پردازش نمی‌شه.
      </p>
    </div>
  );
}