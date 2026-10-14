import type { ProductReview } from "../../types/product";
import { Rating } from "../ui";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        هنوز نظری برای این محصول ثبت نشده.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <article
          key={index}
          className="bg-gray-50 rounded-xl p-4 border border-gray-100"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {review.reviewerName}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(review.date).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <Rating value={review.rating} size="sm" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {review.comment}
          </p>
        </article>
      ))}
    </div>
  );
}