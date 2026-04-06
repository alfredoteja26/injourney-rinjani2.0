import React, { useState } from "react";
import { ChevronLeft, Settings as SettingsIcon } from "lucide-react";
import { SurveyComponentsPreview } from "./SurveyComponentsPreview";
import { SettingsTab, SettingsTabList } from "./SettingsTab";
import { Button } from "./ui/button";
import UserManagement from "./UserManagement";
import MessageBroadcast from "./MessageBroadcast";
import ContentManagement from "./ContentManagement";
import { SurveyManagementSettings } from "./SurveyManagementSettings";
import { EnhancedSurveyBuilder } from "./EnhancedSurveyBuilder";
import { SurveyResultsView } from "./SurveyResultsView";
import { OnboardingSettings } from "./onboarding/OnboardingSettings";
import type { Notification } from "../types";

interface SettingsProps {
  onBack: () => void;
  userRole?: "Admin" | "User";
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onAddNotification: (notification: Notification) => void;
  onViewSurveyResults?: (surveyId: string) => void;
}

export default function Settings({ 
  onBack, 
  userRole = "User", 
  notifications, 
  setNotifications, 
  onAddNotification,
  onViewSurveyResults 
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState("user-management");
  const [showSurveyBuilder, setShowSurveyBuilder] = useState(false);
  const [showSurveyResults, setShowSurveyResults] = useState(false);
  const [currentSurveyId, setCurrentSurveyId] = useState<string | null>(null);
  const [editingSurvey, setEditingSurvey] = useState<any>(null);

  const handleCreateSurvey = () => {
    setEditingSurvey(null);
    setShowSurveyBuilder(true);
  };

  const handleEditSurvey = (surveyId: string) => {
    // Mock survey data - in production, fetch from API
    const survey = {
      id: surveyId,
      title: "Employee Engagement Q4 2024",
      type: "engagement",
      status: "active",
      deadline: "2024-12-31",
      targetAudience: { type: "all" as const, value: "All Employees" },
      totalQuestions: 15,
      aiEnabled: true
    };
    setEditingSurvey(survey);
    setShowSurveyBuilder(true);
  };

  const handleViewResults = (surveyId: string) => {
    // Don't change the hash, just show the results view
    setCurrentSurveyId(surveyId);
    setShowSurveyResults(true);
  };

  const handleBackFromBuilder = () => {
    setShowSurveyBuilder(false);
    setEditingSurvey(null);
  };

  const handleBackFromResults = () => {
    setShowSurveyResults(false);
    setCurrentSurveyId(null);
  };

  if (showSurveyBuilder) {
    return (
      <EnhancedSurveyBuilder 
        survey={editingSurvey} 
        onBack={handleBackFromBuilder} 
      />
    );
  }

  if (showSurveyResults && currentSurveyId) {
    return (
      <SurveyResultsView 
        surveyId={currentSurveyId} 
        onBack={handleBackFromResults} 
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Button
              variant="ghost"
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ChevronLeft style={{ width: '20px', height: '20px' }} />
              Back
            </Button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <SettingsIcon style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
            <h1 style={{ color: 'var(--foreground)' }}>Settings</h1>
          </div>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            Manage system settings, user permissions, notifications, and content
          </p>
        </div>

        {/* Tabs Navigation with new design */}
        <SettingsTabList>
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "user-management"}
              onClick={() => setActiveTab("user-management")}
            >
              User Management
            </SettingsTab>
          )}
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </SettingsTab>
          )}
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "cms"}
              onClick={() => setActiveTab("cms")}
            >
              Content Management
            </SettingsTab>
          )}
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "survey"}
              onClick={() => setActiveTab("survey")}
            >
              Survey Management
            </SettingsTab>
          )}
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "survey-components"}
              onClick={() => setActiveTab("survey-components")}
            >
              Survey Components
            </SettingsTab>
          )}
          {userRole === "Admin" && (
            <SettingsTab 
              isActive={activeTab === "onboarding"}
              onClick={() => setActiveTab("onboarding")}
            >
              Onboarding
            </SettingsTab>
          )}
        </SettingsTabList>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '24px 32px' }}>
        {activeTab === "user-management" && userRole === "Admin" && (
          <div style={{ 
            backgroundColor: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            overflow: 'hidden' 
          }}>
            <UserManagement onBack={onBack} />
          </div>
        )}

        {activeTab === "notifications" && userRole === "Admin" && (
          <div style={{ 
            backgroundColor: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            padding: '32px' 
          }}>
            <MessageBroadcast 
              notifications={notifications}
              setNotifications={setNotifications}
              onAddNotification={onAddNotification}
            />
          </div>
        )}

        {activeTab === "cms" && userRole === "Admin" && (
          <ContentManagement />
        )}

        {activeTab === "survey" && userRole === "Admin" && (
          <div style={{ 
            backgroundColor: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            padding: '32px' 
          }}>
            <SurveyManagementSettings 
              onCreateSurvey={handleCreateSurvey}
              onEditSurvey={handleEditSurvey}
              onViewResults={handleViewResults}
            />
          </div>
        )}

        {activeTab === "survey-components" && userRole === "Admin" && (
          <div style={{ 
            backgroundColor: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            padding: '32px' 
          }}>
            <SurveyComponentsPreview />
          </div>
        )}

        {activeTab === "onboarding" && userRole === "Admin" && (
          <div style={{ 
            backgroundColor: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            padding: '32px' 
          }}>
            <OnboardingSettings />
          </div>
        )}
      </div>
    </div>
  );
}