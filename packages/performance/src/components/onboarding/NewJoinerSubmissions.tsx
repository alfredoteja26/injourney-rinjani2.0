import React, { useState } from "react";
import { FolderOpen, Send, Settings, ChevronDown, Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Submission {
  id: string;
  deliveryDate: string;
  expiryDate: string;
  email: string;
  status: "pending" | "completed" | "expired";
  sentBy: string;
}

interface NewJoinerSubmissionsProps {
  onFormSettings: () => void;
}

export function NewJoinerSubmissions({ onFormSettings }: NewJoinerSubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([
    // Mock data - in production, fetch from API
    {
      id: "NJ-001",
      deliveryDate: "2026-01-05",
      expiryDate: "2026-01-15",
      email: "john.doe@injourney.co.id",
      status: "pending",
      sentBy: "Admin"
    },
    {
      id: "NJ-002",
      deliveryDate: "2026-01-03",
      expiryDate: "2026-01-13",
      email: "jane.smith@injourney.co.id",
      status: "completed",
      sentBy: "Admin"
    },
  ]);

  const [showSendFormDialog, setShowSendFormDialog] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleSendForm = () => {
    if (newEmail && expiryDate) {
      const newSubmission: Submission = {
        id: `NJ-${String(submissions.length + 1).padStart(3, '0')}`,
        deliveryDate: new Date().toISOString().split('T')[0],
        expiryDate: expiryDate,
        email: newEmail,
        status: "pending",
        sentBy: "Admin"
      };
      
      setSubmissions([newSubmission, ...submissions]);
      setShowSendFormDialog(false);
      
      // Generate the form link
      const formLink = `${window.location.origin}/#/new-joiner-form/${newSubmission.id}`;
      
      setNewEmail("");
      setExpiryDate("");
      
      // Show success notification with the link
      alert(`Form link sent to ${newEmail}\n\nLink: ${formLink}\n\n(In production, this would be sent via email)`);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' };
      case "pending":
        return { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' };
      case "expired":
        return { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' };
      default:
        return { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' };
    }
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowViewDialog(true);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2>New joiner submission</h2>
          <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
            Manage and track new employee form submissions
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button 
            variant="outline" 
            onClick={onFormSettings}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Settings style={{ width: '16px', height: '16px' }} />
            Form settings
          </Button>
          <Button 
            onClick={() => setShowSendFormDialog(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Send style={{ width: '16px', height: '16px' }} />
            Send form link
          </Button>
        </div>
      </div>

      {/* Submissions Table or Empty State */}
      {submissions.length === 0 ? (
        <div style={{ 
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '80px 24px',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ position: 'relative', width: '200px', height: '160px' }}>
              {/* Illustration - simplified folder with question mark */}
              <div style={{
                width: '140px',
                height: '120px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                margin: '0 auto',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FolderOpen 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    color: 'var(--muted-foreground)',
                    opacity: 0.5
                  }} 
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '30px',
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid var(--card)'
              }}>
                <span style={{ 
                  color: 'var(--primary-foreground)',
                  fontSize: '24px',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  ?
                </span>
              </div>
            </div>
          </div>
          <h3 style={{ marginBottom: '8px' }}>New joiner submission will appear here</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            You can set up the submission form or send an invitation to the new joiner to fill out the form.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button 
              variant="outline" 
              onClick={onFormSettings}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Form settings
            </Button>
            <Button 
              onClick={() => setShowSendFormDialog(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Send form link
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden'
        }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Submission ID
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Delivery date
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Expiry date
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Email
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Status
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Sent by
                    <ChevronDown style={{ width: '14px', height: '14px' }} />
                  </div>
                </TableHead>
                <TableHead style={{ width: '80px' }}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="caption">{submission.id}</TableCell>
                  <TableCell className="caption">
                    {new Date(submission.deliveryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell className="caption">
                    {new Date(submission.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell className="caption">{submission.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusBadgeVariant(submission.status)}
                      style={{
                        ...getStatusColor(submission.status),
                        textTransform: 'capitalize'
                      }}
                    >
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="caption">{submission.sentBy}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewSubmission(submission)}
                      style={{ padding: '4px 8px' }}
                    >
                      <Eye style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Send Form Dialog */}
      <Dialog open={showSendFormDialog} onOpenChange={setShowSendFormDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send form link</DialogTitle>
          </DialogHeader>
          <div style={{ padding: '24px 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <Label htmlFor="email">
                Email address <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="newemployee@injourney.co.id"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{ marginTop: '8px' }}
              />
              <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                Enter the new employee's @injourney.co.id email
              </p>
            </div>
            <div>
              <Label htmlFor="expiryDate">
                Expiry date <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ marginTop: '8px' }}
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                Set the deadline for form completion
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSendFormDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendForm}
              disabled={!newEmail || !expiryDate}
            >
              Send link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Submission Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div style={{ padding: '24px 0' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '140px 1fr', 
                gap: '16px',
                fontSize: 'var(--text-sm)'
              }}>
                <div style={{ color: 'var(--muted-foreground)' }}>Submission ID:</div>
                <div>{selectedSubmission.id}</div>
                
                <div style={{ color: 'var(--muted-foreground)' }}>Email:</div>
                <div>{selectedSubmission.email}</div>
                
                <div style={{ color: 'var(--muted-foreground)' }}>Delivery Date:</div>
                <div>
                  {new Date(selectedSubmission.deliveryDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                <div style={{ color: 'var(--muted-foreground)' }}>Expiry Date:</div>
                <div>
                  {new Date(selectedSubmission.expiryDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                <div style={{ color: 'var(--muted-foreground)' }}>Status:</div>
                <div>
                  <Badge 
                    variant={getStatusBadgeVariant(selectedSubmission.status)}
                    style={{
                      ...getStatusColor(selectedSubmission.status),
                      textTransform: 'capitalize'
                    }}
                  >
                    {selectedSubmission.status}
                  </Badge>
                </div>
                
                <div style={{ color: 'var(--muted-foreground)' }}>Sent By:</div>
                <div>{selectedSubmission.sentBy}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}