import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download,
  User,
  Calendar,
  Info,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface DataChangeApprovalModalProps {
  request: {
    id: string;
    employeeId: string;
    employeeName: string;
    fieldName: string;
    oldValue: string;
    newValue: string;
    requestDate: string;
    tier: number;
    supportingDocs: string[];
    reason: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string, comments: string) => void;
  onReject: (requestId: string, comments: string) => void;
}

export function DataChangeApprovalModal({ 
  request, 
  isOpen, 
  onClose,
  onApprove,
  onReject 
}: DataChangeApprovalModalProps) {
  const [comments, setComments] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onApprove(request.id, comments);
      setIsProcessing(false);
    }, 800);
  };

  const handleReject = () => {
    if (!comments.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      onReject(request.id, comments);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Data Change Request</DialogTitle>
          <DialogDescription>
            Request ID: {request.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Employee Information */}
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {request.employeeName}
                </div>
                <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {request.employeeId}
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">
                Tier {request.tier}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    Request Date
                  </div>
                  <div className="caption">
                    {request.requestDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Field Change Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-primary" />
              <h4>Change Details</h4>
            </div>

            <div className="space-y-4">
              <div>
                <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                  Field Name
                </div>
                <div className="caption p-3 bg-muted/50 rounded-lg border border-border" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {request.fieldName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    Current Value
                  </div>
                  <div className="caption p-3 bg-muted rounded-lg border border-border min-h-[60px]">
                    {request.oldValue}
                  </div>
                </div>
                <div>
                  <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    Requested New Value
                  </div>
                  <div className="caption p-3 bg-primary/5 rounded-lg border border-primary/30 min-h-[60px]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    {request.newValue}
                  </div>
                </div>
              </div>

              <div>
                <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                  Reason for Change
                </div>
                <div className="caption p-3 bg-muted/50 rounded-lg border border-border">
                  {request.reason}
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h4>Supporting Documents</h4>
              <Badge variant="outline" className="ml-auto">
                {request.supportingDocs.length} files
              </Badge>
            </div>

            <div className="space-y-2">
              {request.supportingDocs.map((doc, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {doc}
                      </div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        PDF Document
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice for Tier 2 */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Tier {request.tier} Data Change Request
                </div>
                <p className="caption text-muted-foreground">
                  This is a Tier {request.tier} field that requires admin approval and supporting documentation. Please verify all documents before approving this request. Once approved, the change will be immediately reflected in the employee's profile.
                </p>
              </div>
            </div>
          </div>

          {/* Admin Comments */}
          <div>
            <Label htmlFor="comments" className="mb-2 block">
              Admin Comments {!comments.trim() && <span className="text-muted-foreground">(Required for rejection)</span>}
            </Label>
            <Textarea
              id="comments"
              placeholder="Add your comments or notes about this request..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReject}
            disabled={isProcessing}
            className="gap-2 border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground/10"
          >
            <XCircle className="w-4 h-4" />
            {isProcessing ? "Processing..." : "Reject"}
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={isProcessing}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {isProcessing ? "Processing..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
