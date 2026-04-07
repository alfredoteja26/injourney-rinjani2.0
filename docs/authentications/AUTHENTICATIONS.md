# Authentications

## 1. Purpose

This document defines the authentication experience for the Rinjani Integrated prototype. It covers the current login page redesign plan, expected user flows, edge cases, and future behavior that should be supported when the authentication layer moves beyond the current happy-path prototype.

The current app only supports a limited happy path:

- Email and password are entered on the login screen.
- Demo credentials can be applied from a helper popup.
- Microsoft login routes to a mocked Microsoft screen.
- Successful login creates a local session and redirects to the integrated app shell.

Target behavior should expand this into a complete enterprise authentication surface while staying aligned with the Rinjani design system.

## 2. Source References

Use this order when decisions conflict:

1. Product decisions in `docs/design-system-overhaul-2026-04-07/DESIGN_SYSTEM_BLUEPRINT.md`.
2. Current implementation tokens in `packages/shared-ui/src/theme.css`.
3. Current shared primitives from `packages/shared-ui/src`.
4. Auth route wiring in `apps/rinjani/src/routes.tsx`.
5. Current login prototype in `packages/portal/src/imports/SignIn.tsx`.
6. Current Microsoft mock in `packages/portal/src/imports/SignInMicrosoft.tsx`.
7. OWASP Authentication and Forgot Password guidance.
8. NIST SP 800-63B authentication lifecycle guidance.

The Stitch screenshot is a composition reference only. It should not override product tokens, component primitives, accessibility behavior, or auth security behavior.

## 3. Design-System Constraints

The login page is an authentication surface, not a normal in-app content page. It may use a standalone composition, but it still must follow the same Rinjani visual system.

Required design constraints:

- Use Plus Jakarta Sans through the shared theme, not local Inter or IBM Plex overrides.
- Use Rinjani semantic tokens such as `--primary`, `--secondary`, `--accent`, `--border`, `--input`, `--ring`, `--muted`, and `--muted-foreground`.
- Use shared UI primitives where possible: Button, Input, Card, Field, Separator, Dialog, Spinner, Alert, and related primitives.
- Use brand assets from `apps/rinjani/public` and `apps/rinjani/public/brand`.
- Keep primary actions in Authority Teal (`#006573`) unless a product-design decision explicitly approves a brand-token change.
- Use orange only for warm emphasis and attention, not destructive states.
- Use green for success/progress only.
- Use red only for errors, destructive actions, rejected states, or critical security warnings.
- Avoid new component-specific tokens unless the component is promoted into shared UI scope.
- Avoid copying generated Stitch HTML or Figma-imported class output directly.
- Use responsive browser-ready layout with natural scrolling on smaller screens.

Visual direction:

- Auth area: quiet, clear, formal, and operational.
- Hero area: image-led and warm, using approved/local imagery or brand assets.
- Background: subtle brand texture or Kawung/supergraphic treatment, not heavy decoration.
- Footer: compact legal and copyright links.
- Language/help controls: available but secondary.

## 4. Current Implementation Inventory

Current route entry:

- `apps/rinjani/src/routes.tsx` renders `LoginPage`.
- `LoginPage` renders `SignIn`.
- Successful login calls `login(email, role)` from session context.
- Microsoft login moves the hash route to `#/login/microsoft`.
- `MicrosoftLoginRoute` renders `MicrosoftLoginPage` and a mocked loading screen.

Current auth helper:

- `packages/portal/src/lib/auth.ts` contains mock users and a basic `login(email, password)` helper.
- The active `SignIn` component does not fully use this helper yet; it currently checks whether email and password are present, then assigns role based on the email.

Current design debt:

- `SignIn.tsx` is Figma-import style.
- It uses hardcoded colors and fixed `1024px` layout sizing.
- It uses imported `figma:asset` references and inline SVG path helpers.
- It contains local text-field and modal patterns instead of shared primitives.
- It has no wrong-password flow, account lockout flow, reset request flow, network error flow, or SSO error flow.

## 5. Authentication Personas

Primary personas:

- Employee user: accesses assigned Portal, Talent, and Performance workflows.
- Admin user: accesses broader management, design-system preview, and admin-controlled flows.

Secondary personas:

- Locked-out user: has valid account identity but cannot complete login.
- Returning user: has an expired session and needs to re-authenticate.
- SSO user: uses Microsoft enterprise authentication.
- Support/admin operator: helps users recover access outside the user-facing flow.

## 6. Login Page Specification

### 6.1 Page Structure

Desktop layout:

- Top header row with Rinjani/InJourney HCMS brand at left.
- Language selector and help action at right.
- Left-side authentication content block with:
  - product chips such as "Ekosistem InJourney" and "SSO Enterprise" only if they do not create visual noise
  - headline: "Selamat datang kembali"
  - short formal Indonesian description
  - login form card
  - demo credential affordance for prototype usage
  - security note
- Right-side image-led hero card with:
  - approved/local visual asset
  - dark overlay for text readability
  - concise message about human capital and InJourney ecosystem
  - optional carousel controls if existing slide behavior is preserved
- Footer row with copyright and legal links.

Mobile layout:

- Header remains visible but compact.
- Auth content appears before hero content.
- Hero may collapse into a shorter visual panel or be hidden if it harms usability.
- Form should remain fully usable without horizontal scrolling.
- Body should use natural scrolling, not clipped viewport overflow.

### 6.2 Form Fields

Fields:

- Email address.
- Password.

Field behavior:

- Email accepts keyboard entry and should use `type="email"`.
- Password supports show/hide toggle.
- Enter key submits when both required fields are present.
- Inputs use shared `Input` styling with tokenized border, background, and focus states.
- Validation state uses shared error styling, not custom red text without token alignment.

### 6.3 Primary Actions

Actions:

- "Masuk" or "Sign In to Account" depending on final language decision.
- "Lupa kata sandi?"
- "Masuk dengan Microsoft" or "Microsoft Account".
- "Lihat kredensial demo" for prototype support.

Rules:

- Use formal Indonesian for product UI unless the product owner requests English.
- Primary submit button is disabled until required fields have values.
- Microsoft SSO is secondary to the current email/password path only if both are intentionally supported.
- Demo credentials must remain visibly a prototype affordance and should not be confused with production login.

## 7. Core Flows

### 7.1 Happy Path: Email and Password

1. User opens `#/login`.
2. User enters email and password.
3. User clicks primary sign-in action or presses Enter.
4. System validates required fields.
5. System authenticates credentials.
6. System creates session.
7. System redirects to `#/`.
8. Integrated shell loads with user role and email.

Prototype behavior:

- Current screen only checks non-empty email/password and assigns Admin role for a specific email.

Target behavior:

- Call an authentication service or shared auth helper.
- Validate credentials.
- Return a generic error on failure.
- Create a session only after a verified success response.

### 7.2 Happy Path: Demo Credentials

1. User clicks demo credentials.
2. System opens a modal or sheet with Admin and User demo accounts.
3. User selects a demo account.
4. System fills email and password fields.
5. User signs in.

Rules:

- Demo credentials are allowed for prototype/demo environments.
- Demo helper should be removable or hidden in production.
- The helper must not appear as a real security feature.

### 7.3 Happy Path: Microsoft SSO

1. User clicks Microsoft account action.
2. System routes to `#/login/microsoft`.
3. User completes mocked Microsoft login.
4. System shows loading feedback.
5. System creates session.
6. System redirects to `#/`.

Target behavior:

- Replace mocked Microsoft flow with real enterprise SSO when integration details exist.
- Handle SSO callback success and failure states.
- Preserve return path when a user was redirected from a protected route.

## 8. Edge Cases and Error Flows

### 8.1 Empty Required Fields

Trigger:

- User attempts to submit without email or password.

Expected behavior:

- Keep submit disabled while required fields are empty, or show field-level validation if submit is attempted.
- Tell the user which required information is missing.
- Do not show a system-level authentication error for missing local form values.

Suggested copy:

- "Masukkan alamat email."
- "Masukkan kata sandi."

### 8.2 Invalid Email Format

Trigger:

- User enters a malformed email address.

Expected behavior:

- Show field-level validation.
- Do not call authentication service until the format is corrected.

Suggested copy:

- "Gunakan format email yang valid."

### 8.3 Wrong Email or Password

Trigger:

- Credentials do not match an active account.

Expected behavior:

- Show a generic error that does not reveal whether the email exists.
- Preserve entered email.
- Clear or preserve password based on implementation preference, but prefer clearing it after a failed credential response.
- Keep focus behavior predictable.

Suggested copy:

- "Email atau kata sandi belum sesuai. Periksa kembali lalu coba lagi."

Avoid:

- "Email not found."
- "Password is incorrect."
- "This account exists but the password is wrong."

### 8.4 Multiple Failed Attempts

Trigger:

- User repeatedly fails login.

Expected behavior:

- Rate-limit repeated failed attempts.
- Add delay or temporary lockout after a threshold.
- Continue using generic wording to avoid account enumeration.
- Provide a safe next step such as password reset or contacting support.

Suggested copy:

- "Terlalu banyak percobaan masuk. Tunggu beberapa saat sebelum mencoba lagi, atau gunakan pemulihan akses."

Implementation note:

- NIST SP 800-63B recommends rate limiting failed authentication attempts. OWASP also recommends controls against automated attacks and account enumeration.

### 8.5 Account Locked or Disabled

Trigger:

- Account is disabled, locked by policy, or blocked by admin.

Expected behavior:

- Do not expose unnecessary internal account state before authentication.
- If the user has passed an identity verification step, provide clearer recovery guidance.
- Offer support escalation.

Suggested copy:

- Before verification: "Kami tidak dapat memproses permintaan masuk ini. Coba lagi atau hubungi dukungan internal."
- After verification or via support flow: "Akses akun Anda sedang dibatasi. Hubungi dukungan internal untuk bantuan."

### 8.6 Password Expired

Trigger:

- User credentials are valid, but password must be changed.

Expected behavior:

- Route to a password update flow before allowing full app access.
- Explain that access requires updating the password.
- Do not load the integrated app shell until the password update is complete.

Suggested copy:

- "Kata sandi Anda perlu diperbarui sebelum melanjutkan."

### 8.7 Network or Server Error

Trigger:

- Auth service is unavailable, request times out, or network fails.

Expected behavior:

- Show a recoverable system-level error.
- Do not imply credentials are wrong.
- Allow retry.

Suggested copy:

- "Layanan masuk belum dapat dihubungi. Periksa koneksi Anda atau coba beberapa saat lagi."

### 8.8 Expired Session

Trigger:

- Existing session expires while user is away or returns through a protected route.

Expected behavior:

- Redirect to login.
- Preserve intended destination if possible.
- Explain that the session ended.

Suggested copy:

- "Sesi Anda telah berakhir. Masuk kembali untuk melanjutkan."

### 8.9 Unauthorized Route

Trigger:

- Logged-in user reaches a route that requires a different role.

Expected behavior:

- Do not show login again if user is already authenticated.
- Show an access-restricted page or redirect to an allowed dashboard.
- Provide clear next step.

Suggested copy:

- "Anda belum memiliki akses ke halaman ini."

### 8.10 Microsoft SSO Cancelled

Trigger:

- User cancels or exits Microsoft login.

Expected behavior:

- Return to Rinjani login page.
- Show neutral, non-error feedback if useful.

Suggested copy:

- "Masuk dengan Microsoft dibatalkan."

### 8.11 Microsoft SSO Failure

Trigger:

- Microsoft SSO fails due to tenant mismatch, denied permission, expired callback, or identity mismatch.

Expected behavior:

- Return to login page or show an auth error surface.
- Explain that Microsoft authentication was not completed.
- Provide fallback actions.

Suggested copy:

- "Autentikasi Microsoft belum berhasil. Coba lagi atau gunakan metode masuk lain yang tersedia."

### 8.12 Password Manager and Browser Autofill

Trigger:

- Browser or password manager fills fields.

Expected behavior:

- Form layout remains stable.
- Label and placeholder do not become ambiguous.
- Submit state updates correctly when fields are autofilled.

### 8.13 Accessibility and Keyboard Use

Expected behavior:

- All controls are reachable by keyboard.
- Focus ring is visible and tokenized.
- Password reveal button has an accessible label.
- Error messages are associated with their fields.
- Modal/dialog focus is trapped and restored.
- Text contrast meets product accessibility expectations.

## 9. Forgot Password Specification

The current app does not implement forgot-password behavior. The target flow below should be used when the feature is added.

### 9.1 Request Reset

1. User clicks "Lupa kata sandi?"
2. System opens a reset request screen or dialog.
3. User enters work email.
4. System validates email format.
5. System submits request.
6. System shows a generic confirmation.

Suggested confirmation copy:

- "Jika email terdaftar, instruksi pemulihan akan dikirimkan."

Rules:

- Do not reveal whether the account exists.
- Use similar response timing for registered and unregistered emails where practical.
- Rate-limit repeated requests.
- Log reset requests for audit and abuse review.

### 9.2 Reset Email

Target content:

- Clear subject line.
- User-friendly explanation.
- Single reset link or code.
- Expiration time.
- "Ignore this email" guidance if the user did not request it.
- Support contact path.

Security rules:

- Use high-entropy, single-use reset tokens.
- Expire reset tokens quickly.
- Invalidate tokens after successful password change.
- Do not include the current password.

### 9.3 Set New Password

1. User opens reset link.
2. System validates token.
3. User enters new password and confirmation.
4. System validates password requirements.
5. System updates password.
6. System invalidates reset token.
7. System confirms success.
8. User returns to login or is signed in, depending on future product/security decision.

Suggested copy:

- "Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru."

### 9.4 Expired or Invalid Reset Link

Expected behavior:

- Explain that the link is no longer valid.
- Provide action to request a new reset link.

Suggested copy:

- "Tautan pemulihan sudah tidak berlaku. Minta tautan baru untuk melanjutkan."

## 10. Security and Privacy Requirements

Minimum target requirements:

- Use generic authentication failure messages.
- Rate-limit failed login attempts.
- Rate-limit forgot-password requests.
- Do not store plaintext passwords in production.
- Do not return password fields from user lookup APIs.
- Use secure session tokens or secure cookies in production.
- Invalidate sessions on logout.
- Avoid leaking whether an email address exists.
- Log significant auth events for security review.
- Avoid logging plaintext passwords, reset tokens, or secrets.
- Keep demo credentials out of production builds.
- Keep Microsoft SSO errors generic until identity has been verified.

Future production requirements:

- Integrate enterprise identity provider for SSO.
- Define session expiration and refresh behavior.
- Define password policy or decide to prefer SSO-only authentication.
- Define support flow for locked accounts.
- Define audit logs and admin visibility.
- Define environment-specific behavior for demo credentials.

## 11. Implementation Plan

Phase 1: Login visual redesign and cleanup.

- Replace `SignIn.tsx` Figma-import layout with a design-system-compliant React implementation.
- Preserve existing props: `onLogin(email, role)` and `onMicrosoftLogin()`.
- Use shared UI primitives and theme tokens.
- Keep demo credentials for the prototype.
- Keep route behavior unchanged.
- Keep Microsoft mock unchanged unless it blocks the login redesign.

Phase 2: Functional auth validation.

- Decide whether `SignIn.tsx` should call `packages/portal/src/lib/auth.ts` or a new shared auth abstraction.
- Add wrong-password and invalid-email UI states.
- Add generic error messaging.
- Add loading state.
- Add network/server error state simulation if useful for the prototype.

Phase 3: Forgot-password prototype.

- Add forgot-password request screen or dialog.
- Use generic confirmation copy.
- Add expired/invalid reset-link screen state as static prototype if real reset links are not implemented.
- Document which parts are mocked.

Phase 4: SSO and session polish.

- Add cancelled/failure states for Microsoft login.
- Preserve return-to route after protected-route redirect.
- Add expired-session messaging.
- Define admin/user unauthorized route behavior.

Phase 5: Production hardening, only when the prototype moves toward real authentication.

- Replace mock auth with real identity provider or backend service.
- Remove or gate demo credentials.
- Add server-side rate limiting.
- Add secure session handling.
- Add audit logging.
- Confirm reset-token, password, and SSO requirements with security stakeholders.

## 12. Acceptance Criteria

Design acceptance:

- Login page follows Rinjani tokens and Plus Jakarta Sans.
- Layout works on desktop and mobile without fixed artboard clipping.
- Brand assets are local and approved.
- No unapproved hardcoded Rinjani colors are introduced.
- Form, modal, and button behavior uses shared primitives where practical.

Functional acceptance for Phase 1:

- Email/password happy path still works.
- Demo credential autofill still works.
- Password reveal still works.
- Enter-to-submit still works.
- Microsoft login route still works.
- Existing session redirect behavior is preserved.

Functional acceptance for later auth phases:

- Wrong credentials show generic error.
- Invalid email format shows field-level error.
- Repeated failed attempts show throttling or lockout feedback.
- Forgot-password request does not reveal account existence.
- Expired session redirects users to login with clear copy.
- SSO cancellation and failure have distinct user-facing states.

Verification:

- Run `npm run build`.
- Manually inspect `#/login` at desktop and mobile widths.
- Manually test email/password happy path, demo credentials, password reveal, Microsoft login route, and failure states once implemented.

## 13. Open Product Decisions

- Should production login support both email/password and Microsoft SSO, or should email/password remain prototype-only?
- Should demo credentials be hidden behind an environment flag?
- What is the official support path for locked or disabled accounts?
- Should password reset be self-service, support-mediated, or identity-provider-owned?
- Should the app redirect users back to the originally requested protected route after login?
- What language should the final UI use: full Indonesian, English, or mixed enterprise terminology?
- Should Microsoft login use a real provider UI as soon as possible, or stay mocked for prototype demos?

## 14. External Best-Practice Notes

- OWASP Authentication Cheat Sheet recommends generic authentication error messages and protections against automated attacks: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Forgot Password Cheat Sheet recommends consistent responses that do not reveal whether an account exists, single-use reset tokens, and rate limiting: https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- NIST SP 800-63B recommends rate limiting failed authentication attempts and maintaining lifecycle event records for authenticators: https://pages.nist.gov/800-63-4/sp800-63b.html
