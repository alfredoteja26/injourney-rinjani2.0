import { useState } from "react";
import { ShieldCheck, Shield, AlertCircle, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";

interface RoleManagementModalProps {
  employee: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    position: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function RoleManagementModal({ employee, isOpen, onClose }: RoleManagementModalProps) {
  const [selectedRole, setSelectedRole] = useState(employee.role);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (selectedRole === employee.role) {
      toast.error("Please select a different role to update");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Role updated successfully for ${employee.name}`);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Role Management</DialogTitle>
          <DialogDescription>
            Change user role and permissions for {employee.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Employee Info */}
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Employee Name
                </div>
                <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {employee.name}
                </div>
              </div>
              <div>
                <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Employee ID
                </div>
                <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {employee.id}
                </div>
              </div>
              <div>
                <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Department
                </div>
                <div className="caption">
                  {employee.department}
                </div>
              </div>
              <div>
                <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Position
                </div>
                <div className="caption">
                  {employee.position}
                </div>
              </div>
            </div>
          </div>

          {/* Current Role */}
          <div>
            <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
              Current Role
            </div>
            <div className="flex items-center gap-2">
              {employee.role === "Admin" ? (
                <ShieldCheck className="w-5 h-5 text-primary" />
              ) : (
                <Shield className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                {employee.role}
              </span>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="mb-3 block">Select New Role</Label>
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
              <div className="space-y-3">
                {/* Admin Role */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedRole === "Admin" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedRole("Admin")}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="Admin" id="admin" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="admin" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="w-5 h-5 text-primary" />
                          <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            Admin
                          </span>
                        </div>
                        <p className="caption text-muted-foreground">
                          Full access to manage employee profiles, approve/reject data change requests, and manage user roles
                        </p>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              View and manage all employee profiles
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Approve or reject data change requests
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Assign and manage user roles
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Access to admin-only features
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* User Role */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedRole === "User" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedRole("User")}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="User" id="user" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="user" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-muted-foreground" />
                          <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            User
                          </span>
                        </div>
                        <p className="caption text-muted-foreground">
                          Standard access to view and manage own profile data with approval workflow for sensitive data
                        </p>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              View and edit own profile
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Submit data change requests for approval
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-chart-1" />
                            <span className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Track request status
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Alert for role change */}
          {selectedRole !== employee.role && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    Role Change Confirmation
                  </div>
                  <p className="caption text-muted-foreground">
                    Changing the role from <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{employee.role}</span> to <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{selectedRole}</span> will immediately update the user's permissions. This action will be logged in the audit trail.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="mb-2 block">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this role change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSubmitting || selectedRole === employee.role}
          >
            {isSubmitting ? "Updating..." : "Update Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
