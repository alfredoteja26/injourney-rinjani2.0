import React, { useState, useEffect } from "react";
import { MainSidebar } from "./components/MainSidebar";
import { RinjaniSidebar } from "./components/RinjaniSidebar";
import { RinjaniHeader } from "./components/RinjaniHeader";
import SignIn from "./imports/SignIn";
import Frame from "./imports/Frame1000001738";
import MyProfile from "./components/MyProfile";
import Settings from "./components/Settings";
import SurveyTakePage from "./components/SurveyTakePage";
import SurveyAnalyticsPage from "./components/SurveyAnalyticsPage";
import SurveyManagementPage from "./components/SurveyManagementPage";
import { MicrosoftLoginPage } from "./components/MicrosoftLoginPage";
import { LoadingScreen } from "./components/LoadingScreen";
import HCDigiPolicy from "./components/HCDigiPolicy";
import PublicProfileView from "./components/PublicProfileView";
import { OnboardingProvider } from "./components/onboarding/onboarding-context";
import { SpotlightTour } from "./components/onboarding/SpotlightTour";
import { FeatureAnnouncementModal } from "./components/onboarding/FeatureAnnouncementModal";
import { NewEmployeeOnboarding } from "./components/onboarding/NewEmployeeOnboarding";
import { NewJoinerForm } from "./components/onboarding/NewJoinerForm";
import type { Notification } from "./types";
import { MyKPIDashboard } from "./components/performance/my-kpi/MyKPIDashboard";
import { MyTeamKPIDashboard } from "./components/performance/my-team-kpi/MyTeamKPIDashboard";
import { KPILibraryDashboard } from "./components/performance/kpi-library/KPILibraryDashboard";
import { KPITreeView } from "./components/performance/kpi-tree/KPITreeView";
import { HQDashboard } from "./components/performance/kpi-headquarter/HQDashboard";
import { PerformanceSidebar } from "./components/PerformanceSidebar";

export type { Notification };

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTalentSidebar, setShowTalentSidebar] = useState(false);
  const [showPerformanceSidebar, setShowPerformanceSidebar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState<"dashboard" | "talent" | "myprofile" | "settings" | "survey-take" | "survey-analytics" | "survey-management" | "hc-policy" | "employee-profile" | "new-joiner-form" | "performance">("dashboard");
  const [performancePage, setPerformancePage] = useState<'my-kpi' | 'my-team-kpi' | 'library' | 'tree' | 'headquarter'>('my-kpi');
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [showMicrosoftLogin, setShowMicrosoftLogin] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [userRole, setUserRole] = useState<"Admin" | "User">("Admin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [newJoinerFormId, setNewJoinerFormId] = useState<string | null>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "approval",
      title: "KPI Check-In Menunggu Approval",
      message: "KPI Check-In Q4 2025 dari Binavia Wardhani (Manager HC Strategy) menunggu approval Anda",
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
    } else if (hash === "#/performance") {
      setCurrentPage("performance");
      setShowTalentSidebar(false);
      setShowPerformanceSidebar(true);
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
    setShowPerformanceSidebar(false);
    setCurrentPage("talent");
  };

  const handlePerformanceClick = () => {
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(true);
    setCurrentPage("performance");
    window.location.hash = "#/performance";
  };

  const handleBackToMain = () => {
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(false);
    setCurrentPage("dashboard");
  };

  const handleDashboardClick = () => {
    window.location.hash = "";
    setCurrentPage("dashboard");
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(false);
    setSurveyId(null);
  };

  const handleProfileClick = () => {
    setCurrentPage("myprofile");
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(false);
  };

  const handleBackFromProfile = () => {
    setCurrentPage("dashboard");
  };

  const handleSettingsClick = () => {
    setCurrentPage("settings");
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(false);
  };

  const handleBackFromSettings = () => {
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    setShowTalentSidebar(false);
    setShowPerformanceSidebar(false);
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
      <div className="flex h-screen bg-background overflow-hidden">
        {showTalentSidebar ? (
          <RinjaniSidebar onBackClick={handleBackToMain} onProfileClick={handleProfileClick} />
        ) : showPerformanceSidebar ? (
          <PerformanceSidebar 
            onBackClick={handleBackToMain} 
            currentPage={performancePage} 
            onNavigate={setPerformancePage} 
          />
        ) : (
          <MainSidebar 
            isExpanded={isSidebarExpanded}
            onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            onTalentClick={handleTalentClick}
            onPerformanceClick={handlePerformanceClick}
            currentPage={currentPage}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
            onSettingsClick={handleSettingsClick}
            onDashboardClick={handleDashboardClick}
            userRole={userRole}
            userEmail={userEmail}
          />
        )}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="h-[64px] flex-shrink-0">
            <RinjaniHeader 
              userRole={userRole} 
              userEmail={userEmail} 
              onRoleChange={setUserRole}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
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
              />
            ) : currentPage === "survey-take" && surveyId ? (
              <SurveyTakePage surveyId={surveyId} onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
            ) : currentPage === "survey-analytics" && surveyId ? (
              <SurveyAnalyticsPage surveyId={surveyId} onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} userRole={userRole} />
            ) : currentPage === "survey-management" ? (
              <SurveyManagementPage onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} />
            ) : currentPage === "hc-policy" ? (
              <HCDigiPolicy onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} userRole={userRole} userEmail={userEmail} />
            ) : currentPage === "performance" ? (
              performancePage === 'my-kpi' ? <MyKPIDashboard /> :
              performancePage === 'my-team-kpi' ? <MyTeamKPIDashboard /> :
              performancePage === 'library' ? <KPILibraryDashboard /> :
              performancePage === 'tree' ? <KPITreeView /> :
              performancePage === 'headquarter' ? <HQDashboard /> :
              <div className="p-10 text-center text-gray-500">Module under construction</div>
            ) : currentPage === "employee-profile" && profileEmail ? (
              <PublicProfileView onBack={() => { window.location.hash = ""; setCurrentPage("dashboard"); }} email={profileEmail} />
            ) : (
              <Frame onProfileClick={handleProfileClick} userRole={userRole} userEmail={userEmail} />
            )}
          </main>
        </div>
      </div>
      <SpotlightTour />
      <FeatureAnnouncementModal />
      <NewEmployeeOnboarding userEmail={userEmail} renderChecklistInSidebar={false} />
    </OnboardingProvider>
  );
}

export default App;