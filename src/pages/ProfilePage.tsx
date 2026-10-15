import { LogOut, Mail, User as UserIcon, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // توسط ProtectedRoute تضمین شده

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* هدر پروفایل */}
        <div className="bg-gradient-to-l from-blue-600 to-blue-500 h-32" />

        <div className="px-6 pb-6">
          {/* آواتار */}
          <div className="-mt-16 mb-4">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-md"
            />
          </div>

          {/* نام */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 text-sm">@{user.username}</p>
          </div>

          {/* اطلاعات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <InfoCard
              icon={<UserIcon className="h-5 w-5" />}
              label="نام کاربری"
              value={user.username}
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              label="ایمیل"
              value={user.email}
            />
            <InfoCard
              icon={<Shield className="h-5 w-5" />}
              label="شناسه کاربر"
              value={`#${user.id}`}
            />
            <InfoCard
              icon={<UserIcon className="h-5 w-5" />}
              label="جنسیت"
              value={user.gender === "male" ? "آقا" : "خانم"}
            />
          </div>

          {/* خروج */}
          <div className="pt-6 border-t border-gray-200">
            <Button variant="danger" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              خروج از حساب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
      <span className="text-blue-600 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 text-sm truncate">{value}</p>
      </div>
    </div>
  );
}