import { useState } from "react";
import { Button, Input, Badge, Rating, Spinner } from "./components/ui";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-8 space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">تست کامپوننت‌های UI</h1>

      <div className="space-y-2">
        <h2 className="font-semibold">دکمه‌ها</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">اصلی</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="outline">خطی</Button>
          <Button variant="danger">خطر</Button>
        </div>

        <Button size="sm">کوچک</Button>
        <Button size="lg">بزرگ</Button>
        <Button fullWidth>تمام عرض</Button>

        <Button
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          {loading ? "لطفاً صبر کنید" : "کلیک کن"}
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">اینپوت‌ها</h2>
        <Input label="نام" name="name" placeholder="نامت رو وارد کن" />
        <Input
          label="ایمیل"
          name="email"
          placeholder="test@example.com"
          error="ایمیل نامعتبر است"
        />
        <Input
          label="رمز عبور"
          name="password"
          helperText="حداقل ۸ کاراکتر"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">بج‌ها</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>پیش‌فرض</Badge>
          <Badge variant="success">موجود</Badge>
          <Badge variant="warning">۵٪ تخفیف</Badge>
          <Badge variant="danger">ناموجود</Badge>
          <Badge variant="info">جدید</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">امتیازها</h2>
        <Rating value={4.5} showValue />
        <Rating value={3} showValue size="sm" />
        <Rating value={5} />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Spinner</h2>
        <div className="flex gap-4 items-center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  );
}

export default App;