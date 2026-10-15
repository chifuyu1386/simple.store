import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Store, LogIn, LogOut} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { APP_NAME, NAV_LINKS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {itemCount} = useCart();
  const { user, isAuthenticated, logout} = useAuth()
  const closeMenu = () => setIsMobileMenuOpen(false);
  const navigate = useNavigate

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate("/")
  }

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
                {itemCount > 0 && (
                  <span className="absolute top-0 left-0 inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                    {itemCount.toLocaleString("fa-IR")}
                  </span>
                )}
            </Link>

            {/* کاربر */}
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.firstName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="خروج"
                  className="p-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                ورود
              </Link>
            )}

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

            <div className="pt-2 border-t border-gray-200 mt-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                >
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>پروفایل من</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50"
              >
                <LogIn className="h-4 w-4" />
                <span>ورود به حساب</span>
              </Link>
            )}
          </div>
          </div>
        </nav>
      )}
    </header>
  );
}