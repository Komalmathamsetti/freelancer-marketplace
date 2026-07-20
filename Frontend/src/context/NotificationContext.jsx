import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socket from "../socket";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";
import NotificationContext from "./notificationContext";

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logged in user
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.notifications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Connect socket + fetch notifications
  useEffect(() => {
  if (!user) return;

  const handleConnect = () => {
    console.log("Socket Connected:", socket.id);

    socket.emit("join", user.id);
    console.log("Joined room:", user.id);
  };
  if (socket.connected) {
    handleConnect();
  } else {
    socket.on("connect", handleConnect);
  }

  const loadNotifications = async () => {
    await fetchNotifications();
  };

  loadNotifications();


  const handleNotification = (notification) => {
    console.log("Notification received:", notification);

    setNotifications((prev) => [notification, ...prev]);

    toast.success(notification.title);
  };

  socket.on("new-notification", handleNotification);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("new-notification", handleNotification);
  };
}, [user]);
  // Unread Count
  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  // Mark one notification as read
  const handleMarkAsRead = async (id) => {
    await markAsRead(id);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    await markAllAsRead();

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  };

  // Delete notification
  const handleDelete = async (id) => {
    await deleteNotification(id);

    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        handleMarkAsRead,
        handleMarkAllRead,
        handleDelete,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};