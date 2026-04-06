// Shared types for Rinjani Portal
export interface Notification {
  id: string;
  type: "approval" | "deadline" | "announcement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  sender?: string;
}
