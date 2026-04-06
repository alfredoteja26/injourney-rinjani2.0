# Rinjani Portal - User Roles & Permissions Guide

## Overview

Portal Rinjani menggunakan sistem role-based access control (RBAC) dengan dua level akses utama: **Admin** dan **User**.

---

## 🔐 Login Credentials

### Admin Account
```
Email:    admin@injourney.co.id
Password: Admin123!
```

**Profile Information:**
- Name: Raka Pradana Putra
- Employee ID: EMP-INJ-0000000001
- Department: Technology
- Position: Senior Software Engineer

### User Account
```
Email:    user@injourney.co.id
Password: User123!
```

**Profile Information:**
- Name: Siti Nurhaliza
- Employee ID: EMP-INJ-0000000002
- Department: Human Resources
- Position: HR Manager

---

## 📋 Feature Access Matrix

| Feature | Admin | User | Description |
|---------|-------|------|-------------|
| **Dashboard** | ✅ | ✅ | View main dashboard with metrics and KPIs |
| **My Profile** | ✅ | ✅ | View and edit personal information |
| **Employee Survey** | ✅ | ✅ | Take surveys and view results |
| **Settings Menu** | ✅ | ⚠️ | Full access vs. limited access |
| **User Management** | ✅ | ❌ | Manage users, roles, and permissions |
| **Pending Requests** | ✅ | ❌ | Review and approve data change requests |
| **Survey Management** | ✅ | ❌ | Create, edit, and manage surveys |
| **Survey Analytics** | ✅ | ⚠️ | Full analytics vs. limited results |
| **Content Management** | ✅ | ❌ | Manage portal content and announcements |

**Legend:**
- ✅ Full Access
- ⚠️ Limited Access
- ❌ No Access

---

## 🎯 Admin Role Capabilities

### 1. User Management
**Path:** Settings → User Management

**Capabilities:**
- View all employees in organization
- Search and filter users by role, department
- Change user roles (Admin ↔ User)
- View user profiles and details
- Access "Users" tab showing:
  - Employee information (name, email, ID)
  - Role badges (Admin/User)
  - Department and position
  - Account status
  - Pending requests count
  - Last login date
  - Action menu (View Profile, Change Role)

**Pending Requests Management:**
- View all pending data change requests
- Review request details:
  - Field name being changed
  - Current value vs. Requested value
  - Reason for change
  - Supporting documents
  - Request date and tier level
- Approve or reject requests with comments
- Badge counter showing total pending requests

### 2. Employee Survey Management
**Path:** Settings → Employee Survey

**Capabilities:**
- Create new surveys with Survey Builder
- Configure survey questions (multiple choice, text, rating, etc.)
- Set survey deadlines and target departments
- View response progress and statistics
- Access detailed analytics:
  - Response rate and completion metrics
  - Question-by-question breakdown
  - Department-wise analysis
  - Export data capabilities
- Close/reopen surveys
- Preview surveys before publishing

### 3. Content Management System
**Path:** Settings → Content Management

**Capabilities:**
- Manage portal announcements
- Update content sections
- Upload resources and documents
- *(Coming soon)*

### 4. Additional Admin Features
- View all survey responses (not just own)
- Access system-wide analytics
- Approve Tier 2 data changes in My Profile
- Manage notification settings for all users

---

## 👤 User Role Capabilities

### 1. My Profile Management
**Path:** My Profile

**Capabilities:**
- View personal information
- Edit data based on tier system:
  - **Tier 1 (Read-only):** Name, Employee ID, etc.
  - **Tier 2 (Requires Approval):** Address, marital status, tax ID, etc.
    - Must provide supporting documents
    - Must provide reason for change
    - Waits for admin approval
  - **Tier 3 (Direct Edit):** Phone number, emergency contact, etc.
- View pending change requests status
- Upload supporting documents for Tier 2 changes

### 2. Employee Surveys
**Path:** Dashboard → Employee Survey Section

**Capabilities:**
- View active surveys
- Complete pending surveys
- View own completed surveys
- See survey deadlines and estimated time
- Preview survey results (if allowed by survey settings)
- Limited analytics on own responses

### 3. Settings Access
**Path:** Settings (Sidebar)

**Limited Access to:**
- Notifications tab only
- Configure personal notification preferences
- No access to User Management, CMS, or Survey Management tabs

### 4. Dashboard
**Capabilities:**
- View personal metrics and KPIs
- See assigned surveys
- Access quick actions
- View announcements and updates

---

## 🔄 Role Transition

### Changing User Roles (Admin Only)

**Steps:**
1. Navigate to Settings → User Management
2. Click on "Users" tab
3. Find the user in the table
4. Click the three-dot menu (⋮) in Actions column
5. Select "Change Role"
6. Modal appears with current and new role selection
7. Confirm the change
8. User's role is updated immediately

**Impact of Role Change:**
- Access to Settings tabs updates instantly
- New permissions apply on next page refresh
- User sees/hides features based on new role
- No data loss occurs during role transition

---

## 📊 Data Change Approval Workflow

### For Users (Requesting Changes):
1. Go to My Profile
2. Edit a Tier 2 field (e.g., Address, Tax ID)
3. Fill in new value
4. Upload supporting documents (required)
5. Provide reason for change (required)
6. Submit request
7. Wait for admin approval
8. Receive notification of approval/rejection

### For Admins (Reviewing Requests):
1. Navigate to Settings → User Management
2. Click "Pending Requests" tab
3. Badge shows total pending count
4. Review request details:
   - Employee information
   - Field being changed
   - Current vs. New value
   - Reason provided
   - Supporting documents
5. Click "Review" button
6. Choose to Approve or Reject
7. Add admin comments (optional)
8. Submit decision
9. User receives notification

---

## 🚨 Important Notes

### Security Reminders:
- ⚠️ These are **demo credentials** for testing only
- 🔒 In production, passwords should be hashed and secured
- 🔑 Implement password reset functionality
- 📧 Add email verification for new accounts
- 🛡️ Consider two-factor authentication for admin users

### Best Practices:
- Admin users should regularly review pending requests
- Always provide clear reasons when rejecting data change requests
- Document role changes for audit purposes
- Regularly review user access levels
- Keep supporting documents for data changes

### Limitations:
- Current implementation is mock-based
- No actual database persistence
- Session management is simplified
- Password reset not yet implemented
- Bulk operations not available

---

## 📞 Support

For questions or issues with user management:
- Contact: Admin team
- Reference: Employee ID and request ID
- Check pending request status in User Management tab

---

**Last Updated:** December 26, 2024  
**Version:** 1.1.0
