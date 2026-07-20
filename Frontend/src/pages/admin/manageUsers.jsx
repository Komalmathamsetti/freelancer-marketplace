import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/adminServices";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const roleStyles = {
  Client: "bg-blue-50 text-blue-700 ring-blue-100",
  Freelancer: "bg-violet-50 text-violet-700 ring-violet-100",
  Admin: "bg-slate-100 text-slate-700 ring-slate-200",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Suspended: "bg-rose-50 text-rose-700 ring-rose-100",
};

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    async function loadUsers() {
        try {
            const response = await getAllUsers();
            if (!ignore && response.data.success) {
                setUsers(response.data.users);
            }
        }
        catch (error) {
          toast.error(error.response?.data?.message || "Unable to load users");
        }
        finally {
            if (!ignore) {
                setLoading(false);
            }
        }
    }
    loadUsers();
    return () => {
        ignore = true;
    };
  }, []);
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
    const matchesSearch =
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
        roleFilter === "All" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }, [users,search, roleFilter]);
  if (loading) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">Loading Users...</h1>
        </div>
    );
  }
  const handleDelete = async (id) => {
    const result = await Swal.fire({
            title: "Delete User?",
            text: "This user will be permanently deleted. This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });
        if(!result.isConfirmed)return;
    try {
        const response = await deleteUser(id);
        toast.success(response.data.message);
        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete user");
    }
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Manage Users
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View and manage all registered users on the platform.
            </p>
            <button onClick={() => navigate("/admin/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
              ← Back to Dashboard
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search User"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="w-full sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option>All</option>
                <option>Client</option>
                <option>Freelancer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-200">
                  {user.full_name?.split(" ").map(name => name[0]).join("").toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-semibold text-slate-900">
                      {user.full_name}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${roleStyles[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Email</span>
                  <span className="truncate text-right font-medium text-slate-700">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Joined Date</span>
                  <span className="font-medium text-slate-700">{user.created_at?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Status</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles["Active"]}`}
                  >
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button onClick={()=>navigate(`/admin/users/${user.id}`)} className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]">
                  View Profile
                </button>
                <button onClick={()=>handleDelete(user.id)} className="rounded-xl bg-rose-600 px-3 py-3 text-sm font-medium text-white transition duration-200 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 active:scale-[0.98]">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-slate-500">
            No users found.
          </div>
        )}
      </main>
    </div>
  );
}