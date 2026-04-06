/**
 * Confirmation Modal Component
 * Reusable modal for confirmations with checkbox
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  requireCheckbox?: boolean;
  checkboxLabel?: string;
  warning?: string;
  confirmDisabled?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  requireCheckbox = true,
  checkboxLabel = "I understand and confirm",
  warning,
  confirmDisabled = false
}: ConfirmationModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  const handleConfirm = () => {
    if (requireCheckbox && !isChecked) return;
    setIsChecked(false);
    onConfirm();
  };

  const isConfirmDisabled = confirmDisabled || (requireCheckbox && !isChecked);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-2xl"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-border)'
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <h3>{title}</h3>
          </DialogTitle>
          {description && (
            <DialogDescription>
              <p style={{ color: 'var(--color-muted-foreground)' }}>
                {description}
              </p>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Section */}
          {warning && (
            <div 
              className="flex items-start gap-3 rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-danger-light)',
                border: '1px solid var(--color-destructive)'
              }}
            >
              <AlertTriangle 
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: 'var(--color-destructive)' }}
              />
              <p 
                className="caption"
                style={{ color: 'var(--color-destructive)' }}
              >
                {warning}
              </p>
            </div>
          )}

          {/* Custom Content */}
          {children && (
            <div>{children}</div>
          )}

          {/* Confirmation Checkbox */}
          {requireCheckbox && (
            <div 
              className="flex items-start gap-3 rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)'
              }}
            >
              <Checkbox
                id="confirm-checkbox"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked === true)}
              />
              <label
                htmlFor="confirm-checkbox"
                className="cursor-pointer"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 1.5
                }}
              >
                {checkboxLabel}
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            style={{
              backgroundColor: isConfirmDisabled ? 'var(--color-muted)' : 'var(--color-primary)',
              color: isConfirmDisabled ? 'var(--color-muted-foreground)' : 'var(--color-primary-foreground)'
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
