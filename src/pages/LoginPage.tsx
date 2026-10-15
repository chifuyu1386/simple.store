import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button, Input } from "../components/ui";

interface FormErrors {
  username?: string;
  password?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, error, clearError } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // اگه کاربر لاگین بود، مستقیم بفرستش به صفحه مقصد
  const redirectTo = (location.state as { from?: Location })?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  // فوکوس خودکار روی فیلد اول
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // پاک کردن خطا وقتی کاربر شروع به تایپ می‌کنه
  useEffect(() => {
    if (error) clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  // ─── اعتبارسنجی ───
  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!username.trim()) {
      nextErrors.username = "نام کاربری الزامیه";
    } else if (username.trim().length < 3) {
      nextErrors.username = "نام کاربری حداقل ۳ کاراکتره";
    }

    if (!password) {
      nextErrors.password = "رمز عبور الزامیه";
    } else if (password.length < 5) {
      nextErrors.password = "رمز عبور حداقل ۵ کاراکتره";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ─── ارسال فرم ───
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login({ username: username.trim(), password });
      // ریدایرکت توسط useEffect بالا انجام می‌شه
    } catch {
      // خطا توی AuthContext ذخیره شده
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-3">
              <LogIn className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              ورود به حساب
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              برای دسترسی به پروفایل و تسویه حساب وارد شوید
            </p>
          </div>

          {/* پیام خطا از سرور */}
          {error && (
            <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              ref={usernameRef}
              name="username"
              label="نام کاربری"
              placeholder="emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              autoComplete="username"
              disabled={submitting}
            />

            <Input
              name="password"
              type="password"
              label="رمز عبور"
              placeholder="emilyspass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
              disabled={submitting}
            />

            <Button
              type="submit"
              size="lg"
              fullWidth
              isLoading={submitting}
            >
              {submitting ? "در حال ورود..." : "ورود"}
            </Button>
          </form>

          {/* اطلاعات تستی */}

          <p className="text-center text-sm text-gray-500 mt-6">
            حساب کاربری ندارید؟{" "}
            <span className="text-gray-400">به‌زودی...</span>
          </p>
        </div>

        <Link
          to="/"
          className="block text-center text-sm text-blue-600 hover:underline mt-4"
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}