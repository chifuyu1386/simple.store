<div dir="rtl">

# 🛍️ Simple Store

> یک فروشگاه اینترنتی نمونه با React، TypeScript و Tailwind CSS

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)](https://chifuyu1386.github.io/simple.store/)

---

## 📖 درباره پروژه

**Simple Store** یک فروشگاه اینترنتی نمونه و کامل است که به‌عنوان پروژه‌ی پورتفولیو ساخته شده. این پروژه یک تجربه‌ی خرید واقعی را شبیه‌سازی می‌کند و هدفش نمایش مهارت‌های فرانت‌اند مدرن با React، TypeScript و Tailwind CSS است.

🌐 **[مشاهده دموی زنده](https://chifuyu1386.github.io/simple.store/)**

---

## ✨ امکانات

### 🛒 تجربه خرید
- **لیست محصولات** با صفحه‌بندی، جستجو، فیلتر و مرتب‌سازی
- **صفحه جزئیات محصول** با گالری تصاویر و نظرات کاربران
- **سبد خرید هوشمند** با `Context API` و `useReducer`
- **ماندگاری سبد خرید** در `localStorage` — حتی بعد از رفرش
- **تسویه حساب چند مرحله‌ای** با اعتبارسنجی کامل فرم
- **فیلترهای سینک‌شده با URL** — لینک‌های قابل اشتراک‌گذاری

### 🔐 احراز هویت
- **ورود با JWT** از طریق DummyJSON API
- **مسیرهای محافظت‌شده** با `ProtectedRoute`
- **پروفایل کاربر** با اطلاعات کامل
- **بازیابی خودکار نشست** بعد از رفرش صفحه

### 🎨 رابط کاربری
- **طراحی کاملاً واکنش‌گرا** از موبایل تا دسکتاپ
- **پشتیبانی کامل RTL** با فونت وزیرمتن
- **حالت‌های Loading، Empty و Error** برای هر بخش
- **دسترس‌پذیری (a11y)** با ARIA labels
- **انیمیشن‌های ظریف** و ترنزیشن‌های نرم

---

## 🛠️ تکنولوژی‌های استفاده‌شده

| دسته | تکنولوژی |
|---|---|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v6 |
| **State Management** | Context API + `useReducer` |
| **Icons** | Lucide React |
| **Font** | Vazirmatn |
| **API** | [DummyJSON](https://dummyjson.com) |
| **Deployment** | GitHub Actions + GitHub Pages |

---

## 🏗️ معماری پروژه
src/
├── components/ # کامپوننت‌های قابل استفاده مجدد
│ ├── ui/ # بلوک‌های پایه (Button, Input, Spinner, ...)
│ ├── layout/ # Header, Footer, Layout
│ ├── product/ # ProductCard, ProductGrid, ProductGallery, ...
│ ├── cart/ # CartItem, CartSummary
│ ├── checkout/ # ShippingForm, PaymentForm, CheckoutSteps, ...
│ ├── auth/ # ProtectedRoute
│ └── about/ # FeatureCard, TechBadge
│
├── pages/ # صفحات اصلی
│ ├── HomePage
│ ├── ProductsPage
│ ├── ProductDetailPage
│ ├── CartPage
│ ├── CheckoutPage
│ ├── OrderSuccessPage
│ ├── LoginPage
│ ├── ProfilePage
│ ├── AboutPage
│ ├── NotFoundPage
│ └── ErrorPage
│
├── context/ # State سراسری
│ ├── AuthContext # احراز هویت
│ ├── CartContext # سبد خرید
│ └── checkoutReducer # فرم تسویه حساب
│
├── hooks/ # Custom Hooks
│ ├── useProducts
│ ├── useProduct
│ ├── useCategories
│ └── useDebounce
│
├── services/ # لایه ارتباط با API
│ ├── http.ts # fetch wrapper
│ ├── productService
│ └── authService
│
├── types/ # تایپ‌های TypeScript
├── utils/ # توابع کمکی
├── router/ # تنظیمات React Router
└── styles/ # فایل‌های CSS

text

### الگوی لایه‌بندی
┌─────────────────────────────────────┐
│ UI Layer (Pages + Components) │
├─────────────────────────────────────┤
│ Hooks Layer (Custom Hooks) │
├─────────────────────────────────────┤
│ State Layer (Context + Reducer) │
├─────────────────────────────────────┤
│ Service Layer (http.ts + services) │
├─────────────────────────────────────┤
│ External API (DummyJSON) │
└─────────────────────────────────────┘

text

هر لایه فقط با لایه‌ی پایین‌تر خودش ارتباط دارد. این اصل **Separation of Concerns** باعث می‌شود کد قابل تست، قابل نگهداری و قابل گسترش باشد.

---

## 🚀 اجرای پروژه

### پیش‌نیازها
- Node.js نسخه ۱۸ یا بالاتر
- npm یا yarn

### نصب و اجرا

```bash
# کلون پروژه
git clone https://github.com/chifuyu1386/simple.store.git
cd simple.store

# نصب وابستگی‌ها
npm install

# اجرا در حالت توسعه
npm run dev
پروژه روی http://localhost:5173 بالا می‌آید.

ساخت نسخه production
bash
npm run build
npm run preview
🔑 اطلاعات ورود تستی
پروژه از DummyJSON به‌عنوان API استفاده می‌کند. برای تست ورود، از اطلاعات زیر استفاده کنید:

فیلد	مقدار
نام کاربری	emilys
رمز عبور	emilyspass
💡 نکته: DummyJSON یک API شبیه‌ساز است و فقط کاربران موجود در دیتابیس خودش را می‌پذیرد. برای دیدن لیست کاربران بیشتر به dummyjson.com/users مراجعه کنید.

📦 دیپلوی خودکار
این پروژه به‌صورت خودکار روی GitHub Pages با GitHub Actions دیپلوی می‌شود.

هر push روی برنچ main، workflow را اجرا می‌کند:

Checkout — دریافت کد از ریپازیتوری

Setup Node — نصب Node.js 20

Install — نصب وابستگی‌ها با npm ci

Build — ساخت پروژه با vite build

SPA Fallback — کپی index.html به 404.html

Upload — آپلود artifact

Deploy — انتشار روی GitHub Pages

📄 فایل workflow: .github/workflows/deploy.yml

🎯 نکات فنی برجسته
این پروژه فقط یک فروشگاه ساده نیست — اینجا چند تکنیک حرفه‌ای پیاده‌سازی شده:

🧠 مدیریت State
✅ useReducer برای stateهای پیچیده — به‌جای ده‌ها useState پراکنده

✅ الگوی Provider + Hook اختصاصی — جلوگیری از خطای null و type-safe

✅ توابع reducer محض — جدا از React، قابل تست و پیش‌بینی‌پذیر

✅ مقادیر مشتق‌شده در Provider — itemCount, subtotal, savings یک‌جا محاسبه می‌شوند

🌐 داده و API
✅ HTTP wrapper مرکزی — مدیریت هدرها، توکن و خطاها در یک جا

✅ جلوگیری از Race Condition — با flag در useEffect

✅ Custom Hooks تخصصی — useProducts, useProduct, useCategories

✅ useDebounce برای جستجو — کاهش درخواست‌های اضافی

🔗 URL و Routing
✅ سینک فیلترها با URL — لینک‌های قابل اشتراک‌گذاری

✅ useSearchParams برای query params — به‌جای state داخلی

✅ ProtectedRoute با location.state — بازگشت به صفحه مقصد بعد از لاگین

✅ basename پویا — پشتیبانی از deploy روی زیرمسیر

💾 ماندگاری داده
✅ localStorage برای سبد خرید — حفظ سبد بعد از رفرش

✅ ذخیره و بازیابی توکن JWT — نشست پایدار

✅ try/catch امن — جلوگیری از crash در صورت خطای storage

🎨 UI/UX
✅ کامپوننت‌های پایه قابل ترکیب — Button, Input, Badge, Rating

✅ Barrel Export — importهای تمیز

✅ forwardRef روی Input — پشتیبانی از ref

✅ انیمیشن‌های ظریف — hover, focus, transition

✅ فرم چند مرحله‌ای با اعتبارسنجی — تجربه‌ی کاربری حرفه‌ای

✅ نمایش زنده کارت بانکی — UX خلاقانه

🧪 کیفیت کد
✅ Type Safety کامل — بدون هیچ any

✅ توابع خالص برای اعتبارسنجی — قابل تست

✅ جداسازی منطق از UI — reducer و utils مستقل

✅ Barrel Export در سرویس‌ها — کد تمیز

📸 اسکرین‌شات‌ها
🖼️ اسکرین‌شات‌ها به‌زودی اضافه می‌شوند

🗺️ نقشه راه توسعه
☑ لایه سرویس و تایپ‌ها
☑ Custom Hooks
☑ کامپوننت‌های UI پایه
☑ Layout و Router
☑ صفحه محصولات با فیلتر و جستجو
☑ صفحه جزئیات محصول
☑ سبد خرید با Context
☑ احراز هویت
☑ تسویه حساب چند مرحله‌ای
☑ صفحه درباره ما
☑ دیپلوی با GitHub Actions
ایده‌های آینده
□ لیست علاقه‌مندی‌ها (Wishlist)
□ حالت تاریک / روشن
□ تست‌نویسی با Vitest
□ PWA
□ پشتیبانی چند زبانه (i18n)
🤝 مشارکت
اگر ایده‌ای داری یا باگی دیدی، خوشحال می‌شوم که:

یه Issue باز کنی

یا یه Pull Request بفرستی

هر بازخوردی ارزشمنده. 🙏

📄 لایسنس
این پروژه تحت لایسنس MIT منتشر شده. استفاده، تغییر و توزیع آن آزاد است.

<div align="center">
ساخته شده با ❤️ و ☕

اگر این پروژه رو دوست داشتی، یه ⭐ بده!

⬆ بازگشت به بالا

</div></div> ```