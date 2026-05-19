import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {SceneKey, sceneStarts, scenes} from "./storyboard";

const palette = {
  teal: "#006573",
  tealBright: "#00A199",
  orange: "#F47C20",
  green: "#90BC40",
  red: "#BC2419",
  ink: "#101828",
  muted: "#475467",
  border: "#EAECF0",
  surface: "#FFFFFF",
  soft: "#F2F4F7",
};

const ease = Easing.bezier(0.2, 0.85, 0.2, 1);

const sceneProgress = (frame: number, key: SceneKey) => {
  const scene = scenes.find((item) => item.key === key);
  if (!scene) {
    return 0;
  }
  return Math.max(0, Math.min(1, (frame - sceneStarts[key]) / scene.frames));
};

const fade = (localFrame: number, duration: number) => {
  const intro = interpolate(localFrame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const outro = interpolate(localFrame, [duration - 24, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return Math.min(intro, outro);
};

const SceneChrome = ({children, localFrame, duration}: {children: React.ReactNode; localFrame: number; duration: number}) => {
  const opacity = fade(localFrame, duration);
  const y = interpolate(localFrame, [0, 36], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill className="frame" style={{opacity}}>
      <div className="brand-bar" />
      <div className="safe" style={{transform: `translateY(${y}px)`}}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

const HeaderMark = ({label}: {label: string}) => (
  <div style={{display: "flex", alignItems: "center", gap: 18}}>
    <div
      style={{
        width: 58,
        height: 58,
        borderRadius: 8,
        background: palette.teal,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 900,
      }}
    >
      R2
    </div>
    <div>
      <div className="small-label">{label}</div>
      <div style={{fontSize: 22, color: palette.muted, marginTop: 4}}>InJourney Human Capital</div>
    </div>
  </div>
);

const Opening = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const {fps} = useVideoConfig();
  const pulse = spring({frame: localFrame, fps, config: {damping: 18, stiffness: 90}});
  const ring = interpolate(pulse, [0, 1], [0.84, 1], {extrapolateRight: "clamp"});

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <HeaderMark label="Socialization Material" />
      <div style={{position: "absolute", left: 0, top: 190, width: 940}}>
        <div className="eyebrow">Human Capital Operating System</div>
        <div className="title" style={{fontSize: 112, marginTop: 26}}>
          Rinjani 2.0
        </div>
        <div className="body" style={{marginTop: 28, width: 780}}>
          One integrated experience for Portal, Talent, and Performance.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 42,
          top: 156,
          width: 610,
          height: 610,
          transform: `scale(${ring})`,
        }}
      >
        <OrbitMap />
      </div>
      <div style={{position: "absolute", left: 0, bottom: 40, display: "flex", gap: 16}}>
        <span className="pill pill-teal">Portal</span>
        <span className="pill pill-orange">Talent</span>
        <span className="pill pill-green">Performance</span>
      </div>
    </SceneChrome>
  );
};

const OrbitMap = () => (
  <div style={{position: "relative", width: "100%", height: "100%"}}>
    <div
      style={{
        position: "absolute",
        inset: 54,
        border: `3px solid ${palette.border}`,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.68)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 205,
        top: 205,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: palette.teal,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 30,
        fontWeight: 900,
        lineHeight: 1.12,
        boxShadow: "0 22px 60px rgba(0,101,115,0.26)",
      }}
    >
      Rinjani<br />2.0
    </div>
    {[
      {label: "Portal", x: 54, y: 112, color: palette.tealBright},
      {label: "Talent", x: 382, y: 70, color: palette.orange},
      {label: "Performance", x: 266, y: 430, color: palette.green},
    ].map((node) => (
      <div
        key={node.label}
        style={{
          position: "absolute",
          left: node.x,
          top: node.y,
          width: 192,
          height: 104,
          borderRadius: 8,
          background: "white",
          border: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: node.color,
          fontSize: 25,
          fontWeight: 900,
          boxShadow: "0 16px 45px rgba(16,24,40,0.12)",
        }}
      >
        {node.label}
      </div>
    ))}
  </div>
);

const WhyScene = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const cards = [
    {title: "Portal", text: "Employee services", color: palette.teal},
    {title: "Talent", text: "Growth journeys", color: palette.orange},
    {title: "Performance", text: "KPI governance", color: palette.green},
  ];

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <div style={{display: "grid", gridTemplateColumns: "670px 1fr", gap: 82, height: "100%"}}>
        <div style={{paddingTop: 82}}>
          <div className="eyebrow">Why this matters</div>
          <div className="title" style={{marginTop: 24}}>
            From scattered module reviews to one product story
          </div>
          <div className="body" style={{marginTop: 30}}>
            Rinjani 2.0 removes fragmented shells, duplicated navigation, and disconnected HR journeys.
          </div>
        </div>
        <div style={{position: "relative", paddingTop: 80}}>
          {cards.map((card, index) => {
            const enter = interpolate(localFrame, [index * 16 + 10, index * 16 + 46], [70, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            });
            return (
              <div
                key={card.title}
                className="panel"
                style={{
                  height: 156,
                  marginBottom: 30,
                  padding: "30px 34px",
                  transform: `translateX(${enter}px)`,
                  borderLeft: `12px solid ${card.color}`,
                }}
              >
                <div style={{fontSize: 34, fontWeight: 900, color: palette.ink}}>{card.title}</div>
                <div style={{fontSize: 25, color: palette.muted, marginTop: 10}}>{card.text}</div>
              </div>
            );
          })}
          <div
            className="panel"
            style={{
              position: "absolute",
              right: 20,
              bottom: 78,
              width: 620,
              padding: 34,
              background: palette.teal,
              color: "white",
            }}
          >
            <div style={{fontSize: 28, fontWeight: 900}}>Integrated shell</div>
            <div style={{fontSize: 23, lineHeight: 1.35, marginTop: 12, color: "#E5F4F2"}}>
              One login, one header, one switcher, one route model.
            </div>
          </div>
        </div>
      </div>
    </SceneChrome>
  );
};

const IntegratedScene = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const progress = interpolate(localFrame, [20, duration - 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const highlightX = interpolate(progress, [0, 0.5, 1], [366, 640, 915]);

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <div className="eyebrow">Integrated review surface</div>
      <div className="title" style={{fontSize: 66, marginTop: 18, width: 1120}}>
        A single shell for the employee lifecycle
      </div>
      <div className="panel" style={{position: "absolute", left: 0, right: 0, bottom: 40, height: 670, overflow: "hidden"}}>
        <div className="shell-top" style={{display: "flex", alignItems: "center", padding: "0 34px", gap: 24}}>
          <div style={{fontSize: 26, fontWeight: 900, color: "white"}}>Rinjani 2.0</div>
          {["Portal", "Talent", "Performance"].map((item, index) => (
            <div
              key={item}
              style={{
                height: 42,
                padding: "8px 22px",
                borderRadius: 999,
                background: index === 1 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 19,
                fontWeight: 800,
              }}
            >
              {item}
            </div>
          ))}
          <div style={{marginLeft: "auto", color: "#CFE7E4", fontSize: 20}}>Global search · Notifications · Role</div>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "300px 1fr", height: 596}}>
          <div style={{background: "#F8FAFC", borderRight: `1px solid ${palette.border}`, padding: 28}}>
            {["My Talent Journey", "Talent Management", "Administration"].map((item, index) => (
              <div
                key={item}
                style={{
                  height: 64,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 12,
                  color: index === 0 ? palette.teal : palette.muted,
                  background: index === 0 ? "#E6F3F2" : "transparent",
                  fontSize: 21,
                  fontWeight: 850,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{position: "relative", padding: 34}}>
            <div
              style={{
                position: "absolute",
                left: highlightX,
                top: 88,
                width: 160,
                height: 160,
                border: `5px solid ${palette.orange}`,
                borderRadius: 8,
                boxShadow: "0 0 0 999px rgba(255,255,255,0.42)",
              }}
            />
            <div style={{display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24}}>
              <DashboardPanel title="Career readiness" value="84%" tone={palette.green} />
              <DashboardPanel title="IDP progress" value="71%" tone={palette.orange} />
            </div>
            <div style={{marginTop: 26, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20}}>
              {["Talent pool", "Succession slate", "360 assessment"].map((item) => (
                <div key={item} className="panel" style={{height: 180, padding: 24, boxShadow: "none"}}>
                  <div style={{fontSize: 24, fontWeight: 900}}>{item}</div>
                  <div style={{marginTop: 22, height: 12, borderRadius: 999, background: "#E4E7EC"}}>
                    <div style={{height: 12, width: `${item.length * 6}%`, borderRadius: 999, background: palette.teal}} />
                  </div>
                  <div style={{marginTop: 28, color: palette.muted, fontSize: 18}}>Reviewed in one shell</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneChrome>
  );
};

const DashboardPanel = ({title, value, tone}: {title: string; value: string; tone: string}) => (
  <div className="panel" style={{height: 170, padding: 28, boxShadow: "none"}}>
    <div className="small-label">{title}</div>
    <div className="metric" style={{fontSize: 58, fontWeight: 950, marginTop: 16, color: tone}}>
      {value}
    </div>
  </div>
);

const PlatformScene = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const items = [
    {name: "Portal", color: palette.teal, lines: ["Profile and services", "Policy and survey", "Administration"]},
    {name: "Talent", color: palette.orange, lines: ["Career aspiration", "IDP and assessment", "Talent review"]},
    {name: "Performance", color: palette.green, lines: ["My KPI", "Team KPI", "HQ dashboards"]},
  ];

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <div style={{display: "flex", justifyContent: "space-between", gap: 60}}>
        <div>
          <div className="eyebrow">Portal + Talent + Performance</div>
          <div className="title" style={{fontSize: 64, width: 970, marginTop: 20}}>
            Three platforms, one operating rhythm
          </div>
        </div>
        <div className="body" style={{width: 520, paddingTop: 18}}>
          Employee services, growth journeys, and KPI governance now sit inside one connected prototype.
        </div>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 96}}>
        {items.map((item, index) => {
          const lift = interpolate(localFrame, [index * 20 + 10, index * 20 + 54], [55, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          });
          return (
            <div
              key={item.name}
              className="panel"
              style={{
                height: 520,
                padding: 36,
                transform: `translateY(${lift}px)`,
                borderTop: `12px solid ${item.color}`,
              }}
            >
              <div style={{fontSize: 42, fontWeight: 950, color: item.color}}>{item.name}</div>
              <div style={{marginTop: 44, display: "grid", gap: 20}}>
                {item.lines.map((line) => (
                  <div
                    key={line}
                    style={{
                      height: 74,
                      borderRadius: 8,
                      border: `1px solid ${palette.border}`,
                      background: "#F9FAFB",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 24px",
                      fontSize: 25,
                      fontWeight: 800,
                      color: palette.ink,
                    }}
                  >
                    <span style={{width: 16, height: 16, borderRadius: 999, background: item.color, marginRight: 18}} />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SceneChrome>
  );
};

const GovernanceScene = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const progress = interpolate(localFrame, [20, duration - 40], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const roles = [
    {role: "Employee", action: "Self-service and growth plan", color: palette.teal},
    {role: "Leader", action: "Team decisions and coaching", color: palette.orange},
    {role: "HQ", action: "Governance and monitoring", color: palette.green},
  ];

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <div className="eyebrow">Role-based socialization</div>
      <div className="title" style={{fontSize: 67, width: 1160, marginTop: 20}}>
        Designed for employees, leaders, and HQ
      </div>
      <div style={{position: "absolute", left: 0, right: 0, top: 340}}>
        <div style={{height: 8, borderRadius: 999, background: "#D0D5DD"}} />
        <div style={{height: 8, borderRadius: 999, background: palette.teal, width: `${Math.max(8, progress * 100)}%`, marginTop: -8}} />
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 70, marginTop: 54}}>
          {roles.map((item, index) => (
            <div key={item.role} className="panel" style={{height: 310, padding: 34}}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  background: item.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: 950,
                }}
              >
                {index + 1}
              </div>
              <div style={{fontSize: 38, fontWeight: 950, marginTop: 30}}>{item.role}</div>
              <div style={{fontSize: 25, color: palette.muted, lineHeight: 1.32, marginTop: 18}}>{item.action}</div>
            </div>
          ))}
        </div>
      </div>
    </SceneChrome>
  );
};

const AdoptionScene = ({localFrame, duration}: {localFrame: number; duration: number}) => {
  const checklist = ["Review flows end to end", "Align decisions earlier", "Reduce handoff friction"];

  return (
    <SceneChrome localFrame={localFrame} duration={duration}>
      <div style={{display: "grid", gridTemplateColumns: "760px 1fr", gap: 86, height: "100%"}}>
        <div style={{paddingTop: 82}}>
          <div className="eyebrow">Adoption message</div>
          <div className="title" style={{fontSize: 70, marginTop: 22}}>
            Socialize the change as a new way of working
          </div>
          <div className="body" style={{marginTop: 30}}>
            Rinjani 2.0 is not only a prototype consolidation. It is the shared language for reviewing HR journeys across the employee lifecycle.
          </div>
        </div>
        <div style={{paddingTop: 124}}>
          {checklist.map((item, index) => {
            const opacity = interpolate(localFrame, [index * 22 + 20, index * 22 + 52], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div key={item} className="panel" style={{height: 116, marginBottom: 28, padding: "28px 34px", opacity}}>
                <div style={{display: "flex", alignItems: "center", gap: 24}}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: palette.green,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: 950,
                    }}
                  >
                    OK
                  </div>
                  <div style={{fontSize: 30, fontWeight: 900}}>{item}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneChrome>
  );
};

const CloseScene = ({localFrame, duration}: {localFrame: number; duration: number}) => (
  <SceneChrome localFrame={localFrame} duration={duration}>
    <div style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
      <div className="eyebrow">Next step</div>
      <div className="title" style={{fontSize: 82, width: 1240, marginTop: 26}}>
        Rinjani 2.0 is the shared review surface
      </div>
      <div className="body" style={{width: 1020, marginTop: 32}}>
        Align on the journey, then validate each module through the integrated prototype.
      </div>
      <div style={{display: "flex", gap: 18, marginTop: 58}}>
        <span className="pill pill-teal">One product</span>
        <span className="pill pill-orange">One journey</span>
        <span className="pill pill-green">One review surface</span>
      </div>
    </div>
  </SceneChrome>
);

export const RinjaniSocialization = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: "white"}}>
      <Sequence from={sceneStarts.opening} durationInFrames={scenes[0].frames}>
        <Opening localFrame={frame - sceneStarts.opening} duration={scenes[0].frames} />
      </Sequence>
      <Sequence from={sceneStarts.why} durationInFrames={scenes[1].frames}>
        <WhyScene localFrame={frame - sceneStarts.why} duration={scenes[1].frames} />
      </Sequence>
      <Sequence from={sceneStarts.integrated} durationInFrames={scenes[2].frames}>
        <IntegratedScene localFrame={frame - sceneStarts.integrated} duration={scenes[2].frames} />
      </Sequence>
      <Sequence from={sceneStarts.platforms} durationInFrames={scenes[3].frames}>
        <PlatformScene localFrame={frame - sceneStarts.platforms} duration={scenes[3].frames} />
      </Sequence>
      <Sequence from={sceneStarts.governance} durationInFrames={scenes[4].frames}>
        <GovernanceScene localFrame={frame - sceneStarts.governance} duration={scenes[4].frames} />
      </Sequence>
      <Sequence from={sceneStarts.adoption} durationInFrames={scenes[5].frames}>
        <AdoptionScene localFrame={frame - sceneStarts.adoption} duration={scenes[5].frames} />
      </Sequence>
      <Sequence from={sceneStarts.close} durationInFrames={scenes[6].frames}>
        <CloseScene localFrame={frame - sceneStarts.close} duration={scenes[6].frames} />
      </Sequence>
    </AbsoluteFill>
  );
};
