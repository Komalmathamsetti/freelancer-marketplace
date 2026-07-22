import useNotifications from "../../hooks/useNotifications";
import { useNavigate } from "react-router-dom";
const typeMeta = {
  "New Application": { icon: "📩", accent: "from-blue-50 to-white" },
  "Proposal Accepted": { icon: "🎉", accent: "from-emerald-50 to-white" },
  "Proposal Rejected": { icon: "❌", accent: "from-rose-50 to-white" },
  "New Job Posted": { icon: "🆕", accent: "from-indigo-50 to-white" },
  "Job Updated": { icon: "✏️", accent: "from-amber-50 to-white" },
  "Application Withdrawn": { icon: "⚠️", accent: "from-orange-50 to-white" },
};

const formatRelativeTime = (dateValue) => {
  const date = new Date(dateValue);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-2/5 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
    <div className="mt-4 flex gap-2">
      <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
      🔔
    </div>
    <h3 className="text-2xl font-semibold text-slate-900">No Notifications</h3>
    <p className="mt-2 text-slate-600">You are all caught up.</p>
  </div>
);

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {
  const meta = typeMeta[notification.type] || { icon: "🔔" };
  const unread = !notification.is_read;
  return (
    <article
      className={[
        "group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        unread
          ? "border-blue-200 bg-blue-50/60 ring-1 ring-blue-100"
          : "border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
          {meta.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {unread && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                <h3
                  className={[
                    "truncate text-base",
                    unread ? "font-semibold text-slate-900" : "font-medium text-slate-800",
                  ].join(" ")}
                >
                  {notification.title}
                </h3>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {notification.message}
              </p>
            </div>

            <span className="shrink-0 text-xs font-medium text-slate-500">
              {formatRelativeTime(notification.created_at)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {unread && (
              <button
                type="button"
                onClick={() => onMarkRead?.(notification.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                <span>✔</span>
                Mark Read
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete?.(notification.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <span>🗑</span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function NotificationsPage() {

  const {
    notifications,
    loading,
    handleMarkAllRead,
    handleMarkAsRead,
    handleDelete,
  } = useNotifications();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-225">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button onClick={() => navigate(currentUser.role === "client"? "/client/dashboard": currentUser.role === "freelancer"? "/freelancer/dashboard": "/admin/dashboard")} className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Stay updated with your latest activities.
            </p>
            <p className="mt-2 text-sm text-slate-500">
                {notifications.length} Notification{notifications.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button type="button" onClick={handleMarkAllRead} disabled={unreadCount === 0}className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition sm:w-auto ${
            unreadCount === 0 ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
                Mark All Read
            </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}