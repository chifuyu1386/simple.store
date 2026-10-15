import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { ProfilePage } from "../pages/ProfilePage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderSuccessPage } from "../pages/OrderSuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage/> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailPage/>},
      { path: "*", element: <NotFoundPage/> },
      { path: "cart", element: <CartPage/>},
      { path: "login", element: <LoginPage />},
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage/>
          </ProtectedRoute>
        )
      },
      {
        path: "order-success",
        element: <OrderSuccessPage/>
      }
    ]
  }
])