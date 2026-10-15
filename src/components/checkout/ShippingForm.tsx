import type { ShippingAddress } from "../../types/checkout";
import type { ValidationErrors } from "../../utils/checkoutValidation";
import { Input } from "../ui";
import { formatPhone } from "../../utils/formatters";

interface ShippingFormProps {
  values: ShippingAddress;
  errors: ValidationErrors<ShippingAddress>;
  touched: Record<string, boolean>;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  onBlur: (field: string) => void;
}

export function ShippingForm({
  values,
  errors,
  touched,
  onChange,
  onBlur,
}: ShippingFormProps) {
  const showError = (field: keyof ShippingAddress) =>
    touched[field] ? errors[field] : undefined;

  return (
    <div className="space-y-4">
      <Input
        name="fullName"
        label="نام و نام خانوادگی"
        placeholder="علی رضایی"
        value={values.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        onBlur={() => onBlur("fullName")}
        error={showError("fullName")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="email"
          type="email"
          label="ایمیل"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          error={showError("email")}
        />

        <Input
          name="phone"
          type="tel"
          label="شماره تماس"
          placeholder="09123456789"
          value={values.phone}
          onChange={(e) => onChange("phone", formatPhone(e.target.value))}
          onBlur={() => onBlur("phone")}
          error={showError("phone")}
        />
      </div>

      <Input
        name="address"
        label="آدرس"
        placeholder="خیابان، کوچه، پلاک، واحد"
        value={values.address}
        onChange={(e) => onChange("address", e.target.value)}
        onBlur={() => onBlur("address")}
        error={showError("address")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="city"
          label="شهر"
          placeholder="تهران"
          value={values.city}
          onChange={(e) => onChange("city", e.target.value)}
          onBlur={() => onBlur("city")}
          error={showError("city")}
        />

        <Input
          name="postalCode"
          label="کد پستی"
          placeholder="1234567890"
          value={values.postalCode}
          onChange={(e) =>
            onChange("postalCode", e.target.value.replace(/\D/g, ""))
          }
          onBlur={() => onBlur("postalCode")}
          error={showError("postalCode")}
        />
      </div>
    </div>
  );
}