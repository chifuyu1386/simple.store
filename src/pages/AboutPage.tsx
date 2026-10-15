import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Smartphone,
  Code2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../components/ui";
import { FeatureCard } from "../components/about/FeatureCard";
import { TechBadge } from "../components/about/TechBadge";
import { APP_NAME } from "../utils/constants";

const FEATURES = [
  {
    icon: <Search className="h-5 w-5" />,
    title: "جستجو و فیلتر پیشرفته",
    description:
      "محصولات رو بر اساس دسته‌بندی، قیمت و محبوبیت فیلتر کن و سریع پیداشون کن.",
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "سبد خرید هوشمند",
    description:
      "محصولات رو به سبد اضافه کن، تعداد رو تنظیم کن و سبدت حتی بعد از رفرش صفحه حفظ می‌شه.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "احراز هویت امن",
    description:
      "سیستم لاگین با توکن JWT و مسیرهای محافظت‌شده برای دسترسی امن به پروفایل.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "سرعت بالا",
    description:
      "با Vite و React 18، تجربه‌ای سریع و روان داری. لود تنبل صفحات برای بهینه‌سازی بیشتر.",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "کاملاً واکنش‌گرا",
    description:
      "از موبایل کوچیک تا مانیتور بزرگ، همه‌جا عالی به نظر می‌رسه. با پشتیبانی کامل RTL.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "طراحی مدرن",
    description:
      "UI تمیز با Tailwind CSS، انیمیشن‌های ظریف و تجربه‌ای دلپذیر برای کاربر.",
  },
];

const TECH_STACK = [
  { name: "React 18", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { name: "TypeScript", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Vite", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Tailwind CSS", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "React Router", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Context API", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "useReducer", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Lucide Icons", color: "bg-gray-50 text-gray-700 border-gray-200" },
];

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ─── Hero ─── */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          درباره پروژه
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          درباره‌ی <span className="text-blue-600">{APP_NAME}</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          {APP_NAME} یک فروشگاه اینترنتی نمونه‌ست که به‌عنوان پروژه پورتفولیو
          ساخته شده. هدف این پروژه، نمایش مهارت‌های فرانت‌اند مدرن با React،
          TypeScript و Tailwind CSS بوده.
        </p>
      </section>

      {/* ─── ویژگی‌ها ─── */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            امکانات پروژه
          </h2>
          <p className="text-gray-600">
            هر چیزی که از یه فروشگاه اینترنتی مدرن انتظار داری
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* ─── تکنولوژی‌ها ─── */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            تکنولوژی‌های استفاده‌شده
          </h2>
          <p className="text-gray-600">
            ابزارهایی که این پروژه با اون‌ها ساخته شده
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {TECH_STACK.map((tech) => (
            <TechBadge key={tech.name} {...tech} />
          ))}
        </div>
      </section>

      {/* ─── درباره سازنده ─── */}
      <section className="mb-16">
        <div className="bg-gradient-to-l from-blue-600 to-blue-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <Code2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ساخته شده با ❤️ توسط یه توسعه‌دهنده فرانت‌اند
          </h2>
          <p className="text-blue-50 max-w-2xl mx-auto leading-relaxed mb-6">
            این پروژه برای نمایش مهارت‌های فرانت‌اند و به‌عنوان بخشی از
            پورتفولیو ساخته شده. اگه سوالی داری یا می‌خوای همکاری کنیم، خوشحال
            می‌شم در ارتباط باشیم.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/products">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/40 text-white font-medium hover:bg-white/10 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                مشاهده محصولات
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          آماده‌ای خرید رو شروع کنی؟
        </h2>
        <p className="text-gray-600 mb-6">
          یه سر به محصولات بزن و تجربه‌ی خرید رو تست کن
        </p>
        <Link to="/products">
          <Button size="lg">
            شروع خرید
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}