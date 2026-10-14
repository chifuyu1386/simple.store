import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "../components/ui";

export function ErrorPage() {
  const error = useRouteError();

  let title = "مشکلی پیش آمد";
  let message = "خطای ناشناخته‌ای رخ داد.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status}`;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-5xl font-bold text-red-600">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <Link to="/">
          <Button>بازگشت به خانه</Button>
        </Link>
      </div>
    </div>
  );
}