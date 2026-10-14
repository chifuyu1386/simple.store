import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui";

export function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
      <h1 className="text-7xl font-bold text-blue-600">۴۰۴</h1>
      <h2 className="text-2xl font-bold text-gray-900">
        صفحه‌ای که دنبالش بودی پیدا نشد
      </h2>
      <p className="text-gray-600">
        احتمالاً آدرس اشتباهه یا صفحه حذف شده.
      </p>
      <div className="pt-4">
        <Link to="/">
          <Button size="lg">
            <Home className="h-5 w-5" />
            بازگشت به خانه
          </Button>
        </Link>
      </div>
    </div>
  );
}