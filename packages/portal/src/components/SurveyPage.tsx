import React, { useState } from "react";
import { ClipboardList, Calendar, Clock } from "lucide-react";
import { MOCK_SURVEYS } from "./EmployeeSurvey";

interface SurveyPageProps {
  userRole?: "Admin" | "User";
}

export function SurveyPage({ userRole = "User" }: SurveyPageProps) {
  const [activeTab, setActiveTab] = useState<"ongoing" | "finished">("ongoing");

  // Filter surveys based on tab
  const ongoingSurveys = MOCK_SURVEYS.filter(survey => !survey.completed && survey.status === "active");
  const finishedSurveys = MOCK_SURVEYS.filter(survey => survey.completed || survey.status === "closed");

  const displaySurveys = activeTab === "ongoing" ? ongoingSurveys : finishedSurveys;

  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1198px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius)",
                backgroundColor: "rgba(0, 133, 138, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ClipboardList style={{ width: "24px", height: "24px", color: "var(--primary)" }} />
            </div>
            <div>
              <h1 className="h2" style={{ color: "var(--foreground)", marginBottom: "4px" }}>Survey</h1>
              <p className="body" style={{ color: "var(--muted-foreground)" }}>
                Kelola dan kerjakan survey Anda
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "0"
          }}
        >
          <button
            onClick={() => setActiveTab("ongoing")}
            style={{
              padding: "12px 24px",
              backgroundColor: activeTab === "ongoing" ? "transparent" : "transparent",
              border: "none",
              borderBottom: activeTab === "ongoing" ? "2px solid var(--primary)" : "2px solid transparent",
              color: activeTab === "ongoing" ? "var(--primary)" : "var(--muted-foreground)",
              fontFamily: "'Inter:Semi_Bold',sans-serif",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
              position: "relative",
              top: "1px"
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "ongoing") {
                e.currentTarget.style.color = "var(--foreground)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "ongoing") {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }
            }}
          >
            Ongoing ({ongoingSurveys.length})
          </button>
          <button
            onClick={() => setActiveTab("finished")}
            style={{
              padding: "12px 24px",
              backgroundColor: activeTab === "finished" ? "transparent" : "transparent",
              border: "none",
              borderBottom: activeTab === "finished" ? "2px solid var(--primary)" : "2px solid transparent",
              color: activeTab === "finished" ? "var(--primary)" : "var(--muted-foreground)",
              fontFamily: "'Inter:Semi_Bold',sans-serif",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
              position: "relative",
              top: "1px"
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "finished") {
                e.currentTarget.style.color = "var(--foreground)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "finished") {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }
            }}
          >
            Finished ({finishedSurveys.length})
          </button>
        </div>

        {/* Survey Cards */}
        {displaySurveys.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)"
            }}
          >
            <ClipboardList style={{ width: "48px", height: "48px", color: "var(--muted-foreground)", margin: "0 auto 16px" }} />
            <h3 className="h4" style={{ color: "var(--foreground)", marginBottom: "8px" }}>
              {activeTab === "ongoing" ? "Tidak Ada Survey Ongoing" : "Tidak Ada Survey Finished"}
            </h3>
            <p className="body" style={{ color: "var(--muted-foreground)" }}>
              {activeTab === "ongoing" 
                ? "Belum ada survey yang perlu dikerjakan saat ini" 
                : "Anda belum menyelesaikan survey apapun"}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px"
            }}
          >
            {displaySurveys.map((survey) => {
              const responsePercentage = Math.round((survey.responseCount / survey.targetCount) * 100);

              return (
                <div
                  key={survey.id}
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    transition: "all 0.2s",
                    cursor: activeTab === "ongoing" ? "pointer" : "default",
                    opacity: activeTab === "finished" ? 0.7 : 1
                  }}
                  onClick={() => {
                    if (activeTab === "ongoing") {
                      window.location.hash = `/survey/${survey.id}`;
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab === "ongoing") {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 133, 138, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Survey Header */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {/* Type Badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        width: "fit-content",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(0, 133, 138, 0.1)",
                        border: "1px solid rgba(0, 133, 138, 0.2)"
                      }}
                    >
                      <span
                        className="caption"
                        style={{
                          color: "var(--primary)",
                          fontFamily: "'Inter:Medium',sans-serif",
                          fontWeight: "var(--font-weight-medium)",
                          textTransform: "capitalize",
                          fontSize: "11px"
                        }}
                      >
                        {survey.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="h4" style={{ color: "var(--foreground)", margin: 0 }}>
                      {survey.title}
                    </h4>

                    {/* Description */}
                    <p className="caption" style={{ color: "var(--muted-foreground)", margin: 0 }}>
                      {survey.description}
                    </p>
                  </div>

                  {/* Survey Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar style={{ width: "14px", height: "14px", color: "var(--muted-foreground)" }} />
                      <span className="caption" style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>
                        {activeTab === "ongoing" ? "Deadline: " : "Selesai: "}
                        {new Date(survey.deadline).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock style={{ width: "14px", height: "14px", color: "var(--muted-foreground)" }} />
                      <span className="caption" style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>
                        {survey.estimatedTime}
                      </span>
                    </div>

                    {/* Admin: Show Progress */}
                    {userRole === "Admin" && (
                      <div
                        style={{
                          marginTop: "4px",
                          padding: "12px",
                          backgroundColor: "rgba(0, 133, 138, 0.05)",
                          borderRadius: "6px",
                          border: "1px solid rgba(0, 133, 138, 0.1)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span className="caption" style={{ color: "var(--muted-foreground)", fontSize: "11px" }}>
                            Responses
                          </span>
                          <span
                            className="caption"
                            style={{
                              color: "var(--primary)",
                              fontFamily: "'Inter:Medium',sans-serif",
                              fontWeight: "var(--font-weight-medium)",
                              fontSize: "12px"
                            }}
                          >
                            {survey.responseCount} / {survey.targetCount} ({responsePercentage}%)
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "6px",
                            backgroundColor: "rgba(0, 133, 138, 0.1)",
                            borderRadius: "999px",
                            overflow: "hidden"
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${responsePercentage}%`,
                              backgroundColor: "var(--primary)",
                              transition: "width 0.3s"
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button - Only for Ongoing */}
                  {activeTab === "ongoing" && (
                    <button
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius)",
                        fontFamily: "'Inter:Medium',sans-serif",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        marginTop: "auto"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.hash = `/survey/${survey.id}`;
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      Mulai Survey
                    </button>
                  )}

                  {/* Status Badge for Finished */}
                  {activeTab === "finished" && (
                    <div
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "rgba(0, 133, 138, 0.1)",
                        color: "var(--primary)",
                        border: "1px solid rgba(0, 133, 138, 0.2)",
                        borderRadius: "var(--radius)",
                        fontFamily: "'Inter:Medium',sans-serif",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "12px",
                        textAlign: "center"
                      }}
                    >
                      ✓ Selesai
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
