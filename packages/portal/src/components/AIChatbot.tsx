import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Halo! Saya VIA (Virtual Injourney Assistant). Ada yang bisa saya bantu? Saya dapat membantu Anda dengan:\n\n• HC Policy & Prosedur\n• Informasi KPI\n• Data Talent\n• FAQ Umum',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        const floatingButton = document.querySelector('[aria-label="Open VIA (Virtual Injourney Assistant)"]');
        if (floatingButton && !floatingButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cuti') || lowerQuery.includes('leave')) {
      return 'Kebijakan cuti dapat Anda temukan di HC Digi Policy. Berikut ringkasannya:\n\n• Cuti Tahunan: 12 hari/tahun\n• Cuti Sakit: Dengan surat dokter\n• Cuti Khusus: Sesuai kebijakan perusahaan\n\nApakah ada hal spesifik yang ingin Anda tanyakan?';
    }
    
    if (lowerQuery.includes('kpi')) {
      return 'KPI Dictionary kami memiliki 450+ standar KPI dengan formula dan benchmark lengkap. Anda dapat mengaksesnya melalui menu Performance.\n\nContoh KPI populer:\n• Revenue Growth Rate\n• Employee Retention Rate\n• Customer Satisfaction Score\n\nApakah Anda ingin informasi KPI spesifik?';
    }
    
    if (lowerQuery.includes('talent') || lowerQuery.includes('karyawan')) {
      return 'Untuk informasi talent, Anda dapat:\n\n• Cek profil karyawan di Talent Management\n• Lihat struktur organisasi\n• Akses data performance\n• Review succession planning\n\nApa informasi spesifik yang Anda butuhkan?';
    }
    
    if (lowerQuery.includes('gaji') || lowerQuery.includes('salary')) {
      return 'Untuk informasi terkait gaji, silakan hubungi:\n\n• HR Department: hr@injourney.co.id\n• Extension: 2100\n\nInformasi gaji bersifat rahasia dan tidak dapat diakses melalui chatbot.';
    }

    if (lowerQuery.includes('training') || lowerQuery.includes('pelatihan')) {
      return 'Program training tersedia di Learning Management System:\n\n• Technical Skills Training\n• Soft Skills Development\n• Leadership Program\n• Certification Courses\n\nCek kalender training untuk jadwal terbaru!';
    }
    
    return 'Terima kasih atas pertanyaan Anda. Saya akan terus belajar untuk memberikan jawaban yang lebih baik.\n\nUntuk pertanyaan spesifik, silakan hubungi:\n• HR Helpdesk: hr@injourney.co.id\n• Ext: 2100\n\nAda yang bisa saya bantu lagi?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'HC Policy', query: 'Bagaimana cara mengakses HC Policy?' },
    { label: 'KPI Info', query: 'Apa itu KPI Dictionary?' },
    { label: 'Cuti', query: 'Bagaimana cara mengajukan cuti?' },
    { label: 'Training', query: 'Program training apa saja yang tersedia?' }
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          border: 'none',
          boxShadow: 'var(--elevation-sm), 0px 8px 16px rgba(0, 133, 138, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = 'var(--elevation-sm), 0px 12px 24px rgba(0, 133, 138, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'var(--elevation-sm), 0px 8px 16px rgba(0, 133, 138, 0.3)';
        }}
        aria-label="Open VIA (Virtual Injourney Assistant)"
      >
        {isOpen ? (
          <X style={{ width: '24px', height: '24px' }} />
        ) : (
          <MessageCircle style={{ width: '24px', height: '24px' }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '32px',
            width: '380px',
            height: '600px',
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius)',
            boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderTopLeftRadius: 'var(--radius)',
              borderTopRightRadius: 'var(--radius)',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles style={{ width: '20px', height: '20px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-base)',
                  margin: 0,
                  lineHeight: '20px',
                }}
              >
                VIA
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'var(--font-weight-normal)',
                  fontSize: 'var(--text-xs)',
                  margin: 0,
                  opacity: 0.9,
                  lineHeight: '16px',
                }}
              >
                Virtual Injourney Assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'var(--background)',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: message.type === 'bot' ? 'var(--primary)' : 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white',
                  }}
                >
                  {message.type === 'bot' ? (
                    <Bot style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <User style={{ width: '18px', height: '18px' }} />
                  )}
                </div>
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: message.type === 'bot' ? 'var(--muted)' : 'var(--primary)',
                    color: message.type === 'bot' ? 'var(--foreground)' : 'var(--primary-foreground)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 'var(--font-weight-normal)',
                      fontSize: 'var(--text-sm)',
                      margin: 0,
                      lineHeight: '20px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white',
                  }}
                >
                  <Bot style={{ width: '18px', height: '18px' }} />
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--muted)',
                    display: 'flex',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted-foreground)',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted-foreground)',
                      animation: 'bounce 1.4s infinite ease-in-out both 0.2s',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted-foreground)',
                      animation: 'bounce 1.4s infinite ease-in-out both 0.4s',
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div
              style={{
                padding: '0 20px 12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                backgroundColor: 'var(--background)',
              }}
            >
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(action.query);
                    setTimeout(() => handleSend(), 100);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--foreground)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--text-xs)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--muted)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--card)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--input-background)',
                color: 'var(--foreground)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'var(--font-weight-normal)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--ring)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius)',
                backgroundColor: inputValue.trim() ? 'var(--primary)' : 'var(--muted)',
                color: inputValue.trim() ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                border: 'none',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <Send style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
      )}

      {/* Typing Animation Keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
}