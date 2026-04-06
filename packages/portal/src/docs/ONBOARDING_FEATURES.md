# Onboarding Features Documentation

## Overview
The onboarding system consists of three main features:
1. **New Joiner Form** - Public form for new employees to fill out their personal information
2. **Onboarding Configuration** - Admin settings to manage onboarding checklists
3. **Submission Management** - Track and manage form submissions

## Feature 1: New Joiner Form (Public Access)

### Description
A public form that new employees can access via a unique link to submit their personal information before joining the company.

### Form Fields
- **Employee name** * (required)
- **Email** * (required)
- **Phone number**
- **Additional phone number**
- **Place of birth**
- **Birthdate** * (required)
- **Gender** (Male/Female)
- **Marital status** * (required) - Single, Married, Divorced, Widowed
- **Blood type** - A+, A-, B+, B-, AB+, AB-, O+, O-
- **Religion** * (required) - Islam, Christian, Catholic, Hindu, Buddha, Confucius, Other

### Access
The form is accessible via URL: `#/new-joiner-form/{formId}`

Example: `http://localhost:3000/#/new-joiner-form/NJ-001`

### Testing
1. Navigate to Settings > Onboarding (Admin only)
2. Click "Send form link" button
3. Enter an email and expiry date
4. Copy the generated link
5. Open the link in a new tab/window (works without authentication)

## Feature 2: Checklist Configuration

### Description
Admin can configure the onboarding checklist that new employees need to complete.

### Configuration Options
- **Task Title** - Description of the task
- **PIC (Person in Charge)** - Who is responsible for this task
- **Order** - Drag and drop to reorder tasks

### Available PICs
- HR Admin
- HR Manager
- IT Support
- Department Manager
- Finance Team
- Facilities Team

### Default Checklist Items
1. Complete personal data form (HR Admin)
2. Sign employment contract (HR Manager)
3. Setup email and system access (IT Support)
4. Attend orientation session (HR Admin)

### Access
Navigate to: Settings > Onboarding > Checklist Configuration

## Feature 3: Submission Management

### Description
Track and manage all new joiner form submissions.

### Features
- **View all submissions** - Table with submission details
- **Send form link** - Generate and send form to new employees
- **Track status** - Pending, Completed, Expired
- **View details** - Click eye icon to see full submission details
- **Form settings** - Configure form fields (coming soon)

### Submission Table Columns
- Submission ID
- Delivery date
- Expiry date
- Email
- Status (Pending/Completed/Expired)
- Sent by
- Action (View details)

### Access
Navigate to: Settings > Onboarding > Form Submissions

## Usage Flow

### For Admin:
1. Go to Settings > Onboarding
2. Configure checklist items (optional)
3. Click "Send form link"
4. Enter new employee's email and expiry date
5. Copy the generated link and share it with the new employee
6. Track submission status in the table

### For New Employee:
1. Receive form link via email (format: `#/new-joiner-form/{id}`)
2. Open the link (no authentication required)
3. Fill out all required fields
4. Submit the form
5. Confirmation message appears

## Design System Compliance

All components use CSS variables from `/styles/globals.css`:
- Colors: `--primary`, `--secondary`, `--background`, `--foreground`, etc.
- Typography: `--text-4xl`, `--text-3xl`, `--text-2xl`, etc.
- Spacing and borders: `--radius`, `--border`
- Font family: Inter (defined in globals.css)

## Future Enhancements

- Email integration for automatic form link delivery
- Custom form builder for admin
- File upload support (ID card, certificates, etc.)
- Integration with HR system
- Automated checklist tracking
- Notifications for pending submissions
- Analytics dashboard for onboarding metrics
