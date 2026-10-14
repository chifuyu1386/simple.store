import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { APP_NAME, NAV_LINKS } from "../../utils/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* برند */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-3"
            >
              <Store className="h-5 w-5" />
              <span>{APP_NAME}</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              یک فروشگاه اینترنتی نمونه برای یادگیری و نمایش مهارت‌های فرانت‌اند.
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">دسترسی سریع</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} {APP_NAME} — تمام حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}