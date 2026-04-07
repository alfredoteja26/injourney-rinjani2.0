import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Separator,
  cn,
} from "@rinjani/shared-ui";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Globe2, HelpCircle, KeyRound, Lock, Mail, ShieldCheck, Sparkles, UserPlus } from "lucide-react";

import heroImage from "../assets/0555df0e0c1d85de0cc58056a4c1d890f8040452.png";
import heroImageTwo from "../assets/b74632a06399af372f2f92041724e086ad939295.png";
import heroImageThree from "../assets/29dfb5da3ec9b90e5b2144d2bfebf81a3e3bf34d.png";

interface SignInProps {
  onLogin: (email: string, role: "Admin" | "User") => void;
  onMicrosoftLogin: () => void;
}

type DemoAccount = {
  label: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  description: string;
};

type AuthMode = "login" | "cooldown";

type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: "Admin Account",
    email: "dimas@injourney.co.id",
    password: "Injourney@2025",
    role: "Admin",
    description: "Akses prototype untuk area admin dan preview sistem.",
  },
  {
    label: "User Account",
    email: "binavia@injourney.co.id",
    password: "Injourney@2025",
    role: "User",
    description: "Akses prototype untuk alur karyawan umum.",
  },
];

const AUTH_ERROR = "Email atau kata sandi belum sesuai. Periksa kembali lalu coba lagi.";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HERO_ROTATION_MS = 12000;

const HERO_SLIDES: HeroSlide[] = [
  {
    image: heroImage,
    eyebrow: "Hospitality & Excellence",
    title: "Empowering Indonesia Hospitality",
    description: "Crafting a seamless digital ecosystem for world-class hospitality and integrated talent management.",
  },
  {
    image: heroImageTwo,
    eyebrow: "Connected Talent Journey",
    title: "Strengthening every service moment",
    description: "Align people, performance, and development across the InJourney ecosystem with clarity and care.",
  },
  {
    image: heroImageThree,
    eyebrow: "Enterprise Readiness",
    title: "One access point for growth",
    description: "Support operational teams with a secure workspace for talent mobility, performance, and employee services.",
  },
];

const KAWUNG_CHAIN = Array.from({ length: 7 });

function MicrosoftMark() {
  return (
    <span className="grid size-5 grid-cols-2 grid-rows-2 gap-0.5" aria-hidden="true">
      <span className="bg-[#f25325]" />
      <span className="bg-[#80bc06]" />
      <span className="bg-[#05a6f0]" />
      <span className="bg-[#feba08]" />
    </span>
  );
}

function FeatureAnnouncement() {
  return (
    <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-primary/15 bg-card/90 px-2 py-1 text-xs shadow-sm shadow-primary/5 backdrop-blur">
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-primary">
        <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
        Available now
      </span>
      <span className="truncate pr-2 font-semibold text-foreground">InJourney Rinjani Performance 2.0</span>
    </div>
  );
}

function SecurityNote() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
      <span>Secured by enterprise encryption</span>
    </div>
  );
}

export default function SignIn({ onLogin, onMicrosoftLogin }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [authError, setAuthError] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const normalizedEmail = email.trim().toLowerCase();
  const emailError = submitted && !normalizedEmail ? "Masukkan alamat email." : submitted && !EMAIL_PATTERN.test(normalizedEmail) ? "Gunakan format email yang valid." : "";
  const passwordError = submitted && !password ? "Masukkan kata sandi." : "";
  const resetEmailError = resetSubmitted && resetEmail.trim() && !EMAIL_PATTERN.test(resetEmail.trim().toLowerCase()) ? "Gunakan format email yang valid." : "";

  const matchingAccount = useMemo(
    () => DEMO_ACCOUNTS.find((account) => account.email.toLowerCase() === normalizedEmail && account.password === password),
    [normalizedEmail, password],
  );

  const isSubmitDisabled = authMode === "cooldown";
  const currentSlide = HERO_SLIDES[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % HERO_SLIDES.length);
    }, HERO_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide((slide) => (slide === 0 ? HERO_SLIDES.length - 1 : slide - 1));
  };

  const showNextSlide = () => {
    setActiveSlide((slide) => (slide + 1) % HERO_SLIDES.length);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setAuthError("");

    if (!normalizedEmail || !password || !EMAIL_PATTERN.test(normalizedEmail)) {
      return;
    }

    if (!matchingAccount) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      setPassword("");
      setAuthError(nextAttempts >= 3 ? "Terlalu banyak percobaan masuk. Gunakan pemulihan akses atau coba beberapa saat lagi." : AUTH_ERROR);

      if (nextAttempts >= 3) {
        setAuthMode("cooldown");
      }
      return;
    }

    onLogin(matchingAccount.email, matchingAccount.role);
  };

  const applyDemoAccount = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    setSubmitted(false);
    setFailedAttempts(0);
    setAuthMode("login");
    setAuthError("");
    setDemoOpen(false);
  };

  const handleForgotSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResetSubmitted(true);

    if (!resetEmail.trim() || !EMAIL_PATTERN.test(resetEmail.trim().toLowerCase())) {
      return;
    }
  };

  const resetLoginAttempts = () => {
    setFailedAttempts(0);
    setAuthMode("login");
    setAuthError("");
  };

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -inset-12 bg-[linear-gradient(135deg,rgba(0,101,115,0.09)_0%,rgba(144,188,64,0.05)_32%,rgba(255,255,255,0.72)_54%,rgba(244,124,32,0.07)_100%)]" />
        <div className="absolute -inset-16 bg-[radial-gradient(circle_at_78%_22%,rgba(0,101,115,0.08),transparent_44%),radial-gradient(circle_at_24%_74%,rgba(244,124,32,0.07),transparent_40%)]" />
      </div>
      <div className="absolute -left-24 top-10 size-[32rem] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 size-[34rem] rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -inset-24 bg-[url('/brand/kawung-factors/kawung-factor-09-tile.svg')] bg-[length:128px_128px] bg-repeat opacity-[0.045]" />
        <div className="absolute -inset-24 bg-[url('/brand/kawung-factors/kawung-factor-09-tile.svg')] bg-[length:168px_168px] bg-repeat opacity-[0.03]" />
        <div className="absolute left-[-6%] top-[18%] flex items-center gap-2 opacity-35">
          {KAWUNG_CHAIN.map((_, index) => (
            <img
              key={`kawung-chain-a-${index}`}
              src="/brand/kawung-factors/kawung-factor-09-tile.svg"
              alt=""
              className="size-8 object-contain"
            />
          ))}
        </div>
        <div className="absolute right-[-8%] top-[56%] flex items-center gap-2 opacity-30">
          {KAWUNG_CHAIN.map((_, index) => (
            <img
              key={`kawung-chain-b-${index}`}
              src="/brand/kawung-factors/kawung-factor-09-tile.svg"
              alt=""
              className="size-7 object-contain"
            />
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-8 left-0 hidden h-80 w-80 bg-[url('/brand/kawung-factors/kawung-factor-09-small-teal-left.svg')] bg-contain bg-no-repeat opacity-[0.08] lg:block"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/75 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1920px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full" aria-hidden="true">
              <img src="/brand/rinjani-logo-transparent.png" alt="" className="absolute left-0 top-1/2 h-16 max-w-none -translate-y-1/2" />
            </span>
            <div className="min-w-0 leading-none">
              <p className="truncate text-2xl font-bold tracking-tight text-primary">Rinjani</p>
              <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">InJourney HCMS</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            <Button type="button" variant="ghost" size="sm" className="hidden gap-2 sm:inline-flex">
              <Globe2 className="size-4" aria-hidden="true" />
              Bahasa Indonesia
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Bantuan autentikasi">
              <HelpCircle className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </header>

        <section className="grid flex-1 content-center gap-8 py-4 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:py-5">
          <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6 lg:col-span-5 lg:mx-0 lg:max-w-none">
            <FeatureAnnouncement />

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tighter text-foreground sm:text-5xl">
                Selamat datang kembali
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Portal terpadu untuk talenta masa depan Indonesia dalam ekosistem InJourney.
              </p>
            </div>

            <Card className="rounded-xl bg-card/95 shadow-xl shadow-primary/5">
              <CardContent className="space-y-5 p-6 sm:p-8">
                {authError ? (
                  <div aria-live="polite">
                    <Alert variant={authMode === "cooldown" ? "warning" : "destructive"}>
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  </div>
                ) : null}

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            setAuthError("");
                          }}
                          placeholder="yourname@injourney.id"
                          autoComplete="email"
                          aria-invalid={Boolean(emailError)}
                          className="h-12 pl-10 text-base"
                        />
                      </div>
                      {emailError ? <FieldError>{emailError}</FieldError> : null}
                    </Field>

                    <Field>
                      <div className="flex items-center justify-between gap-4">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <button
                          type="button"
                          onClick={() => setForgotOpen(true)}
                          className="text-xs font-semibold text-secondary transition-colors hover:text-secondary/80 hover:underline"
                        >
                          Lupa kata sandi?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setAuthError("");
                          }}
                          placeholder="Masukkan kata sandi"
                          autoComplete="current-password"
                          aria-invalid={Boolean(passwordError)}
                          className="h-12 px-10 text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                        >
                          {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                        </button>
                      </div>
                      {passwordError ? <FieldError>{passwordError}</FieldError> : null}
                    </Field>
                  </FieldGroup>

                  <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitDisabled}>
                    {authMode === "cooldown" ? "Masuk sementara dibatasi" : "Sign In to Account"}
                  </Button>
                </form>

                {authMode === "cooldown" ? (
                  <Button type="button" variant="outline" className="w-full" onClick={resetLoginAttempts}>
                    Reset percobaan prototype
                  </Button>
                ) : null}

                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Or securely with</span>
                  <Separator className="flex-1" />
                </div>

                <Button type="button" variant="outline" size="lg" className="h-12 w-full bg-card text-base" onClick={onMicrosoftLogin}>
                  <MicrosoftMark />
                  Microsoft Account
                </Button>

                <div className="grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  <Button type="button" variant="ghost" className="justify-start text-secondary hover:text-secondary" onClick={() => setDemoOpen(true)}>
                    <KeyRound className="size-4" aria-hidden="true" />
                    Lihat kredensial demo
                  </Button>
                  <Button type="button" variant="ghost" className="justify-start" onClick={() => setRegisterOpen(true)}>
                    <UserPlus className="size-4" aria-hidden="true" />
                    Ajukan akses baru
                  </Button>
                </div>

                <SecurityNote />
              </CardContent>
            </Card>
          </div>

          <aside className="hidden h-full min-h-[650px] overflow-hidden rounded-xl border border-white/20 bg-primary shadow-2xl ring-1 ring-black/5 lg:col-span-7 lg:block xl:min-h-[680px]">
            <div className="relative flex size-full min-h-[650px] items-end overflow-hidden xl:min-h-[680px]">
              {HERO_SLIDES.map((slide, index) => (
                <img
                  key={slide.title}
                  src={slide.image}
                  alt=""
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-opacity duration-700",
                    index === activeSlide ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/5" aria-hidden="true" />
              <div className="absolute right-16 top-16 size-48 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" aria-hidden="true" />

              <div className="relative mx-10 mb-10 max-w-3xl rounded-xl border border-white/20 bg-white/10 p-8 text-white shadow-xl xl:mx-16 xl:mb-16 xl:p-10">
                <div className="mb-7 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-accent">
                  <span className="h-0.5 w-16 bg-accent" aria-hidden="true" />
                  {currentSlide.eyebrow}
                </div>
                <h2 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tighter xl:text-6xl">
                  {currentSlide.title}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                  {currentSlide.description}
                </p>
                <div className="mt-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          index === activeSlide ? "w-10 bg-white" : "w-3 bg-white/30 hover:bg-white/60",
                        )}
                        aria-label={`Tampilkan slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" size="icon" className="border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white" onClick={showPreviousSlide} aria-label="Slide sebelumnya">
                      <ArrowLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" className="border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white" onClick={showNextSlide} aria-label="Slide berikutnya">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-4 flex flex-col gap-2 border-t border-border/70 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 InJourney. All rights reserved.</span>
          <div className="flex gap-4">
            <button type="button" className="hover:text-primary hover:underline">
              Terms of Use
            </button>
            <button type="button" className="hover:text-primary hover:underline">
              Privacy Policy
            </button>
          </div>
        </footer>
      </div>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Credentials</DialogTitle>
            <DialogDescription>Pilih akun prototype untuk mengisi email dan kata sandi secara otomatis.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                className="rounded-lg border border-border bg-muted/40 p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
                onClick={() => applyDemoAccount(account)}
              >
                <span className="block text-sm font-semibold text-foreground">{account.label}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{account.description}</span>
                <span className="mt-3 block font-mono text-xs text-primary">{account.email}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pemulihan kata sandi</DialogTitle>
            <DialogDescription>Masukkan email kerja Anda. Jika email terdaftar, instruksi pemulihan akan dikirimkan.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleForgotSubmit} noValidate>
            <Field>
              <FieldLabel htmlFor="reset-email">Email kerja</FieldLabel>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(event) => {
                  setResetEmail(event.target.value);
                  setResetSubmitted(false);
                }}
                placeholder="yourname@injourney.id"
                autoComplete="email"
                aria-invalid={Boolean(resetEmailError)}
              />
              {resetEmailError ? <FieldError>{resetEmailError}</FieldError> : null}
            </Field>
            {resetSubmitted && !resetEmailError && resetEmail.trim() ? (
              <Alert variant="success">
                <AlertDescription>Jika email terdaftar, instruksi pemulihan akan dikirimkan.</AlertDescription>
              </Alert>
            ) : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>
                Tutup
              </Button>
              <Button type="submit">Kirim instruksi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajukan akses baru</DialogTitle>
            <DialogDescription>
              Registrasi mandiri belum tersedia di prototype ini. Untuk akses baru, ajukan permintaan melalui admin HC atau pengelola sistem internal.
            </DialogDescription>
          </DialogHeader>
          <Alert variant="info">
            <AlertDescription>Gunakan akun demo untuk meninjau pengalaman prototype sementara alur provisioning akun disiapkan.</AlertDescription>
          </Alert>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setRegisterOpen(false)}>
              Tutup
            </Button>
            <Button
              type="button"
              onClick={() => {
                setRegisterOpen(false);
                setDemoOpen(true);
              }}
            >
              Lihat akun demo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
