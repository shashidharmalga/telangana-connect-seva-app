

### Phase 1: Critical Authentication Fixes (URGENT)

**Step 1.1: Implement Proper Supabase Authentication**
- Remove all `localStorage`-based authentication code from `Login.tsx`
- Implement Supabase Auth with email/password for officers
- Create proper signup flow with email verification
- Add session management with `onAuthStateChange`
- Protect officer dashboard route with authentication check

**Step 1.2: Fix Privilege Escalation Vulnerability**
- Change `profiles.is_officer` default from `true` to `false`
- Create secure officer registration workflow requiring admin approval
- Implement role-based access with separate `user_roles` table (following best practices)
- Update `handle_new_user()` trigger to set `is_officer = false` for regular signups

**Step 1.3: Move Data to Database with Proper RLS**
- Migrate all complaint data from `localStorage` to `complaints` table
- Update RLS policies to explicitly check authentication (`auth.uid() IS NOT NULL`)
- Add policies that verify officer role from `user_roles` table, not `profiles.is_officer`
- Implement proper user-to-complaint relationships

**Step 1.4: Remove Conflicting/Redundant Policies**
- Review current RLS policies on `complaints` table
- Identify overlapping or contradictory policies
- Remove outdated policies before implementing new ones
- Document each policy's purpose

### Phase 2: Input Validation & Data Security

**Step 2.1: Add Comprehensive Input Validation**
- Install and configure Zod for schema validation
- Create validation schemas for all forms (complaint submission, login, etc.)
- Add server-side validation in edge functions
- Sanitize all user inputs before storing/displaying

**Step 2.2: Secure OTP System**
- Move OTP generation to secure edge function
- Remove `alert()` demo OTP display
- Implement rate limiting (max 3 OTPs per hour per email)
- Add proper OTP expiration (5 minutes)
- Use stronger hashing for OTP storage

**Step 2.3: Implement Audit Logging**
- Create `audit_logs` table for tracking officer actions
- Log all status changes with timestamp, officer ID, and old/new values
- Add complaint view tracking
- Enable query logging for sensitive operations

### Phase 3: Platform & Infrastructure Security

**Step 3.1: Harden Database Functions**
- Add `SET search_path = public` to `update_updated_at_column()`
- Add `SET search_path = public` to `handle_new_user()`
- Review and tighten all RLS policies

**Step 3.2: Configure Platform Security Settings**
- Enable leaked password protection in Supabase Auth settings
- Reduce OTP expiry to recommended 5 minutes
- Schedule Postgres version upgrade
- Configure proper CORS policies

**Step 3.3: Create User Roles System**
- Create `app_role` enum with values: 'admin', 'officer', 'user'
- Create `user_roles` table with proper foreign keys
- Implement `has_role()` security definer function
- Update all RLS policies to use role-based checks
- Remove `is_officer` column from `profiles` table entirely

### Phase 4: Additional Hardening

**Step 4.1: Add Security Monitoring**
- Implement suspicious activity detection (rapid status changes, bulk operations)
- Add email notifications for critical actions
- Create officer action dashboard for admins
- Implement session timeout (30 minutes of inactivity)

**Step 4.2: Enhanced Access Controls**
- Add multi-factor authentication option for officers
- Implement department-based data segregation
- Create emergency access protocols
- Add IP-based restrictions for officer login (optional)

