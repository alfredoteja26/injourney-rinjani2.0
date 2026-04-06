import React, { useState, useEffect } from "react";
import { MainSidebar } from "./components/MainSidebar";
import { RinjaniSidebar } from "./components/RinjaniSidebar";
import { RinjaniHeader } from "./components/RinjaniHeader";
import SignIn from "./imports/SignIn";
import Frame from "./imports/Frame1000001738";
import MyProfile from "./components/MyProfile";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import SurveyTakePage from "./components/SurveyTakePage";
import SurveyAnalyticsPage from "./components/SurveyAnalyticsPage";
import SurveyManagementPage from "./components/SurveyManagementPage";
import { SurveyPage } from "./components/SurveyPage";
import { MicrosoftLoginPage } from "./components/MicrosoftLoginPage";
import { LoadingScreen } from "./components/LoadingScreen";
import HCDigiPolicy from "./components/HCDigiPolicy";
import PublicProfileView from "./components/PublicProfileView";
import { OnboardingProvider, useOnboarding } from "./components/onboarding/onboarding-context";
import { NewEmployeeOnboarding } from "./components/onboarding/NewEmployeeOnboarding";
import { NewJoinerForm } from "./components/onboarding/NewJoinerForm";
import { MandatorySurveyModal } from "./components/survey/MandatorySurveyModal";
import { MailManagement } from "./components/MailManagement";
import { OffboardingStatus } from "./components/OffboardingStatus";
import type { Notification } from "./types";

export type { Notification };

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTalentSidebar, setShowTalentSidebar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState<"dashboard" | "talent" | "myprofile" | "settings" | "survey" | "survey-take" | "survey-analytics" | "survey-management" | "hc-policy" | "employee-profile" | "new-joiner-form" | "analytics" | "mail" | "offboarding">("dashboard");
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [showMicrosoftLogin, setShowMicrosoftLogin] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [userRole, setUserRole] = useState<"Admin" | "User">("Admin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [newJoinerFormId, setNewJoinerFormId] = useState<string | null>(null);
  
  // Mandatory Survey State
  const [showMandatorySurvey, setShowMandatorySurvey] = useState(false);
  const [currentMandatorySurvey, setCurrentMandatorySurvey] = useState<any>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "approval",
      title: "KPI Check-In Menunggu Approval",
      message: "KPI Check-In Q4 2025 dari Binavia Wardhani (HC Strategy Senior Officer) menunggu approval Anda",
      timestamp: "2 jam lalu",
      read: false,
      sender: "Binavia Wardhani"
    },
    {
      id: "2",
      type: "deadline",
      title: "Deadline Survey Engagement",
      message: "Employee Engagement Survey Q4 akan berakhir dalam 3 hari. Pastikan tim Anda telah mengisi survey.",
      timestamp: "1 hari lalu",
      read: false,
    },
    {
      id: "3",
      type: "announcement",
      title: "Update Kebijakan Cuti",
      message: "Kebijakan cuti tahunan telah diperbarui. Silakan cek HC Digi Policy untuk detail lengkap.",
      timestamp: "2 hari lalu",
      read: true,
      sender: "HR Department"
    },
    {
      id: "4",
      type: "approval",
      title: "Data Change Request",
      message: "Permohonan perubahan data dari Ahmad Zulfikar menunggu approval Anda",
      timestamp: "3 hari lalu",
      read: true,
      sender: "Ahmad Zulfikar"
    },
    {
      id: "5",
      type: "deadline",
      title: "Performance Review Deadline",
      message: "Performance Review periode Q4 2025 harus diselesaikan sebelum 31 Desember 2025",
      timestamp: "5 hari lalu",
      read: true,
    }
  ]);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const handleHashChange = () => {
    const hash = window.location.hash;
    
    if (hash.startsWith("#/survey/") && hash.endsWith("/analytics")) {
      const id = hash.replace("#/survey/", "").replace("/analytics", "");
      setSurveyId(id);
      setCurrentPage("survey-analytics");
      setShowTalentSidebar(false);
    } else if (hash === "#/survey/management") {
      setCurrentPage("survey-management");
      setShowTalentSidebar(false);
    } else if (hash.startsWith("#/survey/")) {
      const id = hash.replace("#/survey/", "");
      setSurveyId(id);
      setCurrentPage("survey-take");
      setShowTalentSidebar(false);
    } else if (hash.startsWith("#/employee-profile/")) {
      const email = hash.replace("#/employee-profile/", "");
      setProfileEmail(decodeURIComponent(email));
      setCurrentPage("employee-profile");
      setShowTalentSidebar(false);
    } else if (hash === "#/settings") {
      setCurrentPage("settings");
      setShowTalentSidebar(false);
    } else if (hash === "#/myprofile") {
      setCurrentPage("myprofile");
      setShowTalentSidebar(false);
    } else if (hash === "#/hc-policy") {
      setCurrentPage("hc-policy");
      setShowTalentSidebar(false);
    } else if (hash.startsWith("#/new-joiner-form/")) {
      const id = hash.replace("#/new-joiner-form/", "");
      setNewJoinerFormId(id);
      setCurrentPage("new-joiner-form");
      setShowTalentSidebar(false);
    } else if (hash === "#/analytics") {
      setCurrentPage("analytics");
      setShowTalentSidebar(false);
    } else if (hash === "#/mail") {
      setCurrentPage("mail");
      setShowTalentSidebar(false);
    } else if (hash === "#/offboarding") {
      setCurrentPage("offboarding");
      setShowTalentSidebar(false);
    } else {
      setCurrentPage("dashboard");
      setSurveyId(null);
      setProfileEmail(null);
      setNewJoinerFormId(null);
    }
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Check for mandatory surveys after login
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      checkMandatorySurvey();
    }
  }, [isLoggedIn, userEmail]);

  const checkMandatorySurvey = () => {
    // Mock: Check if there's an active mandatory survey
    // In production, fetch from API
    const today = new Date().toISOString().split('T')[0];
    
    // Mock mandatory survey data
    const mockMandatorySurvey = {
      id: 'mandatory-daily-checkin-2026',
      title: 'Daily Check-In',
      description: 'How are you feeling today? Your feedback helps us create a better workplace.',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice' as const,
          question: 'How happy are you to come to work today?',
          required: true,
          options: [
            '🔥 On Fire!',
            '😊 Happy',
            '😐 Flat',
            '😠 Angry'
          ]
        }
      ]
    };

    // Check if survey is active
    const isActive = today >= mockMandatorySurvey.startDate && today <= mockMandatorySurvey.endDate;
    
    // Check if user has completed this survey (mock check)
    const completedSurveys = JSON.parse(localStorage.getItem('completedMandatorySurveys') || '{}');
    const hasCompleted = completedSurveys[userEmail]?.includes(mockMandatorySurvey.id);

    if (isActive && !hasCompleted) {
      setCurrentMandatorySurvey(mockMandatorySurvey);
      setShowMandatorySurvey(true);
    }
  };

  const handleMandatorySurveyComplete = (surveyId: string, responses: Record<string, any>) => {
    // Save completion to localStorage (in production, save to backend)
    const completedSurveys = JSON.parse(localStorage.getItem('completedMandatorySurveys') || '{}');
    if (!completedSurveys[userEmail]) {
      completedSurveys[userEmail] = [];
    }
    completedSurveys[userEmail].push(surveyId);
    localStorage.setItem('completedMandatorySurveys', JSON.stringify(completedSurveys));

    // Save responses (in production, send to backend)
    const allResponses = JSON.parse(localStorage.getItem('mandatorySurveyResponses') || '[]');
    allResponses.push(responses);
    localStorage.setItem('mandatorySurveyResponses', JSON.stringify(allResponses));

    // Close modal
    setShowMandatorySurvey(false);
    setCurrentMandatorySurvey(null);

    // Show success notification
    addNotification({
      id: `notif-${Date.now()}`,
      type: 'announcement',
      title: 'Survey Completed',
      message: 'Thank you for completing the mandatory survey!',
      timestamp: 'Just now',
      read: false,
      sender: 'System'
    });
  };

  const handleLogin = (email: string, role: "Admin" | "User") => {
    setUserEmail(email);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleMicrosoftLogin = () => {
    setShowMicrosoftLogin(true);
  };

  const handleBackFromMicrosoft = () => {
    setShowMicrosoftLogin(false);
  };

  const handleMicrosoftLoginSuccess = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowMicrosoftLogin(false);
      setIsLoggedIn(true);
    }, 3000);
  };

  const handleTalentClick = () => {
    setShowTalentSidebar(true);
    setCurrentPage("talent");
  };

  const handleBackToMain = () => {
    setShowTalentSidebar(false);
    setCurrentPage("dashboard");
  };

  const handleDashboardClick = () => {
    window.location.hash = "";
    setCurrentPage("dashboard");
    setShowTalentSidebar(false);
    setSurveyId(null);
  };

  const handleProfileClick = () => {
    setCurrentPage("myprofile");
    setShowTalentSidebar(false);
  };

  const handleBackFromProfile = () => {
    setCurrentPage("dashboard");
  };

  const handleSettingsClick = () => {
    setCurrentPage("settings");
    setShowTalentSidebar(false);
  };

  const handleBackFromSettings = () => {
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    setShowTalentSidebar(false);
  };

  // Check if the user is accessing the new joiner form (public page)
  if (currentPage === "new-joiner-form" && newJoinerFormId) {
    return <NewJoinerForm formId={newJoinerFormId} />;
  }

  if (!isLoggedIn) {
    if (showMicrosoftLogin) {
      return (
        <>
          <MicrosoftLoginPage onLogin={handleMicrosoftLoginSuccess} onBack={handleBackFromMicrosoft} />
          {showLoading && <LoadingScreen />}
        </>
      );
    }
    return <SignIn onLogin={handleLogin} onMicrosoftLogin={handleMicrosoftLogin} />;
  }

  return (
    <OnboardingProvider userId={userEmail}>
      {/* Mandatory Survey Modal - Blocks everything */}
      {showMandatorySurvey && currentMandatorySurvey && (
        <MandatorySurveyModal
          survey={currentMandatorySurvey}
          onComplete={handleMandatorySurveyComplete}
          userEmail={userEmail}
        />
      )}
      
      <AppContent 
        showTalentSidebar={showTalentSidebar}
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        currentPage={currentPage}
        userRole={userRole}
        userEmail={userEmail}
        notifications={notifications}
        setNotifications={setNotifications}
        surveyId={surveyId}
        profileEmail={profileEmail}
        handleBackToMain={handleBackToMain}
        handleProfileClick={handleProfileClick}
        handleTalentClick={handleTalentClick}
        handleLogout={handleLogout}
        handleSettingsClick={handleSettingsClick}
        handleDashboardClick={handleDashboardClick}
        handleBackFromProfile={handleBackFromProfile}
        handleBackFromSettings={handleBackFromSettings}
        setCurrentPage={setCurrentPage}
        setSurveyId={setSurveyId}
        addNotification={addNotification}
        showMandatorySurvey={showMandatorySurvey}
      />
    </OnboardingProvider>
  );
}

export default App;

// Inner component to access onboarding context
function AppContent({
  showTalentSidebar,
  isSidebarExpanded,
  setIsSidebarExpanded,
  currentPage,
  userRole,
  userEmail,
  notifications,
  setNotifications,
  surveyId,
  profileEmail,
  handleBackToMain,
  handleProfileClick,
  handleTalentClick,
  handleLogout,
  handleSettingsClick,
  handleDashboardClick,
  handleBackFromProfile,
  handleBackFromSettings,
  setCurrentPage,
  setSurveyId,
  addNotification,
  showMandatorySurvey
}: any) {
  // Access onboarding context
  let checklistData: any = { items: [], onComplete: () => {}, show: false };
  try {
    const onboardingContext = useOnboarding();
    checklistData = {
      items: onboardingContext.newEmployeeChecklistItems || [],
      onComplete: onboardingContext.completeChecklistItem || (() => {}),
      show: onboardingContext.showNewEmployeeChecklist || false
    };
  } catch (e) {
    // Context not available yet
  }

  // Handler to notify PIC
  const handleNotifyPIC = (itemId: string) => {
    const item = checklistData.items.find((i: any) => i.id === itemId);
    if (item && item.pic) {
      // Create notification for PIC
      const newNotification = {
        id: Date.now().toString(),
        type: 'approval' as const,
        title: 'Request Bantuan Onboarding',
        message: `${userEmail} meminta bantuan untuk: ${item.title}`,
        timestamp: 'Baru saja',
        read: false,
        sender: userEmail,
      };
      addNotification(newNotification);
      
      // Show success feedback
      alert(`Notifikasi telah dikirim ke ${item.pic}`);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {showTalentSidebar ? (
        <RinjaniSidebar onBackClick={handleBackToMain} onProfileClick={handleProfileClick} />
      ) : (
        <MainSidebar 
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
          onTalentClick={handleTalentClick}
          currentPage={currentPage}
          onProfileClick={handleProfileClick}
          onLogout={handleLogout}
          onSettingsClick={handleSettingsClick}
          onDashboardClick={handleDashboardClick}
          onSurveyClick={() => setCurrentPage("survey")}
          onAnalyticsClick={() => { window.location.hash = "#/analytics"; setCurrentPage("analytics"); }}
          onMailClick={() => { window.location.hash = "#/mail"; setCurrentPage("mail"); }}
          userRole={userRole}
          userEmail={userEmail}
          checklistItems={checklistData.items}
          onChecklistItemComplete={checklistData.onComplete}
          onNotifyPIC={handleNotifyPIC}
          showChecklist={checklistData.show}
        />
      )}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <div className="h-[64px] flex-shrink-0">
          <RinjaniHeader 
            userRole={userRole} 
            userEmail={userEmail} 
            onRoleChange={() => {}}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#006573]">
          {currentPage === "myprofile" ? (
            <MyProfile onBack={handleBackFromProfile} userRole={userRole} userEmail={userEmail} onLogout={handleLogout} />
          ) : currentPage === "settings" ? (
            <Settings 
              onBack={handleBackFromSettings} 
              userRole={userRole} 
              notifications={notifications}
              setNotifications={setNotifications}
              onAddNotification={addNotification}
              onViewSurveyResults={(surveyId) => {
                setSurveyId(surveyId);
                setCurrentPage("survey-analytics");
              }}
              userEmail={userEmail}
            />
          ) : currentPage === "survey-take" && surveyId ? (
            <SurveyTakePage surveyId={surveyId} onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
          ) : currentPage === "survey-analytics" && surveyId ? (
            <SurveyAnalyticsPage surveyId={surveyId} onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} userRole={userRole} />
          ) : currentPage === "survey-management" ? (
            <SurveyManagementPage onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
          ) : currentPage === "survey" ? (
            <SurveyPage userRole={userRole} />
          ) : currentPage === "hc-policy" ? (
            <HCDigiPolicy onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} userRole={userRole} userEmail={userEmail} />
          ) : currentPage === "employee-profile" && profileEmail ? (
            <PublicProfileView onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} email={profileEmail} />
          ) : currentPage === "analytics" ? (
            <Analytics onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
          ) : currentPage === "mail" ? (
            <MailManagement onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
          ) : currentPage === "offboarding" ? (
            <OffboardingStatus 
              employeeName={userEmail === "binavia@injourney.co.id" ? "Binavia Wardhani" : userEmail}
              lastWorkingDay={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
            />
          ) : (
            <Frame onProfileClick={handleProfileClick} userRole={userRole} userEmail={userEmail} />
          )}
        </main>
      </div>
      {/* Only show onboarding widgets if no mandatory survey is active */}
      {!showMandatorySurvey && (
        <NewEmployeeOnboarding userEmail={userEmail} renderChecklistInSidebar={true} />
      )}
    </div>
  );
}