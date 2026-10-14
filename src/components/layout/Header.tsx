import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Store } from "lucide-react";
import { APP_NAME, NAV_LINKS } from "../../utils/constants";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-bold text-xl"
            onClick={closeMenu}
          >
            <Store className="h-6 w-6" />
            <span>{APP_NAME}</span>
          </Link>

          {/* نویگیشن دسکتاپ */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* اکشن‌های سمت چپ */}
          <div className="flex items-center gap-2">
            {/* دکمه سبد خرید */}
            <Link
              to="/cart"
              aria-label="سبد خرید"
              className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 left-0 inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                0
              </span>
            </Link>

            {/* دکمه منو موبایل */}
            <button
              type="button"
              aria-label="منو"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}