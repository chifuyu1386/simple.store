import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          به <span className="text-blue-600">Simple Store</span> خوش آمدید
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          یک فروشگاه اینترنتی نمونه که با React، TypeScript و Tailwind ساخته شده.
          محصولات متنوع رو ببین، جستجو کن و به سبد خریدت اضافه کن.
        </p>
        <div className="pt-4">
          <Link to="/products">
            <Button size="lg">
              مشاهده محصولات
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}