import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Package,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductReviews } from "../components/product/ProductReviews";
import { QuantitySelector } from "../components/product/QuantitySelector";
import {
  Badge,
  Button,
  EmptyState,
  FullPageSpinner,
  Rating,
} from "../components/ui";
import { formatPrice } from "../utils/formatPrice";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) return <FullPageSpinner />;

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title="محصول پیدا نشد"
          description={error || "این محصول ممکنه حذف شده باشه."}
          action={
            <Link to="/products">
              <Button>
                <ArrowRight className="h-4 w-4" />
                بازگشت به محصولات
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const handleAddToCart = () => {
    // TODO: در فاز سبد خرید وصل می‌شه
    console.log("افزودن به سبد:", { productId: product.id, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* مسیر راهنما */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          خانه
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-600 transition-colors">
          محصولات
        </Link>
        <span>/</span>
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-blue-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* گالری */}
        <ProductGallery images={product.images} title={product.title} />

        {/* اطلاعات */}
        <div className="space-y-5">
          <div>
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {product.title}
            </h1>
          </div>

          {/* امتیاز */}
          <div className="flex items-center gap-3">
            <Rating value={product.rating} size="sm" />
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} از ۵ ({product.reviews.length} نظر)
            </span>
          </div>

          {/* برند */}
          {product.brand && (
            <div className="text-sm text-gray-600">
              برند: <span className="font-medium text-gray-900">{product.brand}</span>
            </div>
          )}

          {/* قیمت */}
          <div className="border-t border-b border-gray-200 py-4">
            {product.discountPercentage > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge variant="danger">
                    {Math.round(product.discountPercentage)}٪ تخفیف
                  </Badge>
                </div>
                <p className="text-xs text-green-600">
                  شما {formatPrice(product.price - discountedPrice)} صرفه‌جویی
                  می‌کنید
                </p>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* وضعیت موجودی */}
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <Badge variant="danger">ناموجود</Badge>
            ) : isLowStock ? (
              <Badge variant="warning">
                فقط {product.stock} عدد باقی‌مونده
              </Badge>
            ) : (
              <Badge variant="success">موجود در انبار</Badge>
            )}
          </div>

          {/* توضیحات */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* افزودن به سبد */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 flex-wrap">
              <QuantitySelector
                value={quantity}
                max={product.stock || 1}
                onChange={setQuantity}
              />
              <Button
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex-1 min-w-48"
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    به سبد اضافه شد
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    افزودن به سبد خرید
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* ویژگی‌های کلی */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-200">
            <FeatureItem
              icon={<Truck className="h-5 w-5" />}
              text={product.shippingInformation}
            />
            <FeatureItem
              icon={<ShieldCheck className="h-5 w-5" />}
              text={product.warrantyInformation}
            />
            <FeatureItem
              icon={<RefreshCw className="h-5 w-5" />}
              text={product.returnPolicy}
            />
            <FeatureItem
              icon={<Package className="h-5 w-5" />}
              text={`حداقل سفارش: ${product.minimumOrderQuantity} عدد`}
            />
          </div>
        </div>
      </div>

      {/* مشخصات فنی */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">مشخصات فنی</h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              <SpecRow label="کد محصول" value={product.sku} />
              {product.brand && <SpecRow label="برند" value={product.brand} />}
              <SpecRow label="وزن" value={`${product.weight} گرم`} />
              <SpecRow
                label="ابعاد"
                value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} سانتی‌متر`}
              />
              <SpecRow label="بارکد" value={product.meta.barcode} />
              <SpecRow
                label="تاریخ به‌روزرسانی"
                value={new Date(product.meta.updatedAt).toLocaleDateString("fa-IR")}
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* نظرات */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          نظرات کاربران ({product.reviews.length})
        </h2>
        <ProductReviews reviews={product.reviews} />
      </section>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-blue-600 shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="px-4 py-3 text-gray-600 bg-gray-50 w-1/3">{label}</td>
      <td className="px-4 py-3 text-gray-900">{value}</td>
    </tr>
  );
}