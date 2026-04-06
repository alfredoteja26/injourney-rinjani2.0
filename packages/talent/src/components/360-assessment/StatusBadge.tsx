import React from "react";

type StatusType = "published" | "active" | "archived" | "completed" | "in_progress" | "notified" | "pending";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    active: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200",
    notified: "bg-gray-100 text-gray-700 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    archived: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const defaultLabels: Record<string, string> = {
    published: "Selesai",
    completed: "Selesai",
    active: "Aktif",
    in_progress: "Sedang Mengisi",
    notified: "Belum Mulai",
    pending: "Menunggu Hasil",
    archived: "Ditutup",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.notified}`}>
      {label || defaultLabels[status] || status}
    </span>
  );
}
