import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Search, FileText, Bookmark } from "lucide-react";
import { cn } from "@/components/ui/utils";

export function JobTenderNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { label: "Explore Job", icon: Search, path: "/talent/explore" },
    { label: "My Applications", icon: FileText, path: "/talent/my-applications" },
    { label: "Saved Jobs", icon: Bookmark, path: "/talent/saved" },
  ];

  return (
    <div className="flex items-center gap-2 mb-6 border-b border-border pb-1 overflow-x-auto">
      {navItems.map((item) => {
        const isActive =
          path === item.path ||
          (path.startsWith("/talent/explore") &&
            item.path === "/talent/explore" &&
            path !== "/talent/explore/saved" &&
            path !== "/talent/explore/applications");
        
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "gap-2 rounded-b-none rounded-t-lg h-10 px-4 relative",
                path === item.path 
                  ? "text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary font-medium after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent-subtle"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
