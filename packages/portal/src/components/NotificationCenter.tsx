import { useState, useRef, useEffect } from "react";
import { Bell, X, AlertCircle, Calendar, Megaphone, Check } from "lucide-react";
import type { Notification } from "../types";

interface NotificationCenterProps {
  userRole?: "Admin" | "User";
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export default function NotificationCenter({ userRole = "User", isOpen, onClose, notifications, setNotifications }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState<"all" | "approval" | "deadline" | "announcement">("all");
  const panelRef = useRef<HTMLDivElement>(null);
  
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return <AlertCircle className="w-5 h-5" style={{ color: "var(--primary)" }} />;
      case "deadline":
        return <Calendar className="w-5 h-5" style={{ color: "var(--destructive-foreground)" }} />;
      case "announcement":
        return <Megaphone className="w-5 h-5" style={{ color: "var(--accent)" }} />;
    }
  };

  const getNotificationBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return "rgba(0, 133, 138, 0.1)";
      case "deadline":
        return "rgba(240, 68, 56, 0.1)";
      case "announcement":
        return "rgba(0, 101, 115, 0.1)";
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div 
        ref={panelRef}
        className="h-full w-full max-w-md shadow-lg flex flex-col"
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" style={{ color: "var(--primary)" }} />
            <div>
              <h3 style={{ color: "var(--foreground)" }}>Pusat Notifikasi</h3>
              {unreadCount > 0 && (
                <span className="caption" style={{ color: "var(--muted-foreground)" }}>
                  {unreadCount} notifikasi belum dibaca
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: "transparent",
              color: "var(--muted-foreground)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div 
          className="flex gap-2 p-4 border-b overflow-x-auto"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { id: "all", label: "Semua" },
            { id: "approval", label: "Approval" },
            { id: "deadline", label: "Deadline" },
            { id: "announcement", label: "Pengumuman" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="badge px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? "var(--primary)" : "var(--muted)",
                color: activeTab === tab.id ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Bell className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
              <p style={{ color: "var(--muted-foreground)" }}>
                Tidak ada notifikasi
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 cursor-pointer transition-colors ${!notification.read ? 'font-medium' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    backgroundColor: notification.read ? "transparent" : "var(--muted)"
                  }}
                  onMouseEnter={(e) => {
                    if (notification.read) {
                      e.currentTarget.style.backgroundColor = "var(--muted)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (notification.read) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: getNotificationBgColor(notification.type) }}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 
                          className="truncate"
                          style={{ color: "var(--foreground)" }}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                            style={{ backgroundColor: "var(--primary)" }}
                          />
                        )}
                      </div>
                      <p 
                        className="caption mb-2"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span 
                          className="caption"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {notification.timestamp}
                        </span>
                        {notification.sender && (
                          <>
                            <span style={{ color: "var(--border)" }}>•</span>
                            <span 
                              className="caption"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              {notification.sender}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Mark all as read */}
        {unreadCount > 0 && (
          <div 
            className="p-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors caption"
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)"
              }}
            >
              <Check className="w-4 h-4" />
              Tandai Semua Sudah Dibaca
            </button>
          </div>
        )}
      </div>
    </div>
  );
}