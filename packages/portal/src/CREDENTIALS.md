# Rinjani Portal - User Credentials

## Demo Users

The Rinjani Portal has been configured with two demo users for testing different role permissions:

### Admin User
- **Email:** `admin@injourney.co.id`
- **Password:** `Admin123!`
- **Role:** Admin
- **Name:** Raka Pradana Putra
- **Department:** Technology
- **Position:** Senior Software Engineer
- **Employee ID:** EMP-INJ-0000000001

**Admin Capabilities:**
- Full access to Settings menu
- User Management (view, edit roles, approve requests)
- Employee Survey Management (create, edit, view analytics)
- Content Management System
- Notifications settings

---

### Regular User
- **Email:** `user@injourney.co.id`
- **Password:** `User123!`
- **Role:** User
- **Name:** Siti Nurhaliza
- **Department:** Human Resources
- **Position:** HR Manager
- **Employee ID:** EMP-INJ-0000000002

**User Capabilities:**
- Limited Settings access
- View and complete employee surveys
- Edit own profile (with tier-based restrictions)
- View notifications
- No access to User Management or Survey Management

---

## Authentication Module

The authentication system is implemented in `/lib/auth.ts` with the following functions:

- `login(email, password)` - Validates credentials and returns user data
- `getUserByEmail(email)` - Retrieves user by email address
- `validateSession(userId)` - Validates user session

## Security Notes

⚠️ **Important:** This is a demo implementation. In production:
- Passwords should be hashed using bcrypt or similar
- Sessions should use secure JWT tokens
- Implement rate limiting on login attempts
- Add password reset functionality
- Enable two-factor authentication for admin users
