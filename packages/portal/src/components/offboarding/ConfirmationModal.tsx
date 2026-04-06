import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  type?: 'start' | 'complete' | 'cancel';
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  type = 'start',
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const iconColor = type === 'complete' ? '#10B981' : type === 'cancel' ? '#EF4444' : '#3B82F6';
  const Icon = type === 'complete' ? CheckCircle : AlertCircle;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onCancel}
      >
        {/* Modal */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            maxWidth: '480px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: `${iconColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon style={{
                width: '32px',
                height: '32px',
                color: iconColor
              }} />
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            {title}
          </h3>

          {/* Message */}
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            textAlign: 'center',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            {message}
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <Button
              variant="outline"
              onClick={onCancel}
              style={{ minWidth: '120px' }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              style={{
                minWidth: '120px',
                backgroundColor: iconColor,
                borderColor: iconColor
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}