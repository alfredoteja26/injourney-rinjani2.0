import { useState } from "react";
import { Send, Eye, Trash2, Calendar, Users, Filter, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import type { Notification } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface SentMessage {
  id: string;
  title: string;
  content: string;
  targetAudience: "all" | "department";
  department?: string;
  sentBy: string;
  sentDate: string;
  recipientCount: number;
  readCount: number;
}

const MOCK_SENT_MESSAGES: SentMessage[] = [
  {
    id: "MSG-001",
    title: "Update Kebijakan Cuti",
    content: "Perubahan kebijakan cuti akan berlaku mulai 1 Januari 2025. Silakan baca dokumen lengkap di HC Digi Policy.",
    targetAudience: "all",
    sentBy: "Admin",
    sentDate: "2024-12-28 14:30",
    recipientCount: 245,
    readCount: 189
  },
  {
    id: "MSG-002",
    title: "Maintenance System Sabtu Depan",
    content: "System maintenance dijadwalkan pada Sabtu, 30 Desember 2024 pukul 08:00 - 12:00 WIB. Mohon backup data penting Anda.",
    targetAudience: "department",
    department: "Technology",
    sentBy: "Admin",
    sentDate: "2024-12-27 10:15",
    recipientCount: 45,
    readCount: 42
  },
  {
    id: "MSG-003",
    title: "Pengumuman Rapat Tim",
    content: "Rapat tim bulanan akan diadakan pada Senin, 2 Januari 2025 pukul 09:00 WIB di ruang meeting lantai 3.",
    targetAudience: "department",
    department: "Human Resources",
    sentBy: "Admin",
    sentDate: "2024-12-26 16:45",
    recipientCount: 23,
    readCount: 23
  },
];

interface MessageBroadcastProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onAddNotification: (notification: Notification) => void;
}

export default function MessageBroadcast({ notifications, setNotifications, onAddNotification }: MessageBroadcastProps) {
  const [showSendForm, setShowSendForm] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [targetAudience, setTargetAudience] = useState<"all" | "department">("all");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sentMessages, setSentMessages] = useState<SentMessage[]>(MOCK_SENT_MESSAGES);
  const [filterAudience, setFilterAudience] = useState<"all" | "all-users" | "department">("all");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const departments = ["Technology", "Human Resources", "Finance", "Marketing", "Operations"];

  const handleSendMessage = () => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (targetAudience === "department" && !selectedDepartment) {
      toast.error("Please select a department");
      return;
    }

    const newMessage: SentMessage = {
      id: `MSG-${Date.now()}`,
      title: messageTitle,
      content: messageContent,
      targetAudience,
      department: targetAudience === "department" ? selectedDepartment : undefined,
      sentBy: "Admin",
      sentDate: new Date().toLocaleString('id-ID', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      recipientCount: targetAudience === "all" ? 245 : 45,
      readCount: 0
    };

    setSentMessages([newMessage, ...sentMessages]);

    // Add notification to global state
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: "announcement",
      title: messageTitle,
      message: messageContent,
      timestamp: "Baru saja",
      read: false,
      sender: "Admin"
    };

    onAddNotification(newNotification);

    // Show success animation
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 3000);

    setMessageTitle("");
    setMessageContent("");
    setTargetAudience("all");
    setSelectedDepartment("");
    setShowSendForm(false);
    toast.success("Message sent successfully!");
  };

  const handleDeleteMessage = (id: string) => {
    setSentMessages(sentMessages.filter(msg => msg.id !== id));
    toast.success("Message deleted successfully");
  };

  const filteredMessages = sentMessages.filter(msg => {
    if (filterAudience === "all") return true;
    if (filterAudience === "all-users") return msg.targetAudience === "all";
    if (filterAudience === "department") return msg.targetAudience === "department";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              className="rounded-full p-8"
              style={{ backgroundColor: "var(--card)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CheckCircle 
                  className="w-24 h-24" 
                  style={{ color: "var(--chart-2)" }}
                  strokeWidth={2}
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-center"
                style={{ 
                  color: "var(--foreground)",
                  fontWeight: "var(--font-weight-semibold)"
                }}
              >
                Pesan Berhasil Dikirim!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="caption text-center mt-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                Notifikasi telah dikirim ke semua pengguna
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ color: "var(--foreground)" }}>Message Broadcasting</h3>
          <p className="caption" style={{ color: "var(--muted-foreground)" }}>
            Send notifications to all users or specific departments
          </p>
        </div>
        <Button onClick={() => setShowSendForm(!showSendForm)} className="gap-2">
          <Send className="w-4 h-4" />
          Send New Message
        </Button>
      </div>

      {/* Send Message Form */}
      <AnimatePresence>
        {showSendForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg p-6 space-y-4 overflow-hidden"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
          >
            <h4 style={{ color: "var(--foreground)" }}>Compose Message</h4>
            
            <div>
              <label className="caption mb-2 block" style={{ color: "var(--foreground)" }}>
                Title <span style={{ color: "var(--destructive-foreground)" }}>*</span>
              </label>
              <Input
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder="Enter message title..."
              />
            </div>

            <div>
              <label className="caption mb-2 block" style={{ color: "var(--foreground)" }}>
                Message Content <span style={{ color: "var(--destructive-foreground)" }}>*</span>
              </label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Enter your message..."
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--input-background)",
                  color: "var(--foreground)"
                }}
              />
            </div>

            <div>
              <label className="caption mb-2 block" style={{ color: "var(--foreground)" }}>
                Target Audience <span style={{ color: "var(--destructive-foreground)" }}>*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="all"
                    checked={targetAudience === "all"}
                    onChange={(e) => setTargetAudience(e.target.value as "all")}
                  />
                  <span className="caption">All Users</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="department"
                    checked={targetAudience === "department"}
                    onChange={(e) => setTargetAudience(e.target.value as "department")}
                  />
                  <span className="caption">Specific Department</span>
                </label>
              </div>
            </div>

            {targetAudience === "department" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="caption mb-2 block" style={{ color: "var(--foreground)" }}>
                  Select Department <span style={{ color: "var(--destructive-foreground)" }}>*</span>
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--input-background)",
                    color: "var(--foreground)"
                  }}
                >
                  <option value="">Select a department...</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </motion.div>
            )}

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowSendForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage} className="gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
        <span className="caption" style={{ color: "var(--muted-foreground)" }}>Filter:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {filterAudience === "all" && "All Messages"}
              {filterAudience === "all-users" && "All Users"}
              {filterAudience === "department" && "Department Only"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setFilterAudience("all")}>
              All Messages
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAudience("all-users")}>
              All Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAudience("department")}>
              Department Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sent Messages Table */}
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Read Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div>
                    <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)', color: "var(--foreground)" }}>
                      {message.title}
                    </div>
                    <div className="caption text-muted-foreground line-clamp-2" style={{ fontSize: 'var(--text-xs)' }}>
                      {message.content}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={message.targetAudience === "all" ? "bg-primary/10 text-primary border-primary/20" : "bg-accent/10 text-accent border-accent/20"}>
                    {message.targetAudience === "all" ? (
                      <>
                        <Users className="w-3 h-3 mr-1" />
                        All Users
                      </>
                    ) : (
                      <>
                        {message.department}
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                    <span className="caption text-muted-foreground">{message.sentDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="caption">{message.recipientCount} users</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(message.readCount / message.recipientCount) * 100}%` }}
                      />
                    </div>
                    <span className="caption" style={{ color: "var(--muted-foreground)" }}>
                      {message.readCount}/{message.recipientCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info(`Viewing: ${message.title}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12 border rounded-lg" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
          <Send className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--muted-foreground)" }} />
          <h4 style={{ color: "var(--foreground)" }}>No Messages Sent</h4>
          <p className="caption mt-2" style={{ color: "var(--muted-foreground)" }}>
            Start broadcasting messages to your users
          </p>
        </div>
      )}
    </div>
  );
}