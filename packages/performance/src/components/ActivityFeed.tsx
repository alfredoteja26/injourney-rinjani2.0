import { MessageCircle, CheckCircle, AlertCircle, FileText, Clock } from "lucide-react";

export function ActivityFeed() {
  const activities = [
    {
      icon: CheckCircle,
      iconColor: "text-green-600 bg-green-100",
      title: "Performance Review Completed",
      description: "Your Q4 2024 performance review has been submitted by Doni Mardani",
      time: "2 hours ago",
      badge: "Performance",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      icon: FileText,
      iconColor: "text-blue-600 bg-blue-100",
      title: "New Learning Path Available",
      description: "Leadership Development Program - 8 courses available for enrollment",
      time: "5 hours ago",
      badge: "Learning",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      icon: AlertCircle,
      iconColor: "text-orange-600 bg-orange-100",
      title: "Document Signature Required",
      description: "Please review and sign your 2025 goals document by December 31",
      time: "1 day ago",
      badge: "Action Required",
      badgeColor: "bg-orange-100 text-orange-700",
    },
    {
      icon: MessageCircle,
      iconColor: "text-purple-600 bg-purple-100",
      title: "Town Hall Meeting Invitation",
      description: "Join our quarterly town hall on December 20, 2024 at 10:00 AM",
      time: "2 days ago",
      badge: "Event",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      icon: CheckCircle,
      iconColor: "text-green-600 bg-green-100",
      title: "Course Completed: Data Analytics 101",
      description: "Congratulations! You've earned a certificate for completing the course",
      time: "3 days ago",
      badge: "Learning",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      icon: Clock,
      iconColor: "text-gray-600 bg-gray-100",
      title: "Upcoming: Mid-Year Performance Check",
      description: "Your next performance discussion is scheduled for January 15, 2025",
      time: "5 days ago",
      badge: "Reminder",
      badgeColor: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-foreground mb-1">Recent Activity</h4>
          <p className="caption text-muted-foreground">Your latest updates and notifications</p>
        </div>
        <button className="caption text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg ${activity.iconColor} flex items-center justify-center flex-shrink-0`}>
              <activity.icon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h5 className="text-foreground">{activity.title}</h5>
                <span className="caption text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
              <p className="caption text-muted-foreground mb-2">{activity.description}</p>
              <div className={`inline-block px-2 py-1 ${activity.badgeColor} rounded-md`}>
                <span className="caption">{activity.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button className="w-full mt-4 py-3 border border-border rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors caption">
        Load More Activities
      </button>
    </div>
  );
}
