import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { CartPage } from "../pages/CartPage";

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
      { path: "cart", element: <CartPage/>}
    ]
  }
])